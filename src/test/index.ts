import {TestBed, tick} from '@angular/core/testing';

export function spy<T extends jasmine.Func>(fn: T): jasmine.Spy<T> {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

export async function flush(): Promise<void> {
	// @ts-ignore
	TestBed.INSTANCE._activeFixtures.forEach((v) => v.detectChanges());
	TestBed.flushEffects();
	tick();
}
