import {AbstractControl} from '@angular/forms';

import {
	CustomAsyncValidatorFn,
	CustomValidatorFn,
} from './custom-validator';
import {
	NoopAsyncValidator,
	NoopValidator,
} from './noop-validator';

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

export function composeAsyncValidators<TControl extends AbstractControl>(
	validators: Array<CustomAsyncValidatorFn<TControl>>,
): CustomAsyncValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	throw 'not implemented yet';
	// todo
	// return (control) => concat(...validators.map((validator) => defer(() => validator(control)).pipe(takeLast(1)))).pipe(first((errors) => errors != null, null));
}
