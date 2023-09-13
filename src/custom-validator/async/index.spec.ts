import {
	fakeAsync,
	tick,
} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {withCustomAsyncValidators} from '.';

describe('withCustomAsyncValidators', () => {
	it('should work', fakeAsync(() => {
		let form = withCustomAsyncValidators(
			new FormControl(1, {nonNullable: true}),
			async ({value}) => value % 2 ? {error: true} : null,
		);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(() => {
		let form = new FormControl(null);
		let customAsyncValidator = async () => null;
		withCustomAsyncValidators(form, customAsyncValidator);

		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	}));

	it('should call validators only once', fakeAsync(() => {
		let form = new FormControl(null);
		let customAsyncValidator = (jasmine
			.createSpy('customAsyncValidator', async () => null)
			.and.callThrough()
		);
		withCustomAsyncValidators(form, customAsyncValidator);

		expect(customAsyncValidator).toHaveBeenCalledTimes(1);
	}));

	it('should not replace existing validators', fakeAsync(() => {
		let customValidator = () => null;
		let customAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		withCustomAsyncValidators(form, async () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	}));
});
