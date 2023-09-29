import {Provider, Signal, computed, inject} from '@angular/core';
import {
	AbstractControl,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
} from '@angular/forms';

export function useControlFallthrough<TControl extends AbstractControl>(
	options?: Partial<{
		required: boolean;
	}>,
): Signal<null | TControl>;
export function useControlFallthrough<
	TControl extends AbstractControl,
>(options: {
	//
	required: true;
}): Signal<TControl>;
export function useControlFallthrough({
	required = false,
}: Partial<{
	required: boolean;
}> = {}): Signal<null | AbstractControl> {
	// prettier-ignore
	const controlDirective = (
		inject(ControlContainer, {
			optional: true,
			self: true,
		}) ??
		inject(NgControl, {
			optional: true,
			self: true,
		}) ??
		null
	);
	return computed(() => {
		let control = controlDirective?.control ?? null;
		if (control != null) {
			return control;
		}
		if (required) {
			throw new Error();
		}
		return null;
	});
}

export const ControlFallthroughProvider: Provider = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useClass: class implements ControlValueAccessor {
		writeValue() {}

		registerOnChange() {}

		registerOnTouched() {}
	},
};
