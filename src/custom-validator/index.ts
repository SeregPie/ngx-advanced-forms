// todo: format imports
import {AbstractControl, ValidationErrors} from '@angular/forms';

// ---

import {ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	//
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

export const NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// todo: rename
export const FailValidator: {
	// prettier-ignore
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): TErrors;
	};
} = (errors) => () => errors;

export function withCustomValidator<
	//
	TControl extends AbstractControl,
>(
	//
	control: TControl,
	validator: CustomValidatorFn<TControl>,
): TControl {
	control.addValidators(validator as ValidatorFn);
	control.updateValueAndValidity();
	return control;
}

// ---

import {AsyncValidatorFn} from '@angular/forms';

export interface CustomAsyncValidatorFn<
	//
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<AsyncValidatorFn>;
}

export const NoopAsyncValidator: {
	(control: AbstractControl): Promise<null>;
} = async () => null;

// todo: rename
export const FailAsyncValidator: {
	// prettier-ignore
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

export function withCustomAsyncValidator<
	//
	TControl extends AbstractControl,
>(
	//
	control: TControl,
	validator: CustomAsyncValidatorFn<TControl>,
): TControl {
	control.addAsyncValidators(validator as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
}
