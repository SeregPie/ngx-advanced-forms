import {FormControl} from '@angular/forms';

import {DynamicFormArray} from './dynamic-form-array';

describe('DynamicFormArray', () => {
	const form = new DynamicFormArray(
		() =>
			new FormControl(0, {
				nonNullable: true,
			}),
	);

	beforeEach(() => {
		form.clear();
	});

	it('should create controls dynamically', () => {
		form.setValue([1]);
		expect(form.value).toEqual([1]);

		form.setValue([2, 3]);
		expect(form.value).toEqual([2, 3]);
	});

	it('should remove controls dynamically', () => {
		form.setValue([1, 2]);
		expect(form.value).toEqual([1, 2]);

		form.setValue([3]);
		expect(form.value).toEqual([3]);
	});

	it('should reset child controls', () => {
		form.setValue([1, 2, 3]);
		form.reset();
		expect(form.value).toEqual([0, 0, 0]);
	});
});
