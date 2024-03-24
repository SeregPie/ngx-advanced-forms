import {effect} from '@angular/core';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {formi} from '.';

describe('formi', () => {
	/*it('...', fakeAsync(async () => {
		let form = new FormControl(1, {
			nonNullable: true,
		});

		console.log(formi(form).status);
		console.log(formi(form).valid);
		console.log(formi(form).invalid);
		console.log(formi(form).pending);
		console.log(formi(form).disabled);
		console.log(formi(form).enabled);
		console.log(formi(form).pristine);
		console.log(formi(form).dirty);
		console.log(formi(form).touched);
		console.log(formi(form).untouched);

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	}));*/

	it('...', fakeAsync(async () => {
		let form = new FormControl(null);

		expect(formi(form).pristine).toBe(true);
		expect(formi(form).dirty).toBe(false);

		TestBed.runInInjectionContext(() => {
			effect(() => {
				formi(form).pristine;
			});
			effect(() => {
				formi(form).dirty;
			});
		});

		form.markAsDirty();

		expect(formi(form).pristine).toBe(false);
		expect(formi(form).dirty).toBe(true);

		await tick();

		//expect(spy).toHaveBeenCalledTimes(1);
		//spy.calls.reset();

		form.markAsPristine();

		expect(formi(form).pristine).toBe(true);
		expect(formi(form).dirty).toBe(false);

		await tick();

		//expect(spy).toHaveBeenCalledTimes(1);
		//spy.calls.reset();
	}));

	/*it('...', fakeAsync(() => {
		let form = new FormControl(null);

		expect(formi(form).pristine).toBe(true);
		expect(formi(form).dirty).toBe(false);
		expect(formi(form).touched).toBe(false);
		expect(formi(form).untouched).toBe(true);
	}));

	it('...', fakeAsync(() => {
		let form = new FormGroup({
			a: new FormGroup({
				a: new FormControl(1, {
					nonNullable: true,
				}),
				b: new FormControl(1, {
					nonNullable: true,
				}),
			}),
			b: new FormGroup({
				a: new FormControl(1, {
					nonNullable: true,
				}),
				b: new FormControl(1, {
					nonNullable: true,
				}),
			}),
		});

		expect(formi(form).getValue()).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});
		expect(formi(form).getRawValue()).toEqual({
			a: {a: 1, b: 1},
			b: {a: 1, b: 1},
		});

		form.controls.a.controls.b.disable();
		form.controls.b.controls.a.disable();

		expect(formi(form).getValue()).toEqual({a: {a: 1}, b: {b: 1}});
		expect(formi(form).getRawValue()).toEqual({
			a: {a: 1, b: 1},
			b: {a: 1, b: 1},
		});
	}));

	it('...', fakeAsync(() => {
		let form = new FormGroup({
			a: new FormArray([
				//
				new FormControl(0),
				new FormControl(0),
			]),
			b: new FormArray([
				//
				new FormControl(0),
				new FormControl(0),
			]),
		});

		expect(formi(form).value).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});

		let spy = jasmine.createSpy();
		effect(() => {
			formi(form).value;
			spy();
		});

		form.controls.a.controls[1].disable();
		form.controls.b.controls[0].disable();

		expect(formi(form).value).toEqual({a: {a: 1}, b: {b: 1}});

		tick();

		expect(spy).toHaveBeenCalledTimes(1);
		spy.calls.reset();

		form.controls.a.controls.b.setValue(2);
		form.controls.b.controls.a.setValue(2);
		tick();

		expect(spy).toHaveBeenCalledTimes(0);
		spy.calls.reset();
	}));

	it('...', fakeAsync(() => {
		let form = new FormArray([
			new FormGroup({
				a: new FormControl(0),
				b: new FormControl(0),
			}),
			new FormGroup({
				a: new FormControl(0),
				b: new FormControl(0),
			}),
		]);

		let spy = jasmine.createSpy();
		effect(() => {
			formi(form).value;
			spy();
		});

		form.controls[0].controls.b.disable();
		form.controls[1].controls.a.disable();
		tick();

		expect(spy).toHaveBeenCalledTimes(1);
		spy.calls.reset();

		form.controls[0].controls.b.setValue(1);
		form.controls[1].controls.a.setValue(1);
		tick();

		expect(spy).toHaveBeenCalledTimes(0);
		spy.calls.reset();
	}));*/
});

function spy<T extends jasmine.Func>(fn: T): jasmine.Spy<T> {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}
