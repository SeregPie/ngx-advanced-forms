// @ts-nocheck

import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

// prettier-ignore
export interface CustomAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

// prettier-ignore
export const NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
// prettier-ignore
export const FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

export const withAsyncValidators: {
	<TControl extends AbstractControl>(
		control: TControl,
		// prettier-ignore
		validators: (
			| CustomAsyncValidatorFn<TControl>
			| Readonly<Array<CustomAsyncValidatorFn<TControl>>>
		),
	): TControl;
} = (control, validators) => {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
};

// prettier-ignore
export const composeAsyncValidators: {
	<TControl extends AbstractControl>(
		validators: Readonly<Array<CustomAsyncValidatorFn<TControl>>>,
	): CustomAsyncValidatorFn<TControl>;
} = (validators) => {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		for (let validator of validators) {
			let errors = await ((v) => isObservable(v) ? lastValueFrom(v) : v)(validator(control));
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};
