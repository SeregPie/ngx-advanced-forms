import {FormControl} from '@angular/forms';

import {composeValidators} from './compose-validators';
import {NoopValidator} from './noop-validator';

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
