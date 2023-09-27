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
export function composeValidators<
	TControl extends AbstractControl,
>(
	validators: Array<CustomValidatorFn<TControl>>,
): CustomValidatorFn<TControl> {
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
}

export * from './async';
