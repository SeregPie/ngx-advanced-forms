import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

export function withCustomValidator<
	TControl extends AbstractControl = AbstractControl,
>(
	control: TControl,
	validator: (control: TControl) => null | ValidationErrors,
): TControl {
	control.addValidators(() => validator(control));
	control.updateValueAndValidity();
	return control;
}

export function withCustomAsyncValidator<
	TControl extends AbstractControl = AbstractControl,
>(
	control: TControl,
	validator: (
		control: TControl,
	) => Promise<null | ValidationErrors> | Observable<null | ValidationErrors>,
): TControl {
	control.addAsyncValidators(() => validator(control));
	control.updateValueAndValidity();
	return control;
}
