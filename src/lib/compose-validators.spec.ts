import {
	fakeAsync,
	tick,
} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {
	composeAsyncValidators,
	composeValidators,
} from './compose-validators';
import {
	NoopAsyncValidator,
	NoopValidator,
} from './noop-validator';

describe('composeValidators', () => {
	it('should work', () => {
		const form = new FormControl(1, {
			nonNullable: true,
			validators: composeValidators([
				(form) => (form.value === 1 ? {error: {n: 1}} : null),
				(form) => (form.value === 2 ? {error: {n: 2}} : null),
			]),
		});

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.errors).toBeNull();
	});

	it('should skip other validators after one fails', () => {
		const customValidator1 = (jasmine
			.createSpy('customValidator1', () => null)
			.and.callThrough()
		);
		const customValidator2 = (jasmine
			.createSpy('customValidator2', () => ({error: true}))
			.and.callThrough()
		);
		const customValidator3 = (jasmine
			.createSpy('customValidator3', () => null)
			.and.callThrough()
		);
		new FormControl(null, {
			validators: composeValidators([
				customValidator1,
				customValidator2,
				customValidator3,
			]),
		});

		expect(customValidator1).toHaveBeenCalledTimes(1);
		expect(customValidator2).toHaveBeenCalledTimes(1);
		expect(customValidator3).toHaveBeenCalledTimes(0);
	});

	it('should return same validator if only one provided', () => {
		const customValidator = () => null;

		expect(composeValidators([customValidator])).toBe(customValidator);
	});

	it('should return noop validator if nothing provided', () => {
		expect(composeValidators([])).toBe(NoopValidator);
	});
});

describe('composeAsyncValidators', () => {
	it('should work', fakeAsync(() => {
		const form = new FormControl(1, {
			nonNullable: true,
			asyncValidators: composeAsyncValidators([
				async (form) => (form.value === 1 ? {error: {n: 1}} : null),
				async (form) => (form.value === 2 ? {error: {n: 2}} : null),
			]),
		});

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.pending).toBeTrue();

		tick();

		expect(form.errors).toBeNull();
	}));

	it('should skip other validators after one fails', fakeAsync(() => {
		const customAsyncValidator1 = (jasmine
			.createSpy('customAsyncValidator1', async () => null)
			.and.callThrough()
		);
		const customAsyncValidator2 = (jasmine
			.createSpy('customAsyncValidator2', async () => ({error: true}))
			.and.callThrough()
		);
		const customAsyncValidator3 = (jasmine
			.createSpy('customAsyncValidator3', async () => null)
			.and.callThrough()
		);
		new FormControl(null, {
			asyncValidators: composeAsyncValidators([
				customAsyncValidator1,
				customAsyncValidator2,
				customAsyncValidator3,
			]),
		});

		tick();

		expect(customAsyncValidator1).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator2).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator3).toHaveBeenCalledTimes(0);
	}));

	it('should return same validator if only one provided', () => {
		const customAsyncValidator = async () => null;

		expect(composeAsyncValidators([customAsyncValidator])).toBe(customAsyncValidator);
	});

	it('should return noop validator if nothing provided', () => {
		expect(composeAsyncValidators([])).toBe(NoopAsyncValidator);
	});
});
