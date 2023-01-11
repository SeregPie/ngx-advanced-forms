import {AbstractControl, AsyncValidatorFn, ValidatorFn} from '@angular/forms';

import {TypedAsyncValidatorFn, TypedValidatorFn} from './typed-validator';

export function withCustomValidator<
	TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: TypedValidatorFn<TControl>): TControl {
	control.addValidators(validator as ValidatorFn);
	control.updateValueAndValidity();
	return control;
}

export function withCustomAsyncValidator<
	TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: TypedAsyncValidatorFn<TControl>): TControl {
	control.addAsyncValidators(validator as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
}
