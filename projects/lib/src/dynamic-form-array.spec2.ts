import {FormControl} from '@angular/forms';

import {DynamicFormArray} from './dynamic-form-array';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('DynamicFormArray', () => {
	describe('setValue', () => {
		it('should work', () => {
			const form = new DynamicFormArray(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.setValue([1, 2]);

			expect(form.value).toEqual([1, 2]);
			expect(bivszejl).toHaveBeenCalledTimes(1);

			bivszejl.calls.reset();

			form.setValue([3]);

			expect(form.value).toEqual([3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});
	});

	describe('hpjprvfa', () => {
		it('should work', () => {
			const form = new DynamicFormArray(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);
			form.setValue([1, 2]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.hpjprvfa(3);

			expect(form.value).toEqual([1, 2, 0]);
			expect(bivszejl).toHaveBeenCalledTimes(1);

			bivszejl.calls.reset();

			form.hpjprvfa(1);

			expect(form.value).toEqual([1]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new DynamicFormArray(
				() =>
					new FormControl(0, {
						nonNullable: true,
					}),
			);
			form.setValue([1, 2]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.hpjprvfa(2);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('xciprnay', () => {
		it('should work', () => {
			// todo
		});
	});

	describe('ajamxilj', () => {
		it('should work', () => {
			// todo
		});
	});

	describe('sdcfszlp', () => {
		it('should work', () => {
			// todo
		});
	});

	describe('gxfjcuhm', () => {
		it('should work', () => {
			// todo
		});
	});
});
