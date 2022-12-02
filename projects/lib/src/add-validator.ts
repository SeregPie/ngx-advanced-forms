import {AbstractControl} from '@angular/forms';

import {AsyncValidatorFn, AsyncValidatorFn2, ValidatorFn, ValidatorFn2} from './validator';

export function addValidator<TControl extends AbstractControl>(
	control: TControl,
	validator: ValidatorFn<TControl>,
): TControl {
	control.addValidators(validator as ValidatorFn2);
	control.updateValueAndValidity();
	return control;
}

export function addAsyncValidator<TControl extends AbstractControl>(
	control: TControl,
	validator: AsyncValidatorFn<TControl>,
): TControl {
	control.addAsyncValidators(validator as AsyncValidatorFn2);
	control.updateValueAndValidity();
	return control;
}
