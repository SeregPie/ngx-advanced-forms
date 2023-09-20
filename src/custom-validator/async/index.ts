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

export let NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
export let FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

export function withCustomAsyncValidators<
	TControl extends AbstractControl,
>(
	control: TControl,
	validators: (
		| CustomAsyncValidatorFn<TControl>
		| Array<CustomAsyncValidatorFn<TControl>>
	),
): TControl {
	control.addAsyncValidators(validators);
	control.updateValueAndValidity();
	return control;
}
