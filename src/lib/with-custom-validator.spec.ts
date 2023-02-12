import {
	fakeAsync,
	tick,
} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {
	withCustomAsyncValidator,
	withCustomValidator,
} from './with-custom-validator';

describe('withCustomValidator', () => {
	it('should work', () => {
		const form = withCustomValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			(form) => (form.value % 2 ? {error: true} : null),
		);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	});

	it('should contain validator', () => {
		const form = new FormControl(null);
		const customValidator = () => null;
		withCustomValidator(form, customValidator);

		expect(form.hasValidator(customValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const form = new FormControl(null);
		const customValidator = (jasmine
			.createSpy('customValidator', () => null)
			.and.callThrough()
		);
		withCustomValidator(form, customValidator);

		expect(customValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		withCustomValidator(form, () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});
});

describe('withCustomAsyncValidator', () => {
	it('should work', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			async (form) => (form.value % 2 ? {error: true} : null),
		);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toBeNull();
	}));

	it('should contain validator', () => {
		const form = new FormControl(null);
		const customAsyncValidator = async () => null;
		withCustomAsyncValidator(form, customAsyncValidator);

		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const form = new FormControl(null);
		const customAsyncValidator = (jasmine
			.createSpy('customAsyncValidator', async () => null)
			.and.callThrough()
		);
		withCustomAsyncValidator(form, customAsyncValidator);

		expect(customAsyncValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		withCustomAsyncValidator(form, async () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});
});
