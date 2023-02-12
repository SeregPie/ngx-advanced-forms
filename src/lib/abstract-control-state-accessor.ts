import {AbstractControl} from '@angular/forms';

import {ControlStateAccessor} from './control-state-accessor';

export abstract class AbstractControlStateAccessor<TControl extends AbstractControl>
	implements ControlStateAccessor<TControl>
{
	constructor(control: TControl) {
		this.#control = control;
	}

	#control: TControl;

	get control(): TControl {
		return this.#control;
	}

	abstract get disabled(): boolean;
	abstract set disabled(v: boolean);

	get enabled(): boolean {
		return !this.disabled;
	}
	set enabled(v: boolean) {
		this.disabled = !v;
	}
}
