import {
	Component,
	Injector,
	effect,
	runInInjectionContext,
	signal,
} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

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

		let onTouchedChanged = (jasmine
			.createSpy('customAsyncValidator', () => {
				form.touched;
			})
			.and.callThrough()
		);
		let onUntouchedChanged = jasmine.createSpy('', () => {
			form.untouched;
		});
		let spy2 = jasmine.createSpy('', () => {
			form.value;
			form.errors;
		});
		runInInjectionContext(injector, () => {
			effect(spy0);
			effect(spy1);
		});

		spy.calls.reset();
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
