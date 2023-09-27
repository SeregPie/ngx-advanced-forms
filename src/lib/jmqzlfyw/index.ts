import {Provider, inject} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
} from '@angular/forms';

export interface ControlFallthrough {
	readonly controlDirective: null | AbstractControlDirective;

	readonly control: null | AbstractControl;
}

export function useControlFallthrough(): ControlFallthrough {
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
	return {
		controlDirective,
		get control() {
			return controlDirective?.control ?? null;
		},
	};
}

export const ControlFallthroughProvider: Provider = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useValue: new (class implements ControlValueAccessor {
		writeValue() {}

		registerOnChange() {}

		registerOnTouched() {}
	})(),
};

// prettier-ignore
export class NoopValueAccessor
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}

// prettier-ignore
export class ControlFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useClass: NoopValueAccessor,
			},
		];
	}

	constructor() {}

	#controlDirective = (
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

	get controlDirective(): null | AbstractControlDirective {
		return this.#controlDirective;
	}

	get control(): null | AbstractControl {
		return this.controlDirective?.control ?? null;
	}
}
