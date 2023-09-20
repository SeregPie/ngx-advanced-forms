import {
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';

export interface CustomValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

export let NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// todo: rename
export let FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): TErrors;
	};
} = (errors) => () => errors;

export function withCustomValidators<
	TControl extends AbstractControl,
>(
	control: TControl,
	validators: (
		| CustomValidatorFn<TControl>
		| Array<CustomValidatorFn<TControl>>
	),
): TControl {
	control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
}

export * from './async';
