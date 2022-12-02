import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {composeValidators} from './compose-validators';

export function setValidators<TControl extends AbstractControl>(
	control: TControl,
	...validators: Array<Qlgjlsap<TControl>>
): TControl {
	control.clearValidators();
	control.setAsyncValidators(composeValidators(...validators) as AsyncValidatorFn);
	control.updateValueAndValidity();
	return control;
}
