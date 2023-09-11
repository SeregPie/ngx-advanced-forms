// todo: format imports

import {AbstractControl} from '@angular/forms';

import {
	CustomAsyncValidatorFn,
	NoopAsyncValidator,
} from '../../custom-validator';

export function composeAsyncValidators<
	//
	TControl extends AbstractControl,
>(
	//
	validators: Array<CustomAsyncValidatorFn<TControl>>,
): CustomAsyncValidatorFn<TControl> {
	switch (validators.length) {
		case 0:
			return NoopAsyncValidator;
		case 1:
			return validators[0];
	}
	return (_control) => {
		// todo: implement
		throw 'not implemented yet';
	};
}
