import {AbstractControl} from '@angular/forms';

import {AsyncValidatorFn, ValidatorFn} from './validator';

export function concatValidators<
	TControl extends AbstractControl = AbstractControl,
>(...validators: Array<ValidatorFn<TControl>>): ValidatorFn<TControl> {
	return (control) => {
		for (const validator of validators) {
			const errors = validator(control);
			if (errors) {
				return errors;
			}
		}
		return null;
	};
}

export function concatAsyncValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<AsyncValidatorFn<TControl>>
): AsyncValidatorFn<TControl> {
	validators;
	// todo: implement
	throw 'not implemented yet';
}
