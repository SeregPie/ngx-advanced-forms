import {
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import {Observable} from 'rxjs';

export interface CustomValidatorFn<TControl extends AbstractControl> {
	(control: TControl): null | ValidationErrors;
}

export interface CustomAsyncValidatorFn<TControl extends AbstractControl> {
	(control: TControl): Promise<null | ValidationErrors> | Observable<null | ValidationErrors>;
}
