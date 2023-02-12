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

import {DummyControlValueAccessor} from './dummy-control-value-accessor';

@Injectable()
export class FallthroughFormService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useClass: DummyControlValueAccessor,
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
