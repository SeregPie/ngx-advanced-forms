import {FormControl} from '@angular/forms';
import {noop} from 'rxjs';

import {DynamicFormRecord} from './dynamic-form-record';

describe('DynamicFormRecord', () => {
	describe('setValue', () => {
		it('should work', () => {
			const form = new DynamicFormRecord(() => new FormControl(0));

			expect(form.value).toEqual({});

			form.setValue({a: 1});

			expect(form.value).toEqual({a: 1});

			form.setValue({a: 2, b: 3});

			expect(form.value).toEqual({a: 2, b: 3});

			form.setValue({b: 4});

			expect(form.value).toEqual({b: 4});
		});

		it('should trigger changes only once', () => {
			const form = new DynamicFormRecord(() => new FormControl(0));
			// todo: rename
			const zvpzglpd = jasmine.createSpy(undefined, noop).and.callThrough();
			form.statusChanges.subscribe(zvpzglpd);

			form.setValue({a: 1, b: 2});

			expect(zvpzglpd).toHaveBeenCalledTimes(1);
		});
	});

	it('should remove controls dynamically', () => {
		form.setValue({a: 1, b: 2});
		expect(form.value).toEqual({a: 1, b: 2});

		form.setValue({a: 3});
		expect(form.value).toEqual({a: 3});
	});

	it('should reset child controls', () => {
		form.setValue({a: 1, b: 2, c: 3});
		form.reset();
		expect(form.value).toEqual({a: 0, b: 0, c: 0});
	});
});
