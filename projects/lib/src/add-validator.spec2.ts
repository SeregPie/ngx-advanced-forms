import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {addAsyncValidator, addValidator} from './add-validator';

describe('addValidator', () => {
	it('should validate', () => {
		const form = addValidator(
			new FormControl(11, {
				nonNullable: true,
			}),
			(form) => (form.value % 2 ? {error: true} : null),
		);

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({error: true});

		form.setValue(12);

		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	});

	it('should contain validator', () => {
		const customValidator = () => null;
		const form = addValidator(new FormControl(null), customValidator);

		expect(form.hasValidator(customValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customValidator = jasmine
			.createSpy(undefined, () => null)
			.and.callThrough();
		addValidator(new FormControl(null), customValidator);

		expect(customValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = addValidator(
			new FormControl(null, {
				validators: customValidator,
				asyncValidators: customAsyncValidator,
			}),
			() => ({error: true}),
		);

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});
});

describe('addAsyncValidator', () => {
	it('should validate', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(11, {
				nonNullable: true,
			}),
			async (form) => {
				const n = form.value;
				return n % 2 ? {even: n} : null;
			},
		);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({even: 11});

		form.setValue(12);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	}));

	it('should contain validator', () => {
		const customAsyncValidator = async () => null;
		const form = addAsyncValidator(new FormControl(null), customAsyncValidator);

		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customAsyncValidator = jasmine
			.createSpy(undefined, async () => null)
			.and.callThrough();
		addAsyncValidator(new FormControl(null), customAsyncValidator);

		expect(customAsyncValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = addAsyncValidator(
			new FormControl(null, {
				validators: customValidator,
				asyncValidators: customAsyncValidator,
			}),
			async () => ({error: true}),
		);

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});
});
