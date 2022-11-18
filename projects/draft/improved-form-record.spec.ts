import {FormControl} from '@angular/forms';
import {noop} from 'rxjs';

import {ImprovedFormRecord} from './improved-form-record';

describe('ImprovedFormRecord', () => {
	describe('hasControl', () => {
		it('should work', () => {
			const form = new ImprovedFormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
			});
			expect(form.hasControl('a')).toBeTrue();
			form.removeControl('a');
			expect(form.hasControl('a')).toBeFalse();
		});
	});

	describe('clear', () => {
		it('should work', () => {
			const form = new ImprovedFormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
			});
			expect(form.value).toEqual({a: 1, b: 2});
			form.clear();
			expect(form.value).toEqual({});
		});

		it('should trigger changes only once', () => {
			const form = new ImprovedFormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
			});
			const fn = jasmine.createSpy(undefined, noop).and.callThrough();
			form.statusChanges.subscribe(fn);
			form.clear();
			expect(fn).toHaveBeenCalledTimes(1);
		});
	});
});
