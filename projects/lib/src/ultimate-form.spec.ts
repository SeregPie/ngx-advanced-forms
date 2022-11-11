import {tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {UltimateFormService} from './ultimate-form';

describe('UltimateFormService', () => {
	it('', () => {
		const form = new FormControl(0);
		const service: UltimateFormService<number> = null as any;
		expect(service.value).toEqual(0);
		service.value = 1;
		expect(form.value).toEqual(1);
		form.setValue(2);
		expect(service.value).toEqual(2);
	});

	it('', () => {
		const form = new FormControl(0);
		const service: UltimateFormService<number> = null as any;
		form.disable();
		expect(service.disabled).toBeTrue();
		form.enable();
		expect(service.disabled).toBeFalse();
	});

	it('', () => {
		const form = new FormControl(0);
		const service: UltimateFormService<number> = null as any;
		service.pending = true;
		expect(form.pending).toBeTrue();
		service.pending = false;
		expect(form.pending).toBeFalse();
	});

	it('', () => {
		const form = new FormControl(0);
		const service: UltimateFormService<number> = null as any;
		service.errors = {error: true};
		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: true});
		service.errors = null;
		expect(form.invalid).toBeFalse();
		expect(form.errors).toBeNull();
	});

	it('', () => {
		const form = new FormControl(0);
		const service: UltimateFormService<number> = null as any;
		{
			service.pending = true;
			service.errors = {error: true};
			tick();
			expect(form.pending).toBeTrue();
		}
		{
			service.pending = false;
			tick();
			expect(form.invalid).toBeTrue();
			expect(form.errors).toEqual(service.errors);
		}
	});
});
