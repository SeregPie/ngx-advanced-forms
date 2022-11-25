import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl, Validators} from '@angular/forms';

import {concatAsyncValidators, concatValidators} from './concat-validators';
import {addAsyncValidator, addValidator} from './add-validator';
import {EMPTY, from, lastValueFrom, of} from 'rxjs';

describe('concatValidators', () => {
	it('should work', () => {
		const form = addValidator(
			new FormControl(1),
			concatValidators(
				(form) => (form.value === 1 ? {error1: true} : null),
				(form) => (form.value === 2 ? {error2: true} : null),
			),
		);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error1: true});

		form.setValue(2);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error2: true});

		form.setValue(3);

		expect(form.valid).toBeTrue();
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
		const form = new FormControl(0);
		const customValidator1 = jasmine.createSpy(undefined, () => null).and.callThrough();
		const customValidator2 = jasmine.createSpy(undefined, () => ({error: true})).and.callThrough();
		const customValidator3 = jasmine.createSpy(undefined, () => null).and.callThrough();

		expect(customValidator1).toHaveBeenCalledTimes(1);
		expect(customValidator2).toHaveBeenCalledTimes(1);
		expect(customValidator3).toHaveBeenCalledTimes(0);
	});

	it('should return same validator of only one validator provided', () => {
		const customValidator = () => null;

		expect(concatValidators(customValidator)).toBe(customValidator);
	});

	it('should return noop validator of no validator provided', () => {
		expect(concatValidators()).toBe(NoopValidator);
	});
});

describe('concatAsyncValidators', () => {
	it('should work', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(1),
			concatAsyncValidators(
				async (form) => (form.value === 1 ? {error1: true} : null),
				async (form) => (form.value === 2 ? {error2: true} : null),
			),
		);

		expect(form.pending).toBeTrue();

		flush();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error1: true});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		flush();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error2: true});

		form.setValue(3);

		expect(form.pending).toBeTrue();

		flush();

		expect(form.valid).toBeTrue();
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

	it('todo: text', async () => {
		const form = new FormControl(WAT);
		const validateAsync = concatAsyncValidators(
			customAsyncValidator1,
			customAsyncValidator2,
			customAsyncValidator3,
		);

		const validationErrors = await lastValueFrom(from(validateAsync(form)));

		expect(customAsyncValidator1).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator2).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator3).toHaveBeenCalledTimes(0);
	});

	it('should return same validator of only one validator provided', () => {
		const customAsyncValidator = async () => null;

		expect(concatAsyncValidators(customAsyncValidator)).toBe(customAsyncValidator);
	});

	it('should return noop validator of no validator provided', () => {
		expect(concatAsyncValidators()).toBe(NoopAsyncValidator);
	});

	it('todo: text', () => {
		// todo: test if only latest value

		const form = addAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(
				() => of({a: true}, null, null),
				() => of(null, {b: true}, null),
				() => of(null, null, {c: true}),
			),
		);

		expect(form.errors).toEqual({c: true});
	});

	it('todo: text', () => {
		const form = new FormControl(WAT);
		{
			const customAsyncValidator = awaitLa;
			expect(customAsyncValidatorform.errors).toEqual(customErrors3);
		}

		addAsyncValidator(
			concatAsyncValidators(() => EMPTY, customAsyncValidator2, customAsyncValidator3),
		);
	});

	// test promises, observables

	// test immediate
});
