// todo: format imports
import {AbstractControl, ValidationErrors} from '@angular/forms';

// todo: rename
export type Dddmmxdl<T> = {
	<TControl extends AbstractControl>(control: TControl): T;
};

// todo: rename
export type Lszrkdcm<T> = Dddmmxdl<Promise<T>>;

// ---

import {ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	//
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

export const NoopValidator: Dddmmxdl<null> = () => null;

// todo: rename
export const FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): Dddmmxdl<TErrors>;
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

export const NoopAsyncValidator: Lszrkdcm<null> = async () => null;

// todo: rename
export const FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): Lszrkdcm<TErrors>;
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
