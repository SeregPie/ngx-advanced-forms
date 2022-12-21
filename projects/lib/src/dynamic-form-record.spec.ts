import {FormControl} from '@angular/forms';

import {DynamicFormRecord} from './dynamic-form-record';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('DynamicFormRecord', () => {
	describe('setValue', () => {
		it('should work', () => {
			// todo
			const form = new DynamicFormRecord(() => new FormControl(0));

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			expect(form.value).toEqual({});
			expect(bivszejl).toHaveBeenCalledTimes(1);
			bivszejl.calls.reset();

			form.setValue({a: 1});

			expect(form.value).toEqual({a: 1});
			expect(bivszejl).toHaveBeenCalledTimes(1);
			bivszejl.calls.reset();

			form.setValue({a: 2, b: 3});

			expect(form.value).toEqual({a: 2, b: 3});
			expect(bivszejl).toHaveBeenCalledTimes(1);
			bivszejl.calls.reset();

			form.setValue({b: 4});

			expect(form.value).toEqual({b: 4});
			expect(bivszejl).toHaveBeenCalledTimes(1);
			bivszejl.calls.reset();
		});
	});

	describe('tkcfumni', () => {
		it('should work', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('fzuisuhd', () => {
		it('should work', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('hpjprvfa', () => {
		it('should work', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});
});
