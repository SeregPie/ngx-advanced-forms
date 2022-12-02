// todo: rename file

import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

// todo
export type Wwwmibfo<T> = null | T;

// todo
export type Nftxqdyl<T> = T | Promise<T> | Observable<T>;

// todo: rename
export interface Qlgjlsap<TControl extends AbstractControl = AbstractControl> {
	(control: TControl): Nftxqdyl<Wwwmibfo<ValidationErrors>>;
}
