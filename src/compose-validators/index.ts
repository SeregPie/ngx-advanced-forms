import {AbstractControl} from '@angular/forms';

import {
	CustomValidatorFn,
	NoopValidator,
} from '../custom-validator';

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
