import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

// prettier-ignore
export interface CustomValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

// prettier-ignore
export let NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// prettier-ignore
// todo: rename
export let FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): TErrors;
	};
} = (errors) => () => errors;

// prettier-ignore
export function withValidators<
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
