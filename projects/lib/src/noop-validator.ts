import {AbstractControl} from '@angular/forms';
import {Observable, of} from 'rxjs';

// prettier-ignore
export const noopValidator: {
	<TControl extends AbstractControl>(control: TControl): null;
} = () => null;

// prettier-ignore
export const noopAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl): Observable<null>;
} = () => of(null);
