import {AbstractControl} from '@angular/forms';

import {CustomValidatorFn} from './custom-validator';
import {NoopValidator} from './noop-validator';

export function composeValidators<TControl extends AbstractControl>(
	validators: Array<CustomValidatorFn<TControl>>,
): CustomValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return NoopValidator;
		case 1:
			return validators[0];
	}
	return (control) => {
		for (const validator of validators) {
			const errors = validator(control);
			if (errors != null) {
				return errors;
			}
		}
		return null;
	};
}
