import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {NoopAsyncValidator, composeAsyncValidators} from '.';

describe('composeAsyncValidators', () => {
	// prettier-ignore
	it('should work', fakeAsync(async () => {
		let form = new FormControl<number>(1, {
			nonNullable: true,
			asyncValidators: composeAsyncValidators([
				async ({value}) => value === 1 ? {error: {n: 1}} : null,
				async ({value}) => value === 2 ? {error: {n: 2}} : null,
			]),
		});

		expect(form.pending).toBeTrue();

		await tick();

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.pending).toBeTrue();

		await tick();

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.pending).toBeTrue();

		await tick();

		expect(form.errors).toBeNull();
	}));

	// prettier-ignore
	it('should skip other validators after one fails', fakeAsync(async () => {
		let validators = [
			async () => null,
			async () => ({error: true}),
			async () => null,
		].map((fn) => (jasmine
			.createSpy(undefined, fn)
			.and.callThrough()
		));
		new FormControl(null, {
			asyncValidators: composeAsyncValidators(validators),
		});

		await tick();

		expect(validators[0]).toHaveBeenCalledTimes(1);
		expect(validators[1]).toHaveBeenCalledTimes(1);
		expect(validators[2]).not.toHaveBeenCalled();
	}));

	it('should return same validator if only one provided', fakeAsync(async () => {
		let validator = async () => null;

		expect(composeAsyncValidators([validator])).toBe(validator);
	}));

	it('should return no-op validator if nothing provided', fakeAsync(async () => {
		expect(composeAsyncValidators([])).toBe(NoopAsyncValidator);
	}));

	// todo: test observables
});
