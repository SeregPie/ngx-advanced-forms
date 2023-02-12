import {AbstractControl} from '@angular/forms';
import {
	Observable,
	of,
} from 'rxjs';

export const NoopValidator: {
	<TControl extends AbstractControl>(control: TControl): null;
} = () => null;

export const NoopAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl): Observable<null>;
} = () => of(null);
