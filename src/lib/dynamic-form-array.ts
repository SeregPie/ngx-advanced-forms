import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormArray} from './form-array';

export class DynamicFormArray<TControl extends AbstractControl = AbstractControl>
	extends FormArray<TControl>
{
	constructor(
		controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super([], options);
		this.#controlFactory = controlFactory;
	}

	#controlFactory: () => TControl;

	get controlFactory(): () => TControl {
		return this.#controlFactory;
	}

	override setValue(value: Array<ɵRawValue<TControl>>, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}

	override reset(value: Array<ɵRawValue<TControl>> = [], options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}
}
