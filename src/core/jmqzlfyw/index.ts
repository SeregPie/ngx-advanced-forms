// @ts-nocheck

import {
	//
	Provider,
	Signal,
	computed,
	inject,
} from '@angular/core';
import {
	//
	AbstractControl,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
} from '@angular/forms';

export const useFormFallthrough: {
	<TControl extends AbstractControl>(): Signal<null | TControl>;
	required: {
		<TControl extends AbstractControl>(): Signal<TControl>;
	};
} = () => {
	// todo
	let ref =
		inject(ControlContainer, {optional: true, self: true}) ??
		inject(NgControl, {optional: true, self: true});
	return computed(() => ref?.control);
};

useFormFallthrough.required = () => {
	let value$ = useFormFallthrough();
	return computed(() => {
		let value = value$();
		if (value == null) {
			// todo: error message
			throw new Error();
		}
		return value;
	});
};

export const ControlFallthroughProvider: Provider = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useClass: class implements ControlValueAccessor {
		writeValue() {}

		registerOnChange() {}

		registerOnTouched() {}
	},
};
