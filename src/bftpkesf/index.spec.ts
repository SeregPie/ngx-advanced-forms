import {
	Component,
	Injector,
	effect,
	runInInjectionContext,
	signal,
} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {formPass} from '.';

describe('rbstcmre', () => {
	it('should detect value changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);

		let s = signal<number>(1);
		runInInjectionContext(injector, () => {
			effect(() => {
				console.log('effect', s());
			});
		});

		fixture.detectChanges();

		s.set(2);

		fixture.detectChanges();

		console.log(s());
	}));

	it('should detect status changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);
	}));

	it('should detect touched changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);

		let form = new FormGroup({
			a: new FormArray([
				//
				new FormControl<number>(0),
			]),
		});
		// prettier-ignore
		let vmvazpjf = (jasmine
			.createSpy('vmvazpjf', () => {
				formPass(form.controls.a).touched;
			})
			.and.callThrough()
		);
		// prettier-ignore
		let dubrkuwp = (jasmine
			.createSpy('dubrkuwp', () => {
				formPass(form.controls.a).untouched;
			})
			.and.callThrough()
		);
		// prettier-ignore
		let mwkdxmjn = (jasmine
			.createSpy('mwkdxmjn', () => {
				formPass(form.controls.a).value;
				formPass(form.controls.a).status;
			})
			.and.callThrough()
		);
		runInInjectionContext(injector, () => {
			effect(vmvazpjf);
			effect(dubrkuwp);
			effect(mwkdxmjn);
		});
		fixture.detectChanges();
		vmvazpjf.calls.reset();
		dubrkuwp.calls.reset();
		mwkdxmjn.calls.reset();

		form.markAsTouched();

		expect(formPass(form).touched).toBeTrue();
		expect(formPass(form).untouched).toBeFalse();

		fixture.detectChanges();

		expect(vmvazpjf).toHaveBeenCalledTimes(1);
		vmvazpjf.calls.reset();
		expect(dubrkuwp).toHaveBeenCalledTimes(1);
		dubrkuwp.calls.reset();
		expect(mwkdxmjn).toHaveBeenCalledTimes(0);
		mwkdxmjn.calls.reset();

		form.controls.a.push(new FormControl());
	}));

	it('should detect pristine changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);
	}));
});
