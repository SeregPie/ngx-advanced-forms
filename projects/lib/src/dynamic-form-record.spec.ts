import {FormControl} from '@angular/forms';

import {DynamicFormRecord} from './dynamic-form-record';

describe('DynamicFormRecord', () => {
	const form = new DynamicFormRecord(
		() =>
			new FormControl(0, {
				nonNullable: true,
			}),
	);

	beforeEach(() => {
		form.clear();
	});

	it('should create controls dynamically', () => {
		form.setValue({a: 1});
		expect(form.value).toEqual({a: 1});

		form.setValue({a: 2, b: 3});
		expect(form.value).toEqual({a: 2, b: 3});
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
