import {fakeAsync, flush} from '@angular/core/testing';
import {AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';

import {addAsyncValidator, addValidator} from './add-validator';

// todo: replace
const dummyValidator: ValidatorFn = () => null;

// todo: replace
const dummyAsyncValidator: AsyncValidatorFn = async () => await null;

describe('addValidator', () => {
	it('should validate', () => {
		const form = addValidator(
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
		const form = addValidator(new FormControl(0), dummyValidator);

		expect(form.hasValidator(dummyValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customValidator = jasmine
			.createSpy(undefined, dummyValidator)
			.and.callThrough();
		addValidator(new FormControl(0), customValidator);

		expect(customValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const form = addValidator(
			new FormControl(0, {
				validators: dummyValidator,
				asyncValidators: dummyAsyncValidator,
			}),
			() => null, // todo: replace
		);

		expect(form.hasValidator(dummyValidator)).toBeTrue();
		expect(form.hasAsyncValidator(dummyAsyncValidator)).toBeTrue();
	});
});

describe('addAsyncValidator', () => {
	it('should validate', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			(form) => MinAsyncValidator.validate(form.value, 2), // todo: replace & asyncify
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
		const form = addAsyncValidator(new FormControl(null), dummyAsyncValidator);

		expect(form.hasAsyncValidator(dummyAsyncValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const customAsyncValidator = jasmine
			.createSpy(undefined, NoopAsyncValidator)
			.and.callThrough();
		addAsyncValidator(new FormControl(null), customAsyncValidator);

		expect(customAsyncValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const form = addAsyncValidator(
			new FormControl(null, {
				validators: NoopValidator,
				asyncValidators: NoopAsyncValidator,
			}),
			RequiredAsyncValidator,
		);

		expect(form.hasValidator(NoopValidator)).toBeTrue();
		expect(form.hasAsyncValidator(NoopAsyncValidator)).toBeTrue();
	});
});
