import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

// todo: rename
export interface ValidatorFn<TControl extends AbstractControl> {
	(control: TControl): null | ValidationErrors;
}

// todo: rename
export interface ValidatorFn2 {
	<TControl extends AbstractControl>(control: TControl): null | ValidationErrors;
}

// todo: rename
export interface AsyncValidatorFn<TControl extends AbstractControl> {
	(control: TControl): Promise<null | ValidationErrors> | Observable<null | ValidationErrors>;
}

// todo: rename
export interface AsyncValidatorFn2 {
	<TControl extends AbstractControl>(control: TControl):
		| Promise<null | ValidationErrors>
		| Observable<null | ValidationErrors>;
}
