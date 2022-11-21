import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

export interface ValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): null | ValidationErrors;
}

export interface AsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl):
		| Promise<null | ValidationErrors>
		| Observable<null | ValidationErrors>;
}
