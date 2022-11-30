import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {concatAsyncValidators, concatValidators} from './concat-validators';
import {addAsyncValidator, addValidator} from './add-validator';

describe('concatValidators', () => {
	it('should work', () => {
		const form = addValidator(
			new FormControl(1),
			concatValidators(
				(form) => (form.value === 1 ? {error: 1} : null),
				(form) => (form.value === 2 ? {error: 2} : null),
			),
		);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 1});

		form.setValue(2);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 2});

		form.setValue(3);

		expect(form.valid).toBeTrue();
	});

	it('should skip other validators after one fails', () => {
		const customValidator1 = jasmine.createSpy(undefined, () => null).and.callThrough();
		const customValidator2 = jasmine.createSpy(undefined, () => ({error: true})).and.callThrough();
		const customValidator3 = jasmine.createSpy(undefined, () => null).and.callThrough();
		addValidator(
			new FormControl(null),
			concatValidators(customValidator1, customValidator2, customValidator3),
		);

		expect(customValidator1).toHaveBeenCalledTimes(1);
		expect(customValidator2).toHaveBeenCalledTimes(1);
		expect(customValidator3).toHaveBeenCalledTimes(0);
	});

	it('should return same validator if only one provided', () => {
		const customValidator = () => null;

		expect(concatValidators(customValidator)).toBe(customValidator);
	});

	xit('should return noop validator if nothing provided', () => {
		expect(concatValidators()).toBe(null);
	});
});

describe('concatAsyncValidators', () => {
	it('should work', fakeAsync(() => {
		const form = addAsyncValidator(
			new FormControl(1),
			concatAsyncValidators(
				async (form) => (form.value === 1 ? {error: 1} : null),
				async (form) => (form.value === 2 ? {error: 2} : null),
			),
		);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 1});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 2});

		form.setValue(3);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.valid).toBeTrue();
	}));

	it('should skip other validators after one fails', fakeAsync(() => {
		const customAsyncValidator1 = jasmine.createSpy(undefined, async () => null).and.callThrough();
		const customAsyncValidator2 = jasmine
			.createSpy(undefined, async () => ({error: true}))
			.and.callThrough();
		const customAsyncValidator3 = jasmine.createSpy(undefined, async () => null).and.callThrough();
		addAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(customAsyncValidator1, customAsyncValidator2, customAsyncValidator3),
		);

		tick();

		expect(customAsyncValidator1).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator2).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator3).toHaveBeenCalledTimes(0);
	}));

	it('should return same validator if only one provided', () => {
		const customAsyncValidator = async () => null;

		expect(concatAsyncValidators(customAsyncValidator)).toBe(customAsyncValidator);
	});

	xit('should return noop validator if nothing provided', () => {
		expect(concatAsyncValidators()).toBe(null);
	});

	it('todo: text', fakeAsync(() => {
		// todo
		const form = addAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(
				() => of({error: 1}, null, null).pipe(delay(0)),
				() => of(null, {error: 2}, null).pipe(delay(0)),
				() => of(null, null, {error: 3}).pipe(delay(0)),
			),
		);

		tick();

		expect(form.errors).toEqual({error: 3});
	}));

	it('todo: text', () => {
		// todo
		const form = addAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(
				() => of({error: 1}, null, null),
				() => of(null, {error: 2}, null),
				() => of(null, null, {error: 3}),
			),
		);

		expect(form.errors).toEqual({error: 3});
	});

	xit('todo: text', fakeAsync(() => {
		// todo
		{
			const form = addAsyncValidator(
				new FormControl(null),
				concatAsyncValidators(
					() => of(),
					async () => null,
					() => of({error: 1}, {error: 2}),
					() => of({error: 4}, {error: 4}).pipe(delay(0)),
					async () => ({error: 5}),
				),
			);

			tick();

			expect(form.errors).toEqual({error: 5});
		}
	}));
});
