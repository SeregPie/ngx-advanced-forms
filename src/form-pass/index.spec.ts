import {
	Component,
	Injector,
	effect,
	runInInjectionContext,
	signal,
} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

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
				formPass(form).value;
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
		expect(mwkdxmjn).toHaveBeenCalledTimes(0);
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
