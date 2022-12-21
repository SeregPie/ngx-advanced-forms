import {FormControl} from '@angular/forms';

import {DynamicFormArray} from './dynamic-form-array';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('DynamicFormArray', () => {
	describe('setValue', () => {
		it('should work', () => {
			// todo
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
			bivszejl.calls.reset();
		});
	});

	describe('setValue', () => {
		it('should work', () => {
			// todo
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
			bivszejl.calls.reset();
		});
	});
});
