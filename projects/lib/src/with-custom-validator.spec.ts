import {fakeAsync, flush} from '@angular/core/testing';
import {AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';

import {
	withCustomAsyncValidator,
	withCustomValidator,
} from './with-custom-validator';

// todo: replace
const dummyValidatorFn: ValidatorFn = () => null;

// todo: replace
const dummyAsyncValidatorFn: AsyncValidatorFn = async () => await null;

describe('withCustomValidator', () => {
	it('should validate', () => {
		const form = withCustomValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			(form) => (form.value % 2 ? {epeqmxsg: true} : null), // todo: replace
		);
		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({epeqmxsg: true});
		form.setValue(2);
		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	});

	it('should contain validator', () => {
		const form = withCustomValidator(new FormControl(0), dummyValidatorFn);
		expect(form.hasValidator(dummyValidatorFn)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customValidatorFn = jasmine
			.createSpy(undefined, dummyValidatorFn)
			.and.callThrough();
		withCustomValidator(new FormControl(0), customValidatorFn);
		expect(customValidatorFn).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const form = withCustomValidator(
			new FormControl(0, {
				validators: dummyValidatorFn,
				asyncValidators: dummyAsyncValidatorFn,
			}),
			() => null, // todo: replace
		);
		expect(form.hasValidator(dummyValidatorFn)).toBeTrue();
		expect(form.hasAsyncValidator(dummyAsyncValidatorFn)).toBeTrue();
	});
});

describe('withCustomAsyncValidator', () => {
	it('should validate', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			async (form) => await (form.value % 2 ? {epeqmxsg: true} : null), // todo: replace & asyncify
		);
		expect(form.pending).toBeTrue();
		flush();
		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({epeqmxsg: true});
		form.setValue(2);
		expect(form.pending).toBeTrue();
		flush();
		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	}));

	it('should contain validator', () => {
		const form = withCustomAsyncValidator(
			new FormControl(0),
			dummyAsyncValidatorFn,
		);
		expect(form.hasAsyncValidator(dummyAsyncValidatorFn)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customAsyncValidatorFn = jasmine
			.createSpy(undefined, dummyAsyncValidatorFn)
			.and.callThrough();
		withCustomAsyncValidator(new FormControl(0), customAsyncValidatorFn);
		expect(customAsyncValidatorFn).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const form = withCustomAsyncValidator(
			new FormControl(0, {
				validators: dummyValidatorFn,
				asyncValidators: dummyAsyncValidatorFn,
			}),
			async () => await null, // todo: replace & asyncify
		);
		expect(form.hasValidator(dummyValidatorFn)).toBeTrue();
		expect(form.hasAsyncValidator(dummyAsyncValidatorFn)).toBeTrue();
	});
});
