import {Injectable, Optional, Provider, Self} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	NgControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {gvfeyuot} from './fheneipc';

@Injectable()
// prettier-ignore
// todo: rename? FallthroughFormService
export class FormFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useValue: gvfeyuot,
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
