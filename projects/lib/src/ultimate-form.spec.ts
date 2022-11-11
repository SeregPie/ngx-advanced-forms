import {fakeAsync, tick} from '@angular/core/testing';
import {FormControl} from '@angular/forms';

import {UltimateFormService} from './ultimate-form';

describe('UltimateFormService', () => {
	it('', fakeAsync(() => {
		const form = new FormControl<null | number>(0);
		const service: UltimateFormService<null | number> = null as any;
		tick();
		expect(form.value).toEqual(service.value);
		{
			const value = null;
			form.setValue(value);
			tick();
			expect(service.value).toEqual(value);
		}
		{
			const value = 0;
			service.value = value;
			tick();
			expect(form.value).toEqual(value);
		}
	}));

	it('', fakeAsync(() => {
		const form = new FormControl<null | number>(0);
		const service: UltimateFormService<null | number> = null as any;
		{
			service.disabled = true;
			tick();
			expect(form.disabled).toBeTrue();
		}
		{
			service.disabled = false;
			tick();
			expect(form.disabled).toBeFalse();
		}
	}));

	it('', fakeAsync(() => {
		const form = new FormControl<null | number>(0);
		const service: UltimateFormService<null | number> = null as any;
		{
			service.pending = true;
			tick();
			expect(form.pending).toBeTrue();
			//expect(form.errors).toBeNull();
		}
	}));

	it('', fakeAsync(() => {
		const form = new FormControl<null | number>(0);
		const service: UltimateFormService<null | number> = null as any;
		{
			service.errors = {error: true};
			tick();
			expect(form.invalid).toBeTrue();
			expect(form.errors).toEqual(service.errors);
		}
		{
			service.errors = null;
			tick();
			expect(form.invalid).toBeFalse();
			expect(form.errors).toBeNull();
		}
	}));

	it('', fakeAsync(() => {
		const form = new FormControl<null | number>(0);
		const service: UltimateFormService<null | number> = null as any;
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
	}));
});
