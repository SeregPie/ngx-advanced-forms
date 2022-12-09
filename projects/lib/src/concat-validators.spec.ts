import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {concatAsyncValidators, concatValidators} from './concat-validators';
import {noopAsyncValidator, noopValidator} from './noop-validator';
import {
	withCustomAsyncValidator,
	withCustomValidator,
} from './with-custom-validator';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

// prettier-ignore
describe('concatValidators', () => {
	it('should work', () => {
		const form = withCustomValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
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
		const form = new FormControl(null);
		const customValidators = [
			spy(() => null),
			spy(() => ({error: true})),
			spy(() => null),
		];
		withCustomValidator(form, concatValidators(...customValidators));

		expect(customValidators[0]).toHaveBeenCalledTimes(1);
		expect(customValidators[1]).toHaveBeenCalledTimes(1);
		expect(customValidators[2]).toHaveBeenCalledTimes(0);
	});

	it('should return same validator if only one provided', () => {
		const customValidator = () => null;

		expect(concatValidators(customValidator)).toBe(customValidator);
	});

	it('should return noop validator if nothing provided', () => {
		expect(concatValidators()).toBe(noopValidator);
	});
});

describe('concatAsyncValidators', () => {
	// prettier-ignore
	it('should work', fakeAsync(() => {
		const form = withCustomAsyncValidator(
			new FormControl(1, {
				nonNullable: true,
			}),
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

	// prettier-ignore
	it('should skip other validators after one fails', fakeAsync(() => {
		const form = new FormControl(null);
		const customAsyncValidators = [
			spy(async () => null),
			spy(async () => ({error: true})),
			spy(async () => null),
		];
		withCustomAsyncValidator(form, concatAsyncValidators(...customAsyncValidators));

		tick();

		expect(customAsyncValidators[0]).toHaveBeenCalledTimes(1);
		expect(customAsyncValidators[1]).toHaveBeenCalledTimes(1);
		expect(customAsyncValidators[2]).toHaveBeenCalledTimes(0);
	}));

	// prettier-ignore
	it('should return same validator if only one provided', () => {
		const customAsyncValidator = async () => null;

		expect(concatAsyncValidators(customAsyncValidator)).toBe(customAsyncValidator);
	});

	// prettier-ignore
	it('should return noop validator if nothing provided', () => {
		expect(concatAsyncValidators()).toBe(noopAsyncValidator);
	});

	it('todo: text', fakeAsync(() => {
		// todo
		const form = withCustomAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(
				() => of({error: 1}, null, null).pipe(delay(0)),
				() => of(null, {error: 2}, null).pipe(delay(0)),
				() => of(null, null, {error: 3}).pipe(delay(0)),
			),
		);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 3});
	}));

	it('todo: text', () => {
		// todo
		const form = withCustomAsyncValidator(
			new FormControl(null),
			concatAsyncValidators(
				() => of({error: 1}, null, null),
				() => of(null, {error: 2}, null),
				() => of(null, null, {error: 3}),
			),
		);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 3});
	});

	xit('todo: text', fakeAsync(() => {
		// todo
		{
			const form = withCustomAsyncValidator(
				new FormControl(null),
				concatAsyncValidators(
					() => of(),
					() => of(null),
					async () => null,
					() => of({error: 1}, {error: 2}),
					() => of({error: 4}, {error: 4}).pipe(delay(0)),
					async () => ({error: 5}),
				),
			);

			expect(form.pending).toBeTrue();

			tick();

			expect(form.invalid).toBeTrue();
			expect(form.errors).toEqual({error: 5});
		}
	}));
});
