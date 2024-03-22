import {fakeAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {NoopValidator, composeValidators, withValidators} from '.';

// prettier-ignore
xdescribe('withValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			({value}) => value % 2 ? {error: true} : null,
		);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	}));

	it('should contain validators', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = () => null;
		withValidators(form, validator);

		expect(form.hasValidator(validator)).toBeTrue();
	}));

	it('should call validators only once', fakeAsync(async () => {
		let form = new FormControl(null);
		let validator = (jasmine
			.createSpy(undefined, () => null)
			.and.callThrough()
		);
		withValidators(form, validator);

		expect(validator).toHaveBeenCalledTimes(1);
	}));

	it('should not replace existing validators', fakeAsync(async () => {
		let initialValidator = () => null;
		let initialAsyncValidator = async () => null;
		let form = new FormControl(null, {
			validators: initialValidator,
			asyncValidators: initialAsyncValidator,
		});
		withValidators(form, () => ({error: true}));

		expect(form.hasValidator(initialValidator)).toBeTrue();
		expect(form.hasAsyncValidator(initialAsyncValidator)).toBeTrue();
	}));
});

// prettier-ignore
describe('composeValidators', () => {
	it('should work', fakeAsync(async () => {
		let form = withValidators(
			new FormControl<number>(1, {
				nonNullable: true,
			}),
			composeValidators([
				({value}) => value === 1 ? {error: {n: 1}} : null,
				({value}) => value === 2 ? {error: {n: 2}} : null,
			]),
		);

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
		].map((fn) => (jasmine
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
