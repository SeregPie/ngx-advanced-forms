import {FormControl} from '@angular/forms';
import {noop} from 'rxjs';

import {FormArray} from './form-array';

function spy<Fn extends jasmine.Func>(fn: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

fdescribe('FormArray', () => {
	// prettier-ignore
	describe('addLast', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(1),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.addLast(new FormControl(2));
			form.addLast(new FormControl(3));

			expect(form.value).toEqual([1, 2, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(2);
		});
	});

	// prettier-ignore
	describe('addLastAll', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(1),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.addLastAll([
				new FormControl(2),
				new FormControl(3),
			]);

			expect(form.value).toEqual([1, 2, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});
	});

	// prettier-ignore
	describe('remove', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.remove(1);

			expect(form.value).toEqual([1, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should work with negative index', () => {
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.remove(-2);

			expect(form.value).toEqual([1, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([
				new FormControl(1),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.remove(1);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('kbninfzq', () => {
		// todo
	});

	describe('clear', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(form.value).toEqual([]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([]);

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('empty', () => {
		it('should work', () => {
			const form = new FormArray([new FormControl(null)]);

			expect(form.empty).toBeFalse();

			form.remove(0);

			expect(form.empty).toBeTrue();

			form.addLast(new FormControl(null));

			expect(form.empty).toBeFalse();
		});
	});

	describe('size', () => {
		it('should work', () => {
			const form = new FormArray([new FormControl(null)]);

			expect(form.size).toBe(1);

			form.addLast(new FormControl(null));

			expect(form.size).toBe(2);

			form.remove(0);

			expect(form.size).toBe(1);
		});
	});
});
