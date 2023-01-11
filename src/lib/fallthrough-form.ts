import {Injectable, Optional, Provider, Self} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	NgControl,
} from '@angular/forms';

import { NoopControlValueAccessor } from './noop-control-value-accessor';


@Injectable()
export class FallthroughFormService {
	static provide(): Provider {
		return this;
	}

	constructor(
		@Self()
		@Optional()
		controlContainer?: ControlContainer,

		@Self()
		@Optional()
		ngControl?: NgControl,
	) {
		if (ngControl) {
			ngControl.valueAccessor = NoopControlValueAccessor;
		}
		this.controlDirective = controlContainer ?? ngControl ?? null;
	}

	readonly controlDirective: null | AbstractControlDirective;

	get control(): null | AbstractControl {
		return this.controlDirective?.control ?? null;
	}
}
