import {AbstractControl} from '@angular/forms';

import {TypedAsyncValidatorFn, TypedValidatorFn} from './typed-validator';

// todo: rename
export function combineValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedValidatorFn<TControl>>
): TypedValidatorFn<TControl> {
	validators;
	return (control) => {
		return null;
	};
}

// todo: rename
export function combineAsyncValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedAsyncValidatorFn<TControl>>
): TypedAsyncValidatorFn<TControl> {
	validators.forEach;
	return (control) => {
		return null;
	};
}
