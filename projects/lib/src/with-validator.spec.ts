import {fakeAsync, flush} from '@angular/core/testing';
import {AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';

import {withCustomAsyncValidator, withCustomValidator} from './with-validator';

const dummyValidatorFn: ValidatorFn = () => null;

const dummyAsyncValidatorFn: AsyncValidatorFn = () => Promise.resolve(null);

describe('withCustomValidator', () => {
	it('should validate', () => {
		const form = withCustomValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			(form) => (form.value % 2 ? {error: true} : null),
		);

		expect(form.invalid).toBeTrue();

		form.setValue(2);
		expect(form.valid).toBeTrue();
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
			() => null,
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
			(form) => Promise.resolve(form.value % 2 ? {error: true} : null),
		);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.invalid).toBeTrue();

		form.setValue(2);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.valid).toBeTrue();
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
			() => Promise.resolve(null),
		);
		expect(form.hasValidator(dummyValidatorFn)).toBeTrue();
		expect(form.hasAsyncValidator(dummyAsyncValidatorFn)).toBeTrue();
	});
});
