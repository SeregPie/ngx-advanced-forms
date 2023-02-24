import {
	FormControl,
	FormGroup,
} from '@angular/forms';

import {updateFormState} from './update-form-state';

describe('updateFormState', () => {
	it('should work', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = true;
			wrap(form.controls.b).disabled = false;
		});

		expect(form.controls.a.disabled).toBeTrue();
		expect(form.controls.b.disabled).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = false;
			wrap(form.controls.b).disabled = true;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should work with alias', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).enabled = true;
			wrap(form.controls.b).enabled = false;
		});

		expect(form.controls.a.enabled).toBeTrue();
		expect(form.controls.b.enabled).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).enabled = false;
			wrap(form.controls.b).enabled = true;
		});

		expect(form.controls.a.enabled).toBeFalse();
		expect(form.controls.b.enabled).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
