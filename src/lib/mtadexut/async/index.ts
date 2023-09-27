import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';

// prettier-ignore
export interface CustomAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

// prettier-ignore
export let NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
// prettier-ignore
export let FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

// prettier-ignore
export function withAsyncValidators<
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
