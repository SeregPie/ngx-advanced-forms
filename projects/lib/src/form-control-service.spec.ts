import {FormControl} from '@angular/forms';

import {FormControlService} from './form-control-service';

describe('FormControlService', () => {
	it('should propagate value', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;
		expect(service.value).toEqual(0);
		service.value = 1;
		expect(form.value).toEqual(1);
		form.setValue(2);
		expect(service.value).toEqual(2);
	});

	it('should propagate disabled state', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;
		form.disable();
		expect(service.disabled).toBeTrue();
		form.enable();
		expect(service.disabled).toBeFalse();
	});

	it('should propagate pending state', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;
		service.pending = true;
		expect(form.pending).toBeTrue();
		service.pending = false;
		expect(form.pending).toBeFalse();
	});

	it('should propagate errors', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;
		service.errors = {epeqmxsg: true}; // todo: use other object
		// todo: keep some of 3
		expect(form.invalid).toBeTrue();
		expect(form.valid).toBeFalse();
		expect(form.errors).toEqual({epeqmxsg: true});
		service.errors = null;
		// todo: keep some of 3
		expect(form.invalid).toBeFalse();
		expect(form.valid).toBeTrue();
		expect(form.errors).toBeNull();
	});

	it('should propagate touched', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;
		service.touch();
		expect(form.touched).toBeTrue();
		// todo: form.markAsUntouched();
	});

	// todo: test disabled & pending

	// todo: test disabled & value

	// todo: test disabled & errors

	// todo: test pending & value

	// todo: test pending & errors
});
