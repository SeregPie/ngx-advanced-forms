import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormRecord} from './form-record';

// : rename?
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
		this.setControlsDynamically(names, {updateValueAndValidity: false});
		super.setValue(value, options);
	}

	setControlsDynamically(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}>,
	): void {
		// ?
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

	putControlDynamically(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = [...Object.keys(this.controls), name];
		this.setControlsDynamically(result, options);
	}

	put(
		name: string,
		value: ɵRawValue<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = {...this.getRawValue(), [name]: value};
		this.setValue(result, options);
	}

	putControlsDynamically(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = [...Object.keys(this.controls), ...names];
		this.setControlsDynamically(result, options);
	}

	putAll(
		values: Record<string, ɵRawValue<TControl>>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = {...this.getRawValue(), ...values};
		this.setValue(result, options);
	}
}
