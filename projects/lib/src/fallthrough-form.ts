import {Injectable, Optional, Provider, Self} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {noop} from 'rxjs';

@Injectable()
export class FallthroughFormService<
	TControl extends AbstractControl = AbstractControl,
> {
	static provide(): Provider {
		return this;
	}

	constructor(
		@Self()
		@Optional()
		private readonly ngControl?: NgControl,
	) {
		if (ngControl) {
			ngControl.valueAccessor = {
				writeValue: noop,
				registerOnChange: noop,
				registerOnTouched: noop,
			};
		}
	}

	get control(): TControl {
		const {ngControl} = this;
		if (ngControl) {
			if (ngControl.control) {
				return ngControl.control as TControl;
			}
		}
		// todo: error message
		throw new Error();
	}
}
