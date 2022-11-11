import {AbstractControl} from '@angular/forms';

import {TypedAsyncValidatorFn, TypedValidatorFn} from './typed-validator';

export function combineValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedValidatorFn<TControl>>
): TypedValidatorFn<TControl> {
	return (control: TControl) => {
		for (const validator of validators) {
			const errors = validator(control);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
}

export function combineAsyncValidators<
	TControl extends AbstractControl = AbstractControl,
>(
	...validators: Array<TypedAsyncValidatorFn<TControl>>
): TypedAsyncValidatorFn<TControl> {
	throw null;
}
