import {AbstractControl} from '@angular/forms';
import {concat, defer} from 'rxjs';
import {first, takeLast} from 'rxjs/operators';

import {bcldfwsd, xjheeids} from './itbfvrbe';
import {Qlgjlsap} from './jolgeawo';
import {AsyncValidatorFn, ValidatorFn} from './validator';

export function composeValidators<TControl extends AbstractControl>(
	...validators: Array<Qlgjlsap<TControl>>
): Qlgjlsap<TControl> {
	switch (validators.length) {
		case 0:
			return xjheeids;
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
