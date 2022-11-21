import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl, Validators} from '@angular/forms';

import {concatAsyncValidators, concatValidators} from './concat-validators';
import {addAsyncValidator, addValidator} from './add-validator';

describe('concatValidators', () => {
	it('should validate', () => {
		const form = addValidator(
			new FormControl(0),
			concatValidators(Validators.required, Validators.min(1)),
		);

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({min: {min: 1, actual: 0}}); // todo: keys only

		form.setValue(null);

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({required: true}); // todo: keys only

		form.setValue(2);

		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	});

	it('todo: text', () => {
		const form = addValidator(
			new FormControl('aaaa', {
				nonNullable: true,
			}),
			concatValidators(Validators.maxLength(3), Validators.pattern(/^b*$/)),
		);

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			maxlength: {requiredLength: 3, actualLength: 4},
		}); // todo: keys only

		form.setValue('aa');

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			pattern: {requiredPattern: '^b*$', actualValue: 'aa'},
		}); // todo: keys only
	});

	it('todo: text', () => {
		const customValidator1 = jasmine
			.createSpy(undefined, () => null)
			.and.callThrough();
		const customValidator2 = jasmine
			.createSpy(undefined, () => ({error: true}))
			.and.callThrough();
		const customValidator3 = jasmine
			.createSpy(undefined, () => null)
			.and.callThrough();
		addValidator(
			new FormControl(0),
			concatValidators(customValidator1, customValidator2, customValidator3),
		);

		expect(customValidator1).toHaveBeenCalledTimes(1);
		expect(customValidator2).toHaveBeenCalledTimes(1);
		expect(customValidator3).toHaveBeenCalledTimes(0);
	});
});

describe('concatAsyncValidators', () => {
	it('should validate', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(0),
			concatAsyncValidators(
				async (form) => await Validators.required(form),
				async (form) => await Validators.min(1)(form),
			), // todo: asyncify
		);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({min: {min: 1, actual: 0}}); // todo: keys only

		form.setValue(null);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({required: true}); // todo: keys only

		form.setValue(2);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	}));

	it('todo: text', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl('aaaa', {
				nonNullable: true,
			}),
			concatAsyncValidators(
				async (form) => await Validators.maxLength(3)(form),
				async (form) => await Validators.pattern(/^b*$/)(form),
			), // todo: asyncify
		);

		expect(form.pending).toBeTrue();

		flush();

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			maxlength: {requiredLength: 3, actualLength: 4},
		}); // todo: keys only

		form.setValue('aa');

		expect(form.pending).toBeTrue();

		flush();

		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			pattern: {requiredPattern: '^b*$', actualValue: 'aa'},
		}); // todo: keys only
	}));

	it('todo: text', () => {
		addAsyncValidator(
			new FormControl(0),
			concatAsyncValidators(
				customAsyncValidator1,
				customAsyncValidator2,
				customAsyncValidator3,
			),
		);

		expect(customAsyncValidator1).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator2).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator3).toHaveBeenCalledTimes(0);
	});

	it('todo: text', () => {
		// todo: test if only latest value
	});

	it('todo: text', () => {
		// todo: test with EMPTY
	});

	// test promises, observables

	// test immediate
});
