import {AbstractControl} from '@angular/forms';
import {Observable, of} from 'rxjs';

// todo: NoopValidator?
export const noopValidator: {
	<TControl extends AbstractControl>(control: TControl): null;
} = () => null;

export const noopAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl): Observable<null>;
} = () => of(null);
