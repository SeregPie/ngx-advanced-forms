import {
	Component,
	Injector,
	computed,
	effect,
	runInInjectionContext,
	signal,
} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {formPass} from '.';

describe('formPass', () => {
	it('should detect value changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);

		let s = signal<number>(1);
		let c = computed(() => {
			s();
			return Math.random();
		});
		let aaaa = (jasmine
			.createSpy('aaaa', () => {
				console.log(s(), 'EFFECT')
			})
			.and.callThrough()
		);
		runInInjectionContext(injector, () => {
			effect(aaaa);
		});

		s.update(v => v++);
		console.log('UPDATE');

		fixture.detectChanges();

		s.update(v => v++);
		console.log('UPDATE');

		fixture.detectChanges();

		expect(aaaa).toHaveBeenCalledTimes(1);
	}));

	it('should detect status changes', fakeAsync(() => {
		@Component({
			standalone: true,
			template: '',
		})
		class NoopComponent {}
		let injector = TestBed.inject(Injector);
		let fixture = TestBed.createComponent(NoopComponent);

		// set value

		// set child value

		// set validator

		// set async validator
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
		let v0 = form.value;
		// prettier-ignore
		let vmvazpjf = (jasmine
			.createSpy('vmvazpjf', () => {
				formPass(form).touched;
			})
			.and.callThrough()
		);
		// prettier-ignore
		let dubrkuwp = (jasmine
			.createSpy('dubrkuwp', () => {
				formPass(form).untouched;
			})
			.and.callThrough()
		);
		// prettier-ignore
		let mwkdxmjn = (jasmine
			.createSpy('mwkdxmjn', () => {
				//formPass(form).value;
				formPass(form).status;
			})
			.and.callThrough()
		);
		runInInjectionContext(injector, () => {
			effect(vmvazpjf);
			effect(dubrkuwp);
			effect(mwkdxmjn);
		});

		fixture.detectChanges();
		expect(mwkdxmjn).toHaveBeenCalledTimes(1);
		vmvazpjf.calls.reset();
		dubrkuwp.calls.reset();
		mwkdxmjn.calls.reset();



		expect(formPass(form).touched).toBeFalse();
		expect(formPass(form).untouched).toBeTrue();

		form.markAsTouched();

		expect(formPass(form).touched).toBeTrue();
		expect(formPass(form).untouched).toBeFalse();

		let v1 = form.value;

		fixture.detectChanges();



		expect(vmvazpjf).toHaveBeenCalledTimes(1);
		vmvazpjf.calls.reset();
		expect(dubrkuwp).toHaveBeenCalledTimes(1);
		dubrkuwp.calls.reset();
		expect(mwkdxmjn).toHaveBeenCalledTimes(0);
		mwkdxmjn.calls.reset();

		console.log(v1 === v0);
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
