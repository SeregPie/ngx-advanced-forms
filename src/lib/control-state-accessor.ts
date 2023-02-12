import {AbstractControl} from '@angular/forms';

export interface ControlStateAccessor<TControl extends AbstractControl> {
	readonly control: TControl;

	get disabled(): boolean;
	set disabled(v: boolean);

	get enabled(): boolean;
	set enabled(v: boolean);
}
