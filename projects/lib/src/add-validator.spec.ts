import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {addAsyncValidator, addValidator} from './add-validator';

describe('addValidator', () => {
	it('should validate', () => {
		const form = addValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			(form) => (form.value % 2 ? {error: true} : null),
		);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.valid).toBeTrue();
	});

	it('should contain validator', () => {
		const myValidator = () => null;
		const form = addValidator(new FormControl(null), myValidator);

		expect(form.hasValidator(myValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const myValidator = jasmine
			.createSpy(undefined, () => null)
			.and.callThrough();
		addValidator(new FormControl(null), myValidator);

		expect(myValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const myValidator = () => null;
		const myAsyncValidator = async () => null;
		const form = addValidator(
			new FormControl(null, {
				validators: myValidator,
				asyncValidators: myAsyncValidator,
			}),
			() => ({error: true}),
		);

		expect(form.hasValidator(myValidator)).toBeTrue();
		expect(form.hasAsyncValidator(myAsyncValidator)).toBeTrue();
	});
});

describe('addAsyncValidator', () => {
	it('should validate', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
			async (form) => (form.value % 2 ? {error: true} : null),
		);

		expect(form.pending).toBeTrue();

		flush();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		flush();

		expect(form.valid).toBeTrue();
	}));

	it('should contain validator', () => {
		const myAsyncValidator = async () => null;
		const form = addAsyncValidator(new FormControl(null), myAsyncValidator);

		expect(form.hasAsyncValidator(myAsyncValidator)).toBeTrue();
	});

	it('should call validator only once', () => {
		const myAsyncValidator = jasmine
			.createSpy(undefined, async () => null)
			.and.callThrough();
		addAsyncValidator(new FormControl(null), myAsyncValidator);

		expect(myAsyncValidator).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const myValidator = () => null;
		const myAsyncValidator = async () => null;
		const form = addAsyncValidator(
			new FormControl(null, {
				validators: myValidator,
				asyncValidators: myAsyncValidator,
			}),
			async () => ({error: true}),
		);

		expect(form.hasValidator(myValidator)).toBeTrue();
		expect(form.hasAsyncValidator(myAsyncValidator)).toBeTrue();
	});
});
