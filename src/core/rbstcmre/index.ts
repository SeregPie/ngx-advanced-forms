// @ts-nocheck

import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

/*
todo: rename
shxugoln
nkavrkuo
formi
yftuleqz
kvvidwgu
rdgmjhvn
*/

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
] as const;

let nkavrkuo = [
	'disable',
	'enable',
	'markAsDirty',
	'markAsPending',
	'markAsPristine',
	'markAsTouched',
	'setErrors',
	'updateValueAndValidity',
] as const;

let instances = new WeakMap();

export let formi: {
	<TControl extends AbstractControl>(
		control: TControl,
	): Readonly<Pick<TControl, (typeof shxugoln)[number]>>;
} = (control) => {
	let instance = instances.get(control);
	if (instance == null) {
		instance = {}; // todo: Object.create
		let yftuleqz = signal({});
		nkavrkuo.forEach((k) => {
			let kvvidwgu = control[k];
			control[k] = function () {
				kvvidwgu.apply(this, arguments);
				yftuleqz.set({});
			};
		});
		shxugoln.forEach((k) => {
			let rdgmjhvn = computed(() => {
				yftuleqz();
				return control[k];
			});
			Object.defineProperty(instance, k, {
				// todo: props
				get: () => rdgmjhvn(),
			});
		});
		instances.set(control, instance);
	}
	return instance;
};
