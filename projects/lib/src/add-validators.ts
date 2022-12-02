import {AbstractControl} from '@angular/forms';

import {
	AsyncValidatorFn,
	AsyncValidatorFn2,
	ValidatorFn,
	ValidatorFn2,
} from './validator';

// prettier-ignore
export function addValidators<
	TControl extends AbstractControl
>(
	control: TControl,
	...validators: Array<ValidatorFn<TControl>>
): TControl {
	if (validators.length) {
		control.addValidators(validators as Array<ValidatorFn2>);
		control.updateValueAndValidity();
	}
	return control;
}

// prettier-ignore
export function addAsyncValidators<
	TControl extends AbstractControl
>(
	control: TControl,
	...validators: Array<AsyncValidatorFn<TControl>>
): TControl {
	if (validators.length) {
		control.addAsyncValidators(validators as Array<AsyncValidatorFn2>);
		control.updateValueAndValidity();
	}
	return control;
}
