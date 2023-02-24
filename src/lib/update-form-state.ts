import {AbstractControl} from '@angular/forms';

import {CreateControlStateAccessorFn} from './create-control-state-accessor';

export function updateFormState<TControl extends AbstractControl>(
	control: TControl,
	fn: {(wrap: CreateControlStateAccessorFn): void},
): void {
	throw 'not implemented yet';
}
