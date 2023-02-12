import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormRecord} from './form-record';

// todo: rename all

// prettier-ignore
export class DynamicFormRecord<TControl extends AbstractControl = AbstractControl>
	extends FormRecord<TControl>
{
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super({}, options);
	}

	override setValue(value: Record<string, ɵRawValue<TControl>>, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		const names = Object.keys(value);
		this.setControlsDynamically(names, {updateValueAndValidity: false});
		super.setValue(value, options);
	}

	override reset(value: Record<string, ɵRawValue<TControl>> = {}, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		const names = Object.keys(value);
		this.setControlsDynamically(names, {updateValueAndValidity: false});
		super.reset(value, options);
	}

	// prettier-ignore
	setControlsDynamically(names: Array<string>, options?: Partial<{
		emitEvent: boolean;
		updateValueAndValidity: boolean;
	}>): void {
		// todo?
		const {controlFactory, controls} = this;
		const result: Record<string, TControl> = {};
		(new Set(names)).forEach((name) => {
			result[name] = controls[name] ?? controlFactory();
		});
		this.setControls(result, options);
	}

	putControlDynamically(name: string, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...Object.keys(this.controls), name];
		this.setControlsDynamically(result, options);
	}

	putControlWithValue(name: string, value: ɵRawValue<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		// todo?
		const result = {...this.getRawValue(), [name]: value};
		this.setValue(result, options);
	}

	putControlsDynamically(names: Array<string>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...Object.keys(this.controls), ...names];
		this.setControlsDynamically(result, options);
	}

	putControlsWithValue(values: Record<string, ɵRawValue<TControl>>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		// todo?
		const result = {...this.getRawValue(), ...values};
		this.setValue(result, options);
	}
}
