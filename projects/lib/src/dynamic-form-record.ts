import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormRecord} from './form-record';

export class DynamicFormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super({}, options);
	}

	override setValue(
		value: Record<string, ɵRawValue<TControl>>,
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const names = Object.keys(value);
		this.hpjprvfa(names, {updateValueAndValidity: false});
		super.setValue(value, options);
	}

	// todo: rename
	hpjprvfa(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory} = this;
		const controls = {...this.controls};
		{
			Object.keys(controls).forEach((name) => {
				if (!names.includes(name)) {
					delete controls[name];
				}
			});
			names.forEach((name) => {
				if (!controls[name]) {
					const control = controlFactory();
					controls[name] = control;
				}
			});
		}
		this.setControls(controls, options);
	}

	// todo: rename: set, setControl
	tkcfumni(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newNames = [...Object.keys(this.controls), name];
		this.hpjprvfa(newNames, options);
	}

	// todo: rename: set, setControls
	fzuisuhd(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newNames = [...Object.keys(this.controls), ...names];
		this.hpjprvfa(newNames, options);
	}
}
