import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

export interface TypedValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): null | ValidationErrors;
}

export interface TypedAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl):
		| Promise<null | ValidationErrors>
		| Observable<null | ValidationErrors>;
}
