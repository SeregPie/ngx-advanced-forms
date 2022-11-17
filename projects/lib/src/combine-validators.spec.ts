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
			new FormControl<null | number>(null),
			combineValidators(Validators.required, Validators.min(1)),
		);
		expect(form.invalid).toBeTrue();
		form.setValue(0);
		expect(form.invalid).toBeTrue();
		form.setValue(1);
		expect(form.valid).toBeTrue();
	});

	it('', () => {
		const form = withCustomValidator(
			new FormControl(''),
			combineValidators(Validators.minLength(1), Validators.min(2)),
		);
		expect(form.errors).toEqual({min: {min: 1, actual: 0}});
		form.setValue(1);
		expect(form.errors).toEqual({min: {min: 2, actual: 1}});
	});
});

describe('combineAsyncValidators', () => {
	it('should validate', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl<null | number>(null),
			combineAsyncValidators(Validators.required, Validators.min(1)), // todo: asyncify
		);
		expect(form.pending).toBeTrue();
		flush();
		expect(form.invalid).toBeTrue();
		form.setValue(0);
		expect(form.pending).toBeTrue();
		flush();
		expect(form.invalid).toBeTrue();
		form.setValue(1);
		expect(form.pending).toBeTrue();
		flush();
		expect(form.valid).toBeTrue();
	}));

	it('', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(3),
			combineAsyncValidators(Validators.max(2), Validators.max(4)),
		);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.errors).toEqual({});

		form.setValue(5);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.errors).toEqual({});
	}));
});
