import {FormControl, FormGroup} from '@angular/forms';
import {noop} from 'rxjs';

import {updateFormState} from './update-form-state';

function spy<Fn extends jasmine.Func>(fn: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

describe('updateFormState', () => {
	it('should work', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = true;
			wrap(form.controls.b).disabled = false;
		});

		expect(form.controls.a.disabled).toBeTrue();
		expect(form.controls.b.disabled).toBeFalse();
		expect(bivszejl).toHaveBeenCalledTimes(1);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = false;
			wrap(form.controls.b).disabled = true;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(2);
	});

	it('should work on itself', () => {
		const form = new FormControl(null);

		updateFormState(form, (wrap) => {
			wrap(form).disabled = true;
		});

		expect(form.disabled).toBeTrue();

		updateFormState(form, (wrap) => {
			wrap(form).disabled = false;
		});

		expect(form.disabled).toBeFalse();
	});

	it('should enable parent by children', () => {
		const form = new FormGroup({
			one: new FormGroup({
				one: new FormControl(null),
			}),
		});
		form.disable();

		updateFormState(form, (wrap) => {
			wrap(form.controls.one.controls.one).disabled = false;
		});

		expect(form.disabled).toBeFalse();
	});

	it('should not enable parent by children if explicitly disabled', () => {
		const form = new FormGroup({
			one: new FormGroup({
				one: new FormControl(null),
			}),
		});

		updateFormState(form, (wrap) => {
			wrap(form.controls.one).disabled = true;
			wrap(form.controls.one.controls.one).disabled = false;
		});

		expect(form.disabled).toBeTrue();
	});

	it('should not trigger if no changes were made', () => {
		const form = new FormGroup({
			a: new FormControl({value: null, disabled: true}),
			b: new FormControl({value: null, disabled: false}),
		});
		form.controls.a.disable();
		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = true;
			wrap(form.controls.b).disabled = false;
		});

		expect(bivszejl).toHaveBeenCalledTimes(0);
	});
});
