import {TestBed, fakeAsync} from '@angular/core/testing';
import {FormControl, FormGroup} from '@angular/forms';

import {effect} from '@angular/core';
import {formi} from './';

fdescribe('formi', () => {
	it('should work', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

		TestBed.runInInjectionContext(() => {
			effect(() => {
				console.log('form.touched', formi(form).touched);
			});
			effect(() => {
				console.log('form.controls.a.touched', formi(form.controls.a).touched);
			});
			effect(() => {
				console.log('form.controls.b.touched', formi(form.controls.b).touched);
			});
		});

		TestBed.flushEffects();

		expect(formi(form).touched).toBe(form.touched);
		expect(formi(form.controls.a).touched).toBe(form.controls.a.touched);
		expect(formi(form.controls.b).touched).toBe(form.controls.b.touched);

		//

		form.controls.a.markAsTouched();

		expect(formi(form).touched).toBe(form.touched);
		expect(formi(form.controls.a).touched).toBe(form.controls.a.touched);
		expect(formi(form.controls.b).touched).toBe(form.controls.b.touched);

		TestBed.flushEffects();

		// expect effects

		form.controls.a.markAsUntouched();

		expect(formi(form).touched).toBe(form.touched);
		expect(formi(form.controls.a).touched).toBe(form.controls.a.touched);
		expect(formi(form.controls.b).touched).toBe(form.controls.b.touched);

		TestBed.flushEffects();

		// expect effects
	}));
});
