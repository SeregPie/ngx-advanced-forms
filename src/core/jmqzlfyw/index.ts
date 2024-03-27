// @ts-nocheck

import {Signal, WritableSignal, effect, inject, signal} from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	NgControl,
	ValidationErrors,
} from '@angular/forms';

export const useFormFallthrough: {
	<TControl extends AbstractControl>(): {(): null | TControl};
	required: {
		<TControl extends AbstractControl>(): {(): TControl};
	};
} = () => {
	let ref = inject(NgControl, {self: true, optional: true});
	if (ref != null) {
		ref.valueAccessor ??= {
			writeValue() {},
			registerOnChange() {},
			registerOnTouched() {},
		};
	} else {
		ref = inject(ControlContainer, {self: true, optional: true});
	}
	return () => ref?.control ?? null;
};

useFormFallthrough.required = () => {
	let result$ = useFormFallthrough();
	return () => {
		let result = result$();
		if (result == null) {
			throw new Error(`required but not available`);
		}
		return result;
	};
};

export type FormBridgeResult = {
	touched: Signal<boolean>;
	disabled: Signal<boolean>;
	pending: Signal<boolean>;
	errors: Signal<null | ValidationErrors>;
};

export type FormBridgeOptions = Partial<{
	disabled: WritableSignal<boolean>;
}>;

export const useFormBridge: {
	<TValue>(
		value: WritableSignal<TValue>,
		options?: FormBridgeOptions,
	): FormBridgeResult;
} = (value$, {disabled: disabled$ = signal(false)} = {}) => {
	let ref = inject(NgControl, {self: true, optional: true});
	if (ref != null) {
		let value = value$();
		let handleOnChange = () => {};
		// prettier-ignore
		effect(() => {
			let v = value$();
			if (value !== v) {
				handleOnChange(value = v);
			}
		}, {allowSignalWrites: true});
		let handleOnTouched = () => {};
		effect(
			() => {
				// todo
			},
			{allowSignalWrites: true},
		);
		ref.valueAccessor = {
			writeValue(v) {
				// prettier-ignore
				value$.set(value = v);
			},
			registerOnChange(fn) {
				handleOnChange = fn;
			},
			registerOnTouched(fn) {
				handleOnTouched = fn;
			},
			setDisabledState(v) {
				disabled$.set(v);
			},
		};
	}
	return {
		disabled: disabled$.asReadonly(),
	};
};
