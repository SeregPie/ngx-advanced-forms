import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

// prettier-ignore
export interface CustomValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): ReturnType<ValidatorFn>;
}

// todo: rename
// prettier-ignore
export const NoopValidator: {
	(control: AbstractControl): null;
} = () => null;

// todo: rename
// prettier-ignore
export const FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		(control: AbstractControl): TErrors;
	};
} = (errors) => () => errors;

export const withValidators: {
	<TControl extends AbstractControl>(
		control: TControl,
		// prettier-ignore
		validators: (
			| CustomValidatorFn<TControl>
			| Readonly<Array<CustomValidatorFn<TControl>>>
		),
	): TControl;
} = (control, validators) => {
	// todo
	// control.addValidators(validators);
	control.updateValueAndValidity();
	return control;
};

// prettier-ignore
export const composeValidators: {
	<TControl extends AbstractControl>(
		validators: Readonly<Array<CustomValidatorFn<TControl>>>,
	): CustomValidatorFn<TControl>;
} = (validators) => {
	switch (validators.length) {
		case 0:
			return NoopValidator;
		case 1:
			return validators[0];
	}
	return (control) => {
		for (let validator of validators) {
			let errors = validator(control);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
};

export * from './async';
