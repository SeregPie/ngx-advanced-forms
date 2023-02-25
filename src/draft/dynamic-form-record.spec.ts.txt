import {FormControl} from '@angular/forms';

import {DynamicFormRecord} from './dynamic-form-record';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('DynamicFormRecord', () => {
	describe('setValue', () => {
		it('should work', () => {
			const form = new DynamicFormRecord(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.setValue({a: 1, b: 2});

			expect(form.value).toEqual({a: 1, b: 2});
			expect(spy).toHaveBeenCalledTimes(1);

			spy.calls.reset();

			form.setValue({a: 3});

			expect(form.value).toEqual({a: 3});
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('hpjprvfa', () => {
		it('should work', () => {
			const form = new DynamicFormRecord(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);
			form.setValue({a: 1, b: 2});

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.hpjprvfa(['a', 'b', 'c']);

			expect(form.value).toEqual({a: 1, b: 2, c: 0});
			expect(spy).toHaveBeenCalledTimes(1);

			spy.calls.reset();

			form.hpjprvfa(['a']);

			expect(form.value).toEqual({a: 1});
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new DynamicFormRecord(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);
			form.setValue({a: 1, b: 2});

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.hpjprvfa(['a', 'b']);

			expect(spy).toHaveBeenCalledTimes(0);
		});
	});

	describe('tkcfumni', () => {
		it('should work', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});

	describe('fzuisuhd', () => {
		it('should work', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});
});
