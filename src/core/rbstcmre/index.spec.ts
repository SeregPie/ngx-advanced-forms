import {fakeAsync} from '@angular/core/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {flush} from '../../test';
import {formi} from './';

describe('formi', () => {
	it('should work', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl<null | number>(null, {
				validators: Validators.required,
			}),
			b: new FormControl<null | string>(null, {
				validators: Validators.required,
			}),
		});

		let shxugoln = Object.keys(formi(form)) as Array<
			keyof ReturnType<typeof formi>
		>;
		console.log(shxugoln);
		let jvlickuw = () => {
			[form, form.controls.a, form.controls.b].forEach((form) => {
				shxugoln.forEach((key) => {
					expect(formi(form)[key]).toBe(form[key]);
				});
			});
		};

		(3 * 2)! + (3 * 3)! + (1 + 3 * 3)! + 3!;

		let actions = [
			() => form.disable(),
			() => form.enable(),

			() => form.controls.a.disable(),
			() => form.enable(),

			() => form.controls.a.disable(),
			() => form.disable(),
			() => form.enable(),

			() => form.controls.a.disable(),
			() => form.controls.a.enable(),
			() => form.enable(),

			() => form.disable(),
			() => form.controls.a.enable(),
			() => form.enable(),

			[form, form.controls.a, form.controls.b].flatMap((form) => [
				() => form.disable(),
				() => form.enable(),
			]),
			[form, form.controls.a, form.controls.b].flatMap((form) => [
				() => form.markAsPristine(),
				() => form.markAsDirty(),
				() => form.reset(),
			]),
			[
				() => form.markAllAsTouched(),
				...[form, form.controls.a, form.controls.b].flatMap((form) => [
					() => form.markAsTouched(),
					() => form.markAsUntouched(),
					() => form.reset(),
				]),
			],
			[
				() =>
					form.setValue({
						a: 1,
						b: '',
					}),
				() => form.controls.a.setValue(1),
				() => form.controls.b.setValue('a'),
			],
		];

		jvlickuw();

		form.controls.a.markAsDirty();

		jvlickuw();

		form.markAsPristine();

		jvlickuw();

		await flush();
	}));
});
