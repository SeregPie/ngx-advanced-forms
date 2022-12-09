import {AbstractControl} from '@angular/forms';
import {Observable, of} from 'rxjs';

export const noopValidator: {
	<TControl extends AbstractControl>(control: TControl): null;
} = () => null;

export const noopAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl): Observable<null>;
} = () => of(null);
