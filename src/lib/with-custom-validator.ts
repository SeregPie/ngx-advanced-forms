import {
	AbstractControl,
	AsyncValidatorFn,
	ValidatorFn,
} from '@angular/forms';

import {
	CustomAsyncValidatorFn,
	CustomValidatorFn,
} from './custom-validator';

export const withCustomValidator: {
	<TControl extends AbstractControl>(control: TControl, validator: CustomValidatorFn<TControl>): TControl;
} = (control, validator) => {
	control.addValidators(validator as ValidatorFn);
	control.updateValueAndValidity();
	return control;
};

export const withCustomAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl, validator: CustomAsyncValidatorFn<TControl>): TControl;
} = (control, validator) => {
	control.addAsyncValidators(validator as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
};
