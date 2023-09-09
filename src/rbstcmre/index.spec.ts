import {effect} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {rbstcmre} from './rbstcmre';

describe('rbstcmre', () => {
	it('...', async () => {
		let form = new FormControl(1, {
			nonNullable: true,
		});
		let hxfvtjvp = rbstcmre(form);

		console.log(hxfvtjvp.status);
		console.log(hxfvtjvp.valid);
		console.log(hxfvtjvp.invalid);
		console.log(hxfvtjvp.pending);
		console.log(hxfvtjvp.disabled);
		console.log(hxfvtjvp.enabled);
		console.log(hxfvtjvp.pristine);
		console.log(hxfvtjvp.dirty);
		console.log(hxfvtjvp.touched);
		console.log(hxfvtjvp.untouched);
		console.log(hxfvtjvp.getValue());
		console.log(hxfvtjvp.getRawValue());
		console.log(hxfvtjvp.getErrors());

		expect(form.errors).toEqual({error: true});

		form.setValue(2);

		expect(form.errors).toBeNull();
	});

	it('...', fakeAsync(() => {
		let form = new FormControl(null);
		let hxfvtjvp = rbstcmre(form);

		expect(hxfvtjvp.pristine).toBe(true);
		expect(hxfvtjvp.dirty).toBe(false);

		let spy = jasmine.createSpy();
		effect(() => {
			hxfvtjvp.pristine;
			spy();
		});

		form.markAsDirty();

		expect(hxfvtjvp.pristine).toBe(false);
		expect(hxfvtjvp.dirty).toBe(true);

		tick();

		expect(spy).toHaveBeenCalledTimes(1);
		spy.calls.reset();

		form.markAsPristine();

		expect(hxfvtjvp.pristine).toBe(true);
		expect(hxfvtjvp.dirty).toBe(false);

		tick();

		expect(spy).toHaveBeenCalledTimes(1);
		spy.calls.reset();
	}));

	it('...', fakeAsync(() => {
		let form = new FormControl(null);
		let hxfvtjvp = rbstcmre(form);

		expect(hxfvtjvp.pristine).toBe(true);
		expect(hxfvtjvp.dirty).toBe(false);
		expect(hxfvtjvp.touched).toBe(false);
		expect(hxfvtjvp.untouched).toBe(true);
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
		let hxfvtjvp = rbstcmre(form);

		expect(hxfvtjvp.getValue()).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});
		expect(hxfvtjvp.getRawValue()).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});

		form.controls.a.controls.b.disable();
		form.controls.b.controls.a.disable();

		expect(hxfvtjvp.getValue()).toEqual({a: {a: 1}, b: {b: 1}});
		expect(hxfvtjvp.getRawValue()).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});
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
		let hxfvtjvp = rbstcmre(form);

		expect(hxfvtjvp.value).toEqual({a: {a: 1, b: 1}, b: {a: 1, b: 1}});

		let spy = jasmine.createSpy();
		effect(() => {
			hxfvtjvp.value;
			spy();
		});

		form.controls.a.controls[1].disable();
		form.controls.b.controls[0].disable();

		expect(hxfvtjvp.value).toEqual({a: {a: 1}, b: {b: 1}});

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
		let hxfvtjvp = rbstcmre(form);

		let spy = jasmine.createSpy();
		effect(() => {
			hxfvtjvp.value;
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
	}));
});
