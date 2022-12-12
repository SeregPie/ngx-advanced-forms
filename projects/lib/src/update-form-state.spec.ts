import {FormControl, FormGroup} from '@angular/forms';
import {noop} from 'rxjs';

import {updateFormState} from './update-form-state';

function spy<Fn extends jasmine.Func>(fn: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

fdescribe('updateFormState', () => {
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
		bivszejl.calls.reset();

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = false;
			wrap(form.controls.b).disabled = true;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);
		bivszejl.calls.reset();
	});

	it('should work with alias enabled', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).enabled = true;
			wrap(form.controls.b).enabled = false;
		});

		expect(form.controls.a.enabled).toBeTrue();
		expect(form.controls.b.enabled).toBeFalse();
		expect(bivszejl).toHaveBeenCalledTimes(1);
		bivszejl.calls.reset();

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).enabled = false;
			wrap(form.controls.b).enabled = true;
		});

		expect(form.controls.a.enabled).toBeFalse();
		expect(form.controls.b.enabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);
		bivszejl.calls.reset();
	});

	it('todo: description ceysijjl', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		form.disable();

		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form).disabled = true;
			wrap(form.controls.a).disabled = false;
		});

		expect(form.controls.a.disabled).toBeTrue();
		expect(form.controls.b.disabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(0);
	});

	it('todo: description ydepqowi', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		form.disable();

		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form).disabled = false;
			wrap(form.controls.a).disabled = false;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);
	});

	it('todo: description gpmstuxe', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		form.disable();

		// todo: rename
		const bivszejl = spy(noop);
		form.statusChanges.subscribe(bivszejl);

		updateFormState(form, (wrap) => {
			wrap(form).disabled = false;
			wrap(form.controls.a).disabled = true;
		});

		expect(form.controls.a.disabled).toBeTrue();
		expect(form.controls.b.disabled).toBeFalse();
		expect(bivszejl).toHaveBeenCalledTimes(1);
	});
});
