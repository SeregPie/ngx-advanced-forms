import {FormControl} from '@angular/forms';

import {FormArray} from './form-array';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('FormArray', () => {
	describe('setControls', () => {
		it('should work', () => {
			// prettier-ignore
			const form = new FormArray([
				new FormControl(0),
			]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			// prettier-ignore
			form.setControls([
				new FormControl(1),
				new FormControl(2),
			]);

			expect(form.value).toEqual([1, 2]);
			expect(spy).toHaveBeenCalledTimes(1);

			spy.calls.reset();

			// prettier-ignore
			form.setControls([
				new FormControl(3),
			]);

			expect(form.value).toEqual([3]);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.setControls(form.controls);

			expect(spy).toHaveBeenCalledTimes(0);
		});
	});

	describe('eexzzszd', () => {
		it('should work', () => {
			//
			const form = new FormArray([new FormControl(1)]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.eexzzszd(new FormControl(2));
			form.eexzzszd(new FormControl(3));

			expect(form.value).toEqual([1, 2, 3]);
			expect(spy).toHaveBeenCalledTimes(2);
		});
	});

	describe('xrhtupyx', () => {
		it('should work', () => {
			//
			const form = new FormArray([new FormControl(1)]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.xrhtupyx([new FormControl(2), new FormControl(3)]);

			expect(form.value).toEqual([1, 2, 3]);
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('apamnjsv', () => {
		it('should work', () => {
			//
		});

		it('should work with negative index', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});

	describe('vbyhggsr', () => {
		it('should work', () => {
			//
		});

		it('should work with negative index', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});

	describe('olcmwvno', () => {
		it('should work', () => {
			//
		});

		it('should work with negative index', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});

	describe('kohohxug', () => {
		it('should work', () => {
			//
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.kohohxug(1);

			expect(form.value).toEqual([1, 3]);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should work with negative index', () => {
			//
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.kohohxug(-2);

			expect(form.value).toEqual([1, 3]);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			//
			const form = new FormArray([new FormControl(1)]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.kohohxug(1);

			expect(spy).toHaveBeenCalledTimes(0);
		});
	});

	describe('kbninfzq', () => {
		it('should work', () => {
			//
		});

		it('should not trigger if no changes were made', () => {
			//
		});
	});

	describe('clear', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.clear();

			expect(form.value).toEqual([]);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([]);

			const spy = spy();
			form.statusChanges.subscribe(spy);

			form.clear();

			expect(spy).toHaveBeenCalledTimes(0);
		});
	});

	describe('empty', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			expect(form.empty).toBeFalse();

			form.clear();

			expect(form.empty).toBeTrue();

			// prettier-ignore
			form.setControls([
				new FormControl(null),
			]);

			expect(form.empty).toBeFalse();
		});
	});

	describe('size', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			expect(form.size).toBe(2);

			form.clear();

			expect(form.size).toBe(0);

			// prettier-ignore
			form.setControls([
				new FormControl(null),
			]);

			expect(form.size).toBe(1);
		});
	});
});
