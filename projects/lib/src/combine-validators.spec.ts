import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl, Validators} from '@angular/forms';

import {combineAsyncValidators, combineValidators} from './combine-validators';
import {
	withCustomAsyncValidator,
	withCustomValidator,
} from './with-custom-validator';

describe('combineValidators', () => {
	it('should validate', () => {
		const form = withCustomValidator(
			new FormControl(0),
			combineValidators(Validators.required, Validators.min(1)),
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
		const form = withCustomValidator(
			new FormControl('aaaa', {
				nonNullable: true,
			}),
			combineValidators(Validators.maxLength(3), Validators.pattern(/^b*$/)),
		);

		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			maxlength: {requiredLength: 3, actualLength: 4},
		}); // todo: keys only

		form.setValue('aa');

		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({
			pattern: {requiredPattern: '^b*$', actualValue: 'aa'},
		}); // todo: keys only
	});

	it('todo: text', () => {
		// todo: test if skip after not null
	});
});

describe('combineAsyncValidators', () => {
	it('should validate', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(0),
			combineAsyncValidators(
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
		const form = withCustomAsyncValidator(
			new FormControl('aaaa', {
				nonNullable: true,
			}),
			combineAsyncValidators(
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
		// todo: test if skip after not null
	});

	it('todo: text', () => {
		// todo: test if only latest value
	});

	it('todo: text', () => {
		// todo: test with EMPTY
	});
});
