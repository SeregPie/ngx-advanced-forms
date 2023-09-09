import {AbstractControl} from '@angular/forms';

// ---

// todo: format imports
import {CustomValidatorFn, NoopValidator} from '../custom-validator';

export function composeValidators<
	//
	TControl extends AbstractControl,
>(
	//
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

// ---

// todo: format imports
import {CustomAsyncValidatorFn, NoopAsyncValidator} from '../custom-validator';

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
