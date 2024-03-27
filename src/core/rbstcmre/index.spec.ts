import {computed} from '@angular/core';
import {fakeAsync} from '@angular/core/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
		let jqqruzky = {
			pristine: computed(() => formi(form).pristine),
			dirty: computed(() => formi(form).dirty),
			touched: computed(() => formi(form).touched),
			untouched: computed(() => formi(form).untouched),
		};

		for await (let _ of (async function* () {
			yield;

			form.markAsDirty();

			yield;

			form.reset();
		})()) {
			expect(jqqruzky.pristine()).toEqual(form.pristine);
			expect(jqqruzky.dirty()).toEqual(form.dirty);
			console.log();
		}
	}));
});
