import {
	Injectable,
	Optional,
	Provider,
	Self,
} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	NgControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {NoopControlValueAccessor} from './noop-control-value-accessor';

@Injectable()
export class FallthroughFormService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useValue: NoopControlValueAccessor,
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
