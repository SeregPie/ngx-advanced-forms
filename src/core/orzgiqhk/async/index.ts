import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import {isObservable, lastValueFrom} from 'rxjs';

export interface CustomAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

export let NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
export let FailAsyncValidator: {
	// prettier-ignore
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

export function withAsyncValidators<
	//
	TControl extends AbstractControl,
>(
	control: TControl,
	// prettier-ignore
	validators: (
		| CustomAsyncValidatorFn<TControl>
		| Array<CustomAsyncValidatorFn<TControl>>
	),
): TControl {
	// todo
	// control.addAsyncValidators(validators as AsyncValidatorFn | Array<AsyncValidatorFn>);
	control.updateValueAndValidity();
	return control;
}

export function composeAsyncValidators<
	//
	TControl extends AbstractControl,
>(
	validators: Array<CustomAsyncValidatorFn<TControl>>,
): CustomAsyncValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	return async (control) => {
		// todo
		for (let validator of validators) {
			let errors = await ((v) => (isObservable(v) ? lastValueFrom(v) : v))(
				validator(control),
			);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
}
