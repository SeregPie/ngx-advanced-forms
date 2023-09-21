import {fakeAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {withValidators} from '.';

describe('withValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withValidators(
			new FormControl(1, {nonNullable: true}),
			({value}) => value % 2 ? {error: true} : null,
		);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = () => null;
		withValidators(form, validator);

		expect(form.hasValidator(validator)).toBeTrue();
	}));

	it('should call validators only once', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = (jasmine
			.createSpy('customValidator', () => null)
			.and.callThrough()
		);
		withValidators(form, validator);

		expect(validator).toHaveBeenCalledTimes(1);
	}));

	it('should not replace existing validators', fakeAsync(async () => {
		let initialValidator = () => null;
		let initialAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: initialValidator,
			asyncValidators: initialAsyncValidator,
		});
		withValidators(form, () => ({error: true}));

		expect(form.hasValidator(initialValidator)).toBeTrue();
		expect(form.hasAsyncValidator(initialAsyncValidator)).toBeTrue();
	}));
});
