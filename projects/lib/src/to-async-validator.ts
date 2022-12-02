import {AbstractControl} from '@angular/forms';
import {of} from 'rxjs';

import {AsyncValidatorFn, ValidatorFn} from './validator';

export function toAsyncValidator<TControl extends AbstractControl>(
	validator: ValidatorFn<TControl>,
): AsyncValidatorFn<TControl> {
	return (control) => of(validator(control));
}
