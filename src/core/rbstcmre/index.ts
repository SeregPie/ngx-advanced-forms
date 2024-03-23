import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

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
		instance = {};
		let yftuleqz = signal({});
		nkavrkuo.forEach((k) => {
			let v = control[k];
			control[k] = function () {
				v.apply(this, arguments);
				yftuleqz.set({});
			};
		});
		shxugoln.forEach((k) => {
			let v = computed(() => {
				yftuleqz();
				return control[k];
			});
			Object.defineProperty(instance, k, {
				get: () => v(),
			});
		});
		instances.set(control, instance);
	}
	return instance;
};
