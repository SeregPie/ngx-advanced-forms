import {Injectable, Optional, Provider, Self} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	NgControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {NOOP_CONTROL_VALUE_ACCESSOR} from './control-value-accessor';

@Injectable()
export class FormFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				multi: true,
				provide: NG_VALUE_ACCESSOR,
				useValue: NOOP_CONTROL_VALUE_ACCESSOR,
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
		this.controlDirective = controlContainer ?? ngControl ?? null;
	}

	readonly controlDirective: null | AbstractControlDirective;

	get control(): null | AbstractControl {
		return this.controlDirective?.control ?? null;
	}
}
