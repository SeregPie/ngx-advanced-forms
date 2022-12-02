import {fakeAsync, flush} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {addAsyncValidators, addValidators} from './add-validators';

function spy<Fn extends jasmine.Func>(fn: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('addValidators', () => {
	// prettier-ignore
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
		const customValidator1 = () => null;
		const customValidator2 = () => null;
		const form = addValidators(
			new FormControl(null),
			customValidator1,
			customValidator2,
		);

		expect(form.hasValidator(customValidator1)).toBeTrue();
		expect(form.hasValidator(customValidator2)).toBeTrue();
	});

	it('should call validators only once', () => {
		const customValidator1 = spy(() => null);
		const customValidator2 = spy(() => null);
		addValidators(new FormControl(null), customValidator1, customValidator2);

		expect(customValidator1).toHaveBeenCalledTimes(1);
		expect(customValidator2).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = addValidators(
			new FormControl(null, {
				validators: customValidator,
				asyncValidators: customAsyncValidator,
			}),
			() => ({error: true}),
		);

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should not trigger changes if no validators provided', () => {
		const form = addValidators(new FormControl(null));
		// todo
	});
});

describe('addAsyncValidators', () => {
	// prettier-ignore
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
		const customAsyncValidator1 = async () => null;
		const customAsyncValidator2 = async () => null;
		const form = addAsyncValidators(
			new FormControl(null),
			customAsyncValidator1,
			customAsyncValidator2,
		);

		expect(form.hasAsyncValidator(customAsyncValidator1)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator2)).toBeTrue();
	});

	it('should call validators only once', () => {
		const customAsyncValidator1 = spy(async () => null);
		const customAsyncValidator2 = spy(async () => null);
		addAsyncValidators(
			new FormControl(null),
			customAsyncValidator1,
			customAsyncValidator2,
		);

		expect(customAsyncValidator1).toHaveBeenCalledTimes(1);
		expect(customAsyncValidator2).toHaveBeenCalledTimes(1);
	});

	it('should not replace existing validators', () => {
		const customValidator = () => null;
		const customAsyncValidator = async () => null;
		const form = addAsyncValidators(
			new FormControl(null, {
				validators: customValidator,
				asyncValidators: customAsyncValidator,
			}),
			async () => ({error: true}),
		);

		expect(form.hasValidator(customValidator)).toBeTrue();
		expect(form.hasAsyncValidator(customAsyncValidator)).toBeTrue();
	});

	it('should not trigger changes if no validators provided', () => {
		const form = addValidators(new FormControl(null));
		// todo
	});
});
