import {
	AbstractControl,
	AbstractControlOptions,
	FormArray,
	ɵRawValue,
} from '@angular/forms';

import {
	registerControl,
	triggerCollectionChange,
	unregisterControl,
} from './control-hacks';

export class DynamicFormArray<
	TControl extends AbstractControl = AbstractControl,
> extends FormArray<TControl> {
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super([], options);
	}

	private needsUpdate: boolean = false;

	private collectionChanged: boolean = false;

	override setValue(
		value: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const count = value.length;
		this._setDynamicControls(count);
		this.needsUpdate = false;
		super.setValue(value, options);
		this.flushChanges();
	}

	addDynamicControl(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.push(control, options);
	}

	private _addDynamicControls(count: number): void {
		this._addDynamicControlsAt(this.length, count);
	}

	addDynamicControls(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._addDynamicControls(count);
		this.flushChanges(options);
	}

	addDynamicControlAt(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.insert(index, control, options);
	}

	private _addDynamicControlsAt(index: number, count: number): void {
		let changed = false;
		{
			const {controlFactory, controls} = this;
			const addedControls = Array.from({length: count}).map(() => {
				const control = controlFactory();
				registerControl(this, control);
				return control;
			});
			controls.splice(index, 0, ...addedControls);
			if (addedControls.length) {
				changed = true;
			}
		}
		if (changed) {
			this.needsUpdate = true;
			this.collectionChanged = true;
		}
	}

	addDynamicControlsAt(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._addDynamicControlsAt(index, count);
		this.flushChanges(options);
	}

	private _removeControls(count: number): void {
		this._removeControlsAt(this.length - count, count);
	}

	private _removeControlsAt(index: number, count: number): void {
		let changed = false;
		{
			const {controls} = this;
			const removedControls = controls.splice(index, count);
			removedControls.forEach((control) => {
				unregisterControl(control);
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

	private _setDynamicControls(count: number): void {
		const currentCount = this.controls.length;
		if (currentCount > count) {
			this._removeControls(currentCount - count);
		} else {
			this._addDynamicControls(count - currentCount);
		}
	}

	setDynamicControls(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._setDynamicControls(count);
		this.flushChanges(options);
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
