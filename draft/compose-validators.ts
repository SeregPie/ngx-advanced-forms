import {AbstractControl} from '@angular/forms';
import {concat, defer} from 'rxjs';
import {first, takeLast} from 'rxjs/operators';

import {CustomAsyncValidatorFn, CustomValidatorFn} from './custom-validator';
import {NoopAsyncValidator, NoopValidator} from './noop-validator';

// prettier-ignore
export function composeAsyncValidators
	<TControl extends AbstractControl>(validators: Array<CustomAsyncValidatorFn<TControl>>): CustomAsyncValidatorFn<TControl>
{
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	// : rework
	return (control) => concat(...validators.map((validator) => defer(() => validator(control)).pipe(takeLast(1)))).pipe(first((errors) => errors != null, null));
}
