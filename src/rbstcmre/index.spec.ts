import {
	Component,
	Injector,
	effect,
	runInInjectionContext,
	signal,
} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';

describe('rbstcmre', () => {
	it('...', fakeAsync(() => {
		@Component({standalone: true, template: ''})
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
});
