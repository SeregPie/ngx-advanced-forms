import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

// prettier-ignore
export interface CustomValidatorFn<TControl extends AbstractControl> {
	(control: TControl): null | ValidationErrors;
}

// prettier-ignore
export interface CustomAsyncValidatorFn<TControl extends AbstractControl> {
	(control: TControl): Promise<null | ValidationErrors> | Observable<null | ValidationErrors>;
}
