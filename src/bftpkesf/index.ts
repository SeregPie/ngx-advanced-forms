import {computed, signal} from '@angular/core';
import {AbstractControl} from '@angular/forms';

// todo: rename
let keysOfReactiveFormControlMethods = [
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

// todo: rename
let keysOfReactiveFormControlGetters = [
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

// todo: rename
let instancesOfReactiveFormAccess = new WeakMap();

// todo: rename
// prettier-ignore
export function formPass<
	TControl extends AbstractControl,
>(
	control: TControl,
): ReactiveFormAccess<TControl> {
	let instance = instancesOfReactiveFormAccess.get(control);
	if (instance == null) {
		instancesOfReactiveFormAccess.set(control, instance = Object.create(null));
		Object.entries({
			control,
		}).forEach(([key, value]) => {
			Object.defineProperty(instance, key, {value});
		});
		let track = signal(null);
		keysOfReactiveFormControlMethods.forEach((key) => {
			let fn = (control as any)[key];
			(control as any)[key] = function () {
				fn.apply(this, arguments);
				track.mutate(() => {});
			};
		});
		keysOfReactiveFormControlGetters.forEach((key) => {
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

// todo: rename
// prettier-ignore
export interface ReactiveFormAccess<
	TControl extends AbstractControl = AbstractControl,
>
	extends Pick<TControl, (typeof keysOfReactiveFormControlGetters)[number]>
{
	readonly control: TControl;
}
