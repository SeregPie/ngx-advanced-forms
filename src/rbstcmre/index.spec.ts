import {effect, signal} from '@angular/core';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';

describe('rbstcmre', () => {
	it('...', fakeAsync(() => {
		TestBed.runInInjectionContext(() => {
			let s = signal<number>(1);
			effect(
				() => {
					console.log('effect', s());
				},
				{manualCleanup: true},
			);

			tick();

			s.set(2);

			tick();

			console.log(s());
		});
	}));
});
