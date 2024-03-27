// @ts-nocheck

import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

// prettier-ignore
// todo: rename
export type Ygakljpn = (
	| 'status'
	| 'valid'
	| 'invalid'
	| 'pending'
	| 'disabled'
	| 'enabled'
	| 'pristine'
	| 'dirty'
	| 'touched'
	| 'untouched'
	| 'value'
	| 'errors'
);

// prettier-ignore
// todo: rename
export type Nyggshxy<TControl extends AbstractControl = AbstractControl> = (
	& Readonly<Pick<TControl, Ygakljpn>>
	& {
		control: TControl;
	}
);

// todo: rename
export const formi: {
	<TControl extends AbstractControl>(
		//
		control: TControl,
	): Nyggshxy<TControl>;
} = (() => {
	// todo: rename
	let shxugoln = [
		'status',
		'valid',
		'invalid',
		'pending',
		'disabled',
		'enabled',
		'pristine',
		'dirty',
		'touched',
		'untouched',
		'value',
		'errors',
	];
	// todo: rename
	let nkavrkuo = [
		'disable',
		'enable',
		'markAsDirty',
		'markAsPending',
		'markAsPristine',
		'markAsTouched',
		'setErrors',
		'updateValueAndValidity',
	];
	let instances = new WeakMap();
	return (control) => {
		let instance = instances.get(control);
		if (instance == null) {
			// todo: Object.create
			instance = {
				control,
			};
			// todo: rename
			let yftuleqz = signal({});
			nkavrkuo.forEach((k) => {
				// todo: rename
				let kvvidwgu = control[k];
				control[k] = function () {
					kvvidwgu.apply(this, arguments);
					yftuleqz.set({});
				};
			});
			shxugoln.forEach((k) => {
				// todo: rename
				let rdgmjhvn = computed(() => {
					yftuleqz();
					return control[k];
				});
				Object.defineProperty(instance, k, {
					// todo: props
					enumerable: true,
					get: () => rdgmjhvn(),
				});
			});
			instances.set(control, instance);
		}
		return instance;
	};
})();
