import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

export declare interface TypedValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl): null | ValidationErrors;
}

export declare interface TypedAsyncValidatorFn<
	TControl extends AbstractControl = AbstractControl,
> {
	(control: TControl):
		| Promise<null | ValidationErrors>
		| Observable<null | ValidationErrors>;
}
