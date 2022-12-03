import {AbstractControl} from '@angular/forms';
import {concat, defer} from 'rxjs';
import {first, takeLast} from 'rxjs/operators';

import {CustomAsyncValidatorFn, CustomValidatorFn} from './custom-validator';
import {noopAsyncValidator, noopValidator} from './noop-validator';

// prettier-ignore
export function concatValidators<
	TControl extends AbstractControl,
>(
	...validators: Array<CustomValidatorFn<TControl>>
): CustomValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return noopValidator;
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

// prettier-ignore
export function concatAsyncValidators<
	TControl extends AbstractControl,
>(
	...validators: Array<CustomAsyncValidatorFn<TControl>>
): CustomAsyncValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return noopAsyncValidator;
		case 1:
			return validators[0];
	}
	return (control) => concat(...validators.map((validator) => defer(() => validator(control)).pipe(takeLast(1)))).pipe(first((errors) => errors != null, null));
}
