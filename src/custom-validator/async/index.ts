import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';

export interface CustomAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

export const NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
export const FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

export function withCustomAsyncValidators<
	TControl extends AbstractControl,
>(
	control: TControl,
	validators:
		| Array<CustomAsyncValidatorFn<TControl>>
		| CustomAsyncValidatorFn<TControl>,
): TControl {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
}
