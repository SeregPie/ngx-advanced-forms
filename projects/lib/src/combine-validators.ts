import {AbstractControl} from '@angular/forms';

import {TypedAsyncValidatorFn, TypedValidatorFn} from './typed-validator';

// todo: rename
export function combineValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedValidatorFn<TControl>>
): TypedValidatorFn<TControl> {
	// todo: implement
	throw null;
}

// todo: rename
export function combineAsyncValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedAsyncValidatorFn<TControl>>
): TypedAsyncValidatorFn<TControl> {
	// todo: implement
	throw null;
}
