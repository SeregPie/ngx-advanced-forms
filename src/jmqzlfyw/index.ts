// todo: format imports

import {Injectable, Optional, Provider, Self} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
} from '@angular/forms';

export class NoopControlValueAccessor
	//
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}

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

	constructor(
		@Self()
		@Optional()
		controlContainer?: ControlContainer,

		@Self()
		@Optional()
		ngControl?: NgControl,
	) {
		this.#controlDirective = controlContainer ?? ngControl ?? null;
	}

	#controlDirective: null | AbstractControlDirective;

	get controlDirective(): null | AbstractControlDirective {
		return this.#controlDirective;
	}

	get control(): null | AbstractControl {
		return this.#controlDirective?.control ?? null;
	}
}
