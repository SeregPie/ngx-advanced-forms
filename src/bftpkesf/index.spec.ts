import {Injector, effect, runInInjectionContext} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import {Fglhrjuc, formPass} from '.';

describe('formPass', () => {
	it('should work', fakeAsync(async () => {
		// prettier-ignore
		let form = new FormGroup({
			a: new FormControl<number>(0, {
				validators: ({value}) => value < 2 ? null : {error: true},
			}),
			b: new FormArray([
				new FormControl<string>('a0'),
				new FormControl<string>('b0'),
			]),
		});

		let injector = TestBed.inject(Injector);
		[
			form,
			form.controls.a,
			form.controls.b,
			form.controls.b.controls[0],
			form.controls.b.controls[1],
		].forEach((form) =>
			Fglhrjuc.forEach(async (key) => {
				let oldValue = form[key];
				// todo: rename
				// prettier-ignore
				let ypaumyxq = (jasmine
					.createSpy('ypaumyxq', () => {
						formPass(form)[key];
					})
					.and.callThrough()
				);
				runInInjectionContext(injector, () => {
					effect(ypaumyxq);
				});

				await next();

				ypaumyxq.calls.reset();

				return async () => {
					let newValue = form[key];
					let changed = oldValue !== newValue;
					oldValue = newValue;

					expect(formPass(form)[key]).toBe(newValue);

					await next();

					expect(ypaumyxq).toHaveBeenCalledTimes(changed ? 1 : 0);
					ypaumyxq.calls.reset();
				};
			}),
		);

		let zkbhphig = (() => {
			let bfqktvtr = [
				form,
				form.controls.a,
				form.controls.b,
				form.controls.b.controls[0],
				form.controls.b.controls[1],
			].flatMap((form) =>
				Fglhrjuc.map((key) => {
					let oldValue = form[key];
					// todo: rename
					// prettier-ignore
					let ypaumyxq = (jasmine
						.createSpy('ypaumyxq', () => {
							formPass(form)[key];
						})
						.and.callThrough()
					);
					runInInjectionContext(injector, () => {
						effect(ypaumyxq);
					});
					return () => {
						// TestBed.flushEffects();
						ypaumyxq.calls.reset();
						return () => {
							let newValue = form[key];
							expect(formPass(form)[key]).toBe(newValue);
							return () => {
								// TestBed.flushEffects();
								if (oldValue !== newValue) {
									//expect(ypaumyxq).toHaveBeenCalledTimes(1);
									ypaumyxq.calls.reset();
									oldValue = newValue;
								}
							};
						};
					};
				}),
			);
			//TestBed.flushEffects();
			let ndzfhorc = bfqktvtr.map((fn) => fn());
			return () => {
				let nxdljjof = ndzfhorc.map((fn) => fn());
				//TestBed.flushEffects();
				nxdljjof.map((fn) => fn());
			};
		})();

		form.setValue({
			a: 1,
			b: ['a1', 'b1'],
		});

		await zkbhphig();

		form.controls.a.setValue(2);

		await zkbhphig();

		form.controls.a.disable();

		await zkbhphig();

		form.controls.b.disable();

		await zkbhphig();

		form.enable();

		await zkbhphig();

		form.reset();

		await zkbhphig();

		form.controls.b.push(new FormControl<string>('c0'));

		await zkbhphig();

		form.controls.b.removeAt(0);

		await zkbhphig();

		form.controls.a.markAsTouched();

		await zkbhphig();

		form.controls.a.markAsUntouched();

		await zkbhphig();

		form.markAllAsTouched();

		await zkbhphig();

		form.controls.a.markAsDirty();

		await zkbhphig();

		form.controls.a.markAsPristine();

		await zkbhphig();
	}));
});
