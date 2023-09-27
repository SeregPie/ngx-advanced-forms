import {fakeAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {NoopValidator, composeValidators} from '.';

// prettier-ignore
describe('composeValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = new FormControl<number>(1, {
			nonNullable: true,
			validators: composeValidators([
				({value}) => value === 1 ? {error: {n: 1}} : null,
				({value}) => value === 2 ? {error: {n: 2}} : null,
			]),
		});

		expect(form.errors).toEqual({error: {n: 1}});

		form.setValue(2);

		expect(form.errors).toEqual({error: {n: 2}});

		form.setValue(3);

		expect(form.errors).toBeNull();
	}));

	it('should skip other validators after one fails', fakeAsync(async () => {
		let validators = [
			() => null,
			() => ({error: true}),
			() => null,
		].map((fn, i) => (jasmine
			.createSpy(undefined, fn)
			.and.callThrough()
		));
		new FormControl(null, {
			validators: composeValidators(validators),
		});

		expect(validators[0]).toHaveBeenCalledTimes(1);
		expect(validators[1]).toHaveBeenCalledTimes(1);
		expect(validators[2]).not.toHaveBeenCalled();
	}));

	it('should return same validator if only one provided', fakeAsync(async () => {
		let validator = () => null;

		expect(composeValidators([validator])).toBe(validator);
	}));

	it('should return no-op validator if nothing provided', fakeAsync(async () => {
		expect(composeValidators([])).toBe(NoopValidator);
	}));
});
