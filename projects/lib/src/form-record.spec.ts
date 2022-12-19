import {FormControl} from '@angular/forms';
import {noop} from 'rxjs';

import {FormRecord} from './form-record';

function spy<Fn extends jasmine.Func>(fn: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

fdescribe('FormRecord', () => {
	describe('has', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(null),
			});

			expect(form.has('a')).toBeTrue();
			expect(form.has('b')).toBeFalse();

			form.remove('a');
			form.set('b', new FormControl(null));

			expect(form.has('a')).toBeFalse();
			expect(form.has('b')).toBeTrue();
		});
	});

	describe('set', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(1),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.set('a', new FormControl(2));
			form.set('b', new FormControl(3));

			expect(form.value).toEqual({a: 2, b: 3});
			expect(bivszejl).toHaveBeenCalledTimes(2);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({
				a: new FormControl(null),
				b: new FormControl(null),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.set('a', form.controls['a']);
			form.set('b', form.controls['b']);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('setAll', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(1),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.setAll({
				a: new FormControl(2),
				b: new FormControl(3),
			});

			expect(form.value).toEqual({a: 2, b: 3});
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({
				a: new FormControl(null),
				b: new FormControl(null),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.setAll({
				a: form.controls['a'],
				b: form.controls['b'],
			});

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	// prettier-ignore
	describe('remove', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
				c: new FormControl(3),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.remove('b');

			expect(form.value).toEqual({a: 1, c: 3});
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({
				a: new FormControl(1),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.remove('b');

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('removeAll', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
				c: new FormControl(3),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.removeAll(['a', 'c']);

			expect(form.value).toEqual({b: 1});
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({
				a: new FormControl(1),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.removeAll(['b', 'c']);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('retainAll', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(1),
				b: new FormControl(2),
				c: new FormControl(3),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.retainAll(['a', 'c']);

			expect(form.value).toEqual({a: 1, c: 3});
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({
				a: new FormControl(1),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.retainAll(['a', 'c']);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('clear', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(null),
				b: new FormControl(null),
			});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(form.value).toEqual({});
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormRecord({});

			// todo: rename
			const bivszejl = spy(noop);
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('empty', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(null),
			});

			expect(form.empty).toBeFalse();

			form.remove('a');

			expect(form.empty).toBeTrue();

			form.set('b', new FormControl(null));

			expect(form.empty).toBeFalse();
		});
	});

	describe('size', () => {
		it('should work', () => {
			const form = new FormRecord({
				a: new FormControl(null),
			});

			expect(form.size).toBe(1);

			form.set('b', new FormControl(null));

			expect(form.size).toBe(2);

			form.remove('a');

			expect(form.size).toBe(1);
		});
	});
});
