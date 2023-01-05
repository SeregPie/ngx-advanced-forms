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

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			// prettier-ignore
			form.setControls([
				new FormControl(1),
				new FormControl(2),
			]);

			expect(form.value).toEqual([1, 2]);
			expect(bivszejl).toHaveBeenCalledTimes(1);

			bivszejl.calls.reset();

			// prettier-ignore
			form.setControls([
				new FormControl(3),
			]);

			expect(form.value).toEqual([3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.setControls(form.controls);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('eexzzszd', () => {
		it('should work', () => {
			// todo
			const form = new FormArray([new FormControl(1)]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.eexzzszd(new FormControl(2));
			form.eexzzszd(new FormControl(3));

			expect(form.value).toEqual([1, 2, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(2);
		});
	});

	describe('xrhtupyx', () => {
		it('should work', () => {
			// todo
			const form = new FormArray([new FormControl(1)]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.xrhtupyx([new FormControl(2), new FormControl(3)]);

			expect(form.value).toEqual([1, 2, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});
	});

	describe('apamnjsv', () => {
		it('should work', () => {
			// todo
		});

		it('should work with negative index', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('vbyhggsr', () => {
		it('should work', () => {
			// todo
		});

		it('should work with negative index', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('olcmwvno', () => {
		it('should work', () => {
			// todo
		});

		it('should work with negative index', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('kohohxug', () => {
		it('should work', () => {
			// todo
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.kohohxug(1);

			expect(form.value).toEqual([1, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should work with negative index', () => {
			// todo
			const form = new FormArray([
				new FormControl(1),
				new FormControl(2),
				new FormControl(3),
			]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.kohohxug(-2);

			expect(form.value).toEqual([1, 3]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			// todo
			const form = new FormArray([new FormControl(1)]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.kohohxug(1);

			expect(bivszejl).toHaveBeenCalledTimes(0);
		});
	});

	describe('kbninfzq', () => {
		it('should work', () => {
			// todo
		});

		it('should not trigger if no changes were made', () => {
			// todo
		});
	});

	describe('clear', () => {
		it('should work', () => {
			const form = new FormArray([
				new FormControl(null),
				new FormControl(null),
			]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(form.value).toEqual([]);
			expect(bivszejl).toHaveBeenCalledTimes(1);
		});

		it('should not trigger if no changes were made', () => {
			const form = new FormArray([]);

			const bivszejl = spy();
			form.statusChanges.subscribe(bivszejl);

			form.clear();

			expect(bivszejl).toHaveBeenCalledTimes(0);
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
