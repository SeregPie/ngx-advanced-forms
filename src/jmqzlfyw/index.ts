import {
	Injectable,
	Provider,
	inject,
} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
} from '@angular/forms';

// todo: rename? Noop/Dummy(Control)ValueAccessor
export class NoopControlValueAccessor
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}

// todo: rename?
@Injectable()
export class FormFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useClass: NoopControlValueAccessor,
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
		return this.#controlDirective?.control ?? null;
	}
}
