import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {composeAsyncValidators, composeValidators} from './compose-validators';
import {noopAsyncValidator, noopValidator} from './noop-validator';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

// prettier-ignore
describe('composeValidators', () => {
	it('should work', () => {
		const form = new FormControl(1, {
			nonNullable: true,
			validators: composeValidators([
				(form) => (form.value === 1 ? {error: 1} : null),
				(form) => (form.value === 2 ? {error: 2} : null),
			]),
		});

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 1});

		form.setValue(2);

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: 2});

		form.setValue(3);

		expect(form.valid).toBeTrue();
	});

	it('should skip other validators after one fails', () => {
		const customValidators = [
			spy(() => null),
			spy(() => ({error: true})),
			spy(() => null),
		];
		new FormControl(null, {
			validators: composeValidators(customValidators),
		});

		expect(customValidators[0]).toHaveBeenCalledTimes(1);
		expect(customValidators[1]).toHaveBeenCalledTimes(1);
		expect(customValidators[2]).toHaveBeenCalledTimes(0);
	});

	it('should return same validator if only one provided', () => {
		const customValidator = () => null;

		expect(composeValidators([customValidator])).toBe(customValidator);
	});

	it('should return noop validator if nothing provided', () => {
		expect(composeValidators([])).toBe(noopValidator);
	});
});

describe('composeAsyncValidators', () => {
	// prettier-ignore
	it('should work', fakeAsync(() => {
		const form = new FormControl(1, {
			nonNullable: true,
			asyncValidators: composeAsyncValidators([
				async (form) => (form.value === 1 ? {error: 1} : null),
				async (form) => (form.value === 2 ? {error: 2} : null),
			]),
		});

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
		const customAsyncValidators = [
			spy(async () => null),
			spy(async () => ({error: true})),
			spy(async () => null),
		];
		new FormControl(null, {
			asyncValidators: composeAsyncValidators(customAsyncValidators),
		});

		tick();

		expect(customAsyncValidators[0]).toHaveBeenCalledTimes(1);
		expect(customAsyncValidators[1]).toHaveBeenCalledTimes(1);
		expect(customAsyncValidators[2]).toHaveBeenCalledTimes(0);
	}));

	// prettier-ignore
	it('should return same validator if only one provided', () => {
		const customAsyncValidator = async () => null;

		expect(composeAsyncValidators([customAsyncValidator])).toBe(customAsyncValidator);
	});

	// prettier-ignore
	it('should return noop validator if nothing provided', () => {
		expect(composeAsyncValidators([])).toBe(noopAsyncValidator);
	});

	// todo: more tests
});
