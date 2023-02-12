import {AbstractControl} from '@angular/forms';

export interface FormBridge<
	TControl extends AbstractControl = AbstractControl,
> {
	readonly control: TControl;
}
