import {AbstractControl} from '@angular/forms';

import {AsyncValidatorFn, ValidatorFn} from './validator';

export function addValidator<
	TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: ValidatorFn<TControl>): TControl {
	control.addValidators(validator as ValidatorFn);
	control.updateValueAndValidity();
	return control;
}

export function addAsyncValidator<
	TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: AsyncValidatorFn<TControl>): TControl {
	control.addAsyncValidators(validator as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
}
