import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl, Validators} from '@angular/forms';

import {combineAsyncValidators, combineValidators} from './combine-validators';
import {
	withCustomAsyncValidator,
	withCustomValidator,
} from './with-custom-validator';

describe('combineValidators', () => {
	it('', () => {
		const form = withCustomValidator(
			new FormControl(0),
			combineValidators(Validators.required, Validators.min(3)),
		);

		expect(form.invalid).toBeTrue();

		form.setValue(null);

		expect(form.invalid).toBeTrue();

		form.setValue(5);

		expect(form.valid).toBeTrue();
	});

	it('', () => {
		const form = withCustomValidator(
			new FormControl(3),
			combineValidators(Validators.max(2), Validators.max(4)),
		);

		expect(form.errors).toEqual({});

		form.setValue(5);

		expect(form.errors).toEqual({});
	});
});

describe('combineAsyncValidators', () => {
	it('', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(0),
			combineAsyncValidators(Validators.required, Validators.min(3)),
		);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.invalid).toBeTrue();

		form.setValue(null);

		expect(form.pending).toBeTrue();
		flush();
		expect(form.invalid).toBeTrue();

		form.setValue(5);

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
