import {AbstractControl} from '@angular/forms';

// ---

import {ValidatorFn} from '@angular/forms';

export interface CustomValidatorFn<
	//
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

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
