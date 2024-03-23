import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

const shxugoln = [
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

export type FormPass<TControl extends AbstractControl = AbstractControl> = {
	readonly control: TControl;
} & Readonly<Pick<TControl, (typeof shxugoln)[number]>>;

const nkavrkuo = [
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

export const formPass: {
	<TControl extends AbstractControl>(control: TControl): FormPass<TControl>;
} = (control) => {
	let instance = instances.get(control);
	if (instance == null) {
		instance = {
			control,
		};
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
