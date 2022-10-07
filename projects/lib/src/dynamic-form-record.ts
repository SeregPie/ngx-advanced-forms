import {
	AbstractControl,
	AbstractControlOptions,
	FormRecord,
	ɵRawValue,
} from '@angular/forms';
import {
	registerControl,
	triggerCollectionChange,
	unregisterControl,
} from './control-hacks';

export class DynamicFormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super({}, options);
	}

	private needsUpdate: boolean = false;

	private collectionChanged: boolean = false;

	override setValue(
		value: Record<string, ɵRawValue<TControl>>,
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const names = Object.keys(value);
		this._setDynamicControls(names);
		this.needsUpdate = false;
		super.setValue(value, options);
		this.flushChanges();
	}

	hasControl(name: string): boolean {
		return this.controls[name] != null;
	}

	addDynamicControl(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		if (!this.hasControl(name)) {
			const {controlFactory} = this;
			const control = controlFactory();
			this.addControl(name, control, options);
		}
	}

	private _addDynamicControls(names: Array<string>): void {
		let changed = false;
		{
			const {controlFactory, controls} = this;
			const addedControls = names.filter((name) => {
				if (controls[name] == null) {
					const control = controlFactory();
					registerControl(this, control);
					controls[name] = control;
					return true;
				}
				return false;
			});
			if (addedControls.length) {
				changed = true;
			}
		}
		if (changed) {
			this.needsUpdate = true;
			this.collectionChanged = true;
		}
	}

	addDynamicControls(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._addDynamicControls(names);
		this.flushChanges(options);
	}

	private _removeControls(names: Array<string>): void {
		let changed = false;
		{
			const {controls} = this;
			const removedControls = names.filter((name) => {
				const control = controls[name];
				if (control != null) {
					unregisterControl(control);
					delete controls[name];
					return true;
				}
				return false;
			});
			if (removedControls.length) {
				changed = true;
			}
		}
		if (changed) {
			this.needsUpdate = true;
			this.collectionChanged = true;
		}
	}

	private _setDynamicControls(names: Array<string>): void {
		const currentNames = Object.keys(this.controls);
		this._removeControls(currentNames.filter((name) => !names.includes(name)));
		this._addDynamicControls(
			names.filter((name) => !currentNames.includes(name)),
		);
	}

	setDynamicControls(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._setDynamicControls(names);
		this.flushChanges(options);
	}

	clear(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.setDynamicControls([], options);
	}

	private flushChanges({
		emitEvent = true,
	}: Partial<{
		emitEvent: boolean;
	}> = {}): void {
		if (this.needsUpdate) {
			this.needsUpdate = false;
			this.updateValueAndValidity({emitEvent});
		}
		if (this.collectionChanged) {
			this.collectionChanged = false;
			triggerCollectionChange(this);
		}
	}
}
