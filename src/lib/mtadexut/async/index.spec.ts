import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {withAsyncValidators} from '.';

// prettier-ignore
describe('withAsyncValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withAsyncValidators(
			new FormControl(1, {nonNullable: true}),
			async ({value}) => value % 2 ? {error: true} : null,
		);

		expect(form.pending).toBeTrue();

		await tick();

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		await tick();

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = async () => null;
		withAsyncValidators(form, validator);

		expect(form.hasAsyncValidator(validator)).toBeTrue();
	}));

	it('should call validators only once', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = (jasmine
			.createSpy('validator', async () => null)
			.and.callThrough()
		);
		withAsyncValidators(form, validator);

		expect(validator).toHaveBeenCalledTimes(1);
	}));

	it('should not replace existing validators', fakeAsync(async () => {
		let initialValidator = () => null;
		let initialAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: initialValidator,
			asyncValidators: initialAsyncValidator,
		});
		withAsyncValidators(form, async () => ({error: true}));

		expect(form.hasValidator(initialValidator)).toBeTrue();
		expect(form.hasAsyncValidator(initialAsyncValidator)).toBeTrue();
	}));
});
