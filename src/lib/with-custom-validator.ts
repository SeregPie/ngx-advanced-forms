import {
	AbstractControl,
	AsyncValidatorFn,
	ValidatorFn,
} from '@angular/forms';

import {
	CustomAsyncValidatorFn,
	CustomValidatorFn,
} from './custom-validator';

export function withCustomValidator<
	TControl extends AbstractControl,
>(
	control: TControl,
	validator: CustomValidatorFn<TControl>,
): TControl {
	control.addValidators(validator as ValidatorFn);
	control.updateValueAndValidity();
	return control;
}

export function withCustomAsyncValidator<
	TControl extends AbstractControl,
>(
	control: TControl,
	validator: CustomAsyncValidatorFn<TControl>,
): TControl {
	control.addAsyncValidators(validator as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
}
