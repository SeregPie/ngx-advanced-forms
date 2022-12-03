import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {addAsyncValidators, addValidators} from './add-validators';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

// prettier-ignore
describe('addValidators', () => {
	it('should work', () => {
		const form = addValidators(
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

	it('should contain validators', () => {
		const form = new FormControl(null);
		const customValidators = [
			() => null,
			() => null,
		];
		addValidators(form, ...customValidators);

		for (const customValidator of customValidators) {
			expect(form.hasValidator(customValidator)).toBeTrue();
		}
	});

	it('should call validators only once', () => {
		const form = new FormControl(null);
		const customValidators = [
			spy(() => null),
			spy(() => null),
		];
		addValidators(form, ...customValidators);

		for (const customValidator of customValidators) {
			expect(customValidator).toHaveBeenCalledTimes(1);
		}
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		addValidators(form, () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should not trigger changes if no validators provided', () => {
		const form = new FormControl(null);
		// todo: rename
		const svieeorp = spy();
		form.statusChanges.subscribe(svieeorp);
		addValidators(form);

		expect(svieeorp).toHaveBeenCalledTimes(0);
	});
});

// prettier-ignore
describe('addAsyncValidators', () => {
	it('should work', fakeAsync(() => {
		const form = addAsyncValidators(
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

	it('should contain validators', () => {
		const form = new FormControl(null);
		const customAsyncValidators = [
			async () => null,
			async () => null,
		];
		addAsyncValidators(form, ...customAsyncValidators);

		for (const customAsyncValidator of customAsyncValidators) {
			expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
		}
	});

	it('should call validators only once', () => {
		const form = new FormControl(null);
		const customAsyncValidators = [
			spy(async () => null),
			spy(async () => null),
		];
		addAsyncValidators(form, ...customAsyncValidators);

		for (const customAsyncValidator of customAsyncValidators) {
			expect(customAsyncValidator).toHaveBeenCalledTimes(1);
		}
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = new FormControl(null, {
			validators: customValidator,
			asyncValidators: customAsyncValidator,
		});
		addAsyncValidators(form, async () => ({error: true}));

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should not trigger changes if no validators provided', () => {
		const form = new FormControl(null);
		// todo: rename
		const svieeorp = spy();
		form.statusChanges.subscribe(svieeorp);
		addAsyncValidators(form);

		expect(svieeorp).toHaveBeenCalledTimes(0);
	});
});
