import {fakeAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {withCustomValidators} from '.';

describe('withCustomValidators', () => {
	it('should work', fakeAsync(() => {
		let form = withCustomValidators(
			new FormControl(1, {nonNullable: true}),
			({value}) => value % 2 ? {error: true} : null,
		);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(() => {
		let form = new FormControl(null);
		let customValidator = () => null;
		withCustomValidators(form, customValidator);

		expect(form.hasValidator(customValidator)).toBeTrue();
	}));

	it('should call validators only once', fakeAsync(() => {
		let form = new FormControl(null);
		let customValidator = (jasmine
			.createSpy('customValidator', () => null)
			.and.callThrough()
		);
		withCustomValidators(form, customValidator);

		expect(customValidator).toHaveBeenCalledTimes(1);
	}));

	it('should not replace existing validators', fakeAsync(() => {
		let customValidator = () => null;
		let customAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		withCustomValidators(form, () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	}));
});
