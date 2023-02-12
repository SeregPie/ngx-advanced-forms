import {FormControl, FormGroup} from '@angular/forms';

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

	it('should work with alias enabled', () => {
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

	it('todo: description rzyjmfai', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		form.disable();

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		updateFormState(form, (wrap) => {
			wrap(form).disabled = false;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('todo: description uxwyhzaf', () => {
		const form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		form.disable();

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		updateFormState(form, (wrap) => {
			wrap(form.controls.a).disabled = false;
		});

		expect(form.controls.a.disabled).toBeFalse();
		expect(form.controls.b.disabled).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('todo: description ekaovjwx', () => {
		for (let r = 0; r < 2; r++) {
			const form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
			form.disable();

			const spy = jasmine.createSpy();
			form.statusChanges.subscribe(spy);

			switch (r) {
				case 0: {
					updateFormState(form, (wrap) => {
						wrap(form).disabled = false;
						wrap(form.controls.a).disabled = true;
						wrap(form.controls.b).disabled = true;
					});
					break;
				}
				case 1: {
					updateFormState(form, (wrap) => {
						wrap(form.controls.a).disabled = true;
						wrap(form.controls.b).disabled = true;
						wrap(form).disabled = false;
					});
					break;
				}
			}

			expect(form.controls.a.disabled).toBeTrue();
			expect(form.controls.b.disabled).toBeTrue();
			expect(spy).toHaveBeenCalledTimes(0);
		}
	});

	it('todo: description ceysijjl', () => {
		for (let r = 0; r < 2; r++) {
			const form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
			form.disable();

			const spy = jasmine.createSpy();
			form.statusChanges.subscribe(spy);

			switch (r) {
				case 0: {
					updateFormState(form, (wrap) => {
						wrap(form).disabled = true;
						wrap(form.controls.a).disabled = false;
						wrap(form.controls.b).disabled = false;
					});
					break;
				}
				case 1: {
					updateFormState(form, (wrap) => {
						wrap(form.controls.a).disabled = false;
						wrap(form.controls.b).disabled = false;
						wrap(form).disabled = true;
					});
					break;
				}
			}

			expect(form.controls.a.disabled).toBeTrue();
			expect(form.controls.b.disabled).toBeTrue();
			expect(spy).toHaveBeenCalledTimes(0);
		}
	});

	it('todo: description ydepqowi', () => {
		for (let r = 0; r < 2; r++) {
			const form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
			form.disable();

			const spy = jasmine.createSpy();
			form.statusChanges.subscribe(spy);

			switch (r) {
				case 0: {
					updateFormState(form, (wrap) => {
						wrap(form).disabled = false;
						wrap(form.controls.a).disabled = false;
					});
					break;
				}
				case 1: {
					updateFormState(form, (wrap) => {
						wrap(form.controls.a).disabled = false;
						wrap(form).disabled = false;
					});
					break;
				}
			}

			expect(form.controls.a.disabled).toBeFalse();
			expect(form.controls.b.disabled).toBeFalse();
			expect(spy).toHaveBeenCalledTimes(1);
		}
	});

	it('todo: description gpmstuxe', () => {
		for (let r = 0; r < 2; r++) {
			const form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
			form.disable();

			const spy = jasmine.createSpy();
			form.statusChanges.subscribe(spy);

			switch (r) {
				case 0: {
					updateFormState(form, (wrap) => {
						wrap(form).disabled = false;
						wrap(form.controls.a).disabled = true;
					});
					break;
				}
				case 1: {
					updateFormState(form, (wrap) => {
						wrap(form.controls.a).disabled = true;
						wrap(form).disabled = false;
					});
					break;
				}
			}

			expect(form.controls.a.disabled).toBeTrue();
			expect(form.controls.b.disabled).toBeFalse();
			expect(spy).toHaveBeenCalledTimes(1);
		}
	});

	// todo: change order
});
