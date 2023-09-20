import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

// todo: rename
export let fglhrjuc = [
	'value',
	'errors',
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
] as const;

export type Lavetcki = (typeof fglhrjuc)[number];

// todo: rename
export const formPass = (() => {
	let instances = new WeakMap();

	// todo: rename
	let methodsKeys = [
		'markAsPending',
		'markAsPristine',
		'markAsDirty',
		'markAsTouched',
		'markAsUntouched',
		'_updateValue',
		'_updateControlsErrors',
		'_updatePristine',
		'_updateTouched',
	] as const;

	let gettersKeys = fglhrjuc;

	// prettier-ignore
	return <
		TControl extends AbstractControl,
	>(
		control: TControl,
	): ReactiveFormAccess<TControl> => {
		let instance = instances.get(control);
		if (instance == null) {
			instances.set(control, instance = Object.create(null));
			Object.entries({
				control,
			}).forEach(([key, value]) => {
				Object.defineProperty(instance, key, {value});
			});
			let track = signal(null);
			methodsKeys.forEach((key) => {
				let fn = (control as any)[key];
				(control as any)[key] = function () {
					fn.apply(this, arguments);
					track.mutate(() => {});
				};
			});
			gettersKeys.forEach((key) => {
				let value = computed(() => {
					track();
					return control[key];
				});
				Object.defineProperty(instance, key, {
					get() {
						return value();
					},
				});
			});
		}
		return instance;
	}
})();

// todo: rename
// prettier-ignore
export interface ReactiveFormAccess<
	TControl extends AbstractControl = AbstractControl,
>
	extends Pick<TControl, Lavetcki>
{
	readonly control: TControl;
}
