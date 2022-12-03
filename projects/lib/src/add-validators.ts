import {AbstractControl, AsyncValidatorFn, ValidatorFn} from '@angular/forms';

import {CustomAsyncValidatorFn, CustomValidatorFn} from './custom-validator';

// prettier-ignore
export function addValidators<
	TControl extends AbstractControl
>(
	control: TControl,
	...validators: Array<CustomValidatorFn<TControl>>
): TControl {
	if (validators.length) {
		control.addValidators(validators as Array<ValidatorFn>);
		control.updateValueAndValidity();
	}
	return control;
}

// prettier-ignore
export function addAsyncValidators<
	TControl extends AbstractControl
>(
	control: TControl,
	...validators: Array<CustomAsyncValidatorFn<TControl>>
): TControl {
	if (validators.length) {
		control.addAsyncValidators(validators as Array<AsyncValidatorFn>);
		control.updateValueAndValidity();
	}
	return control;
}
