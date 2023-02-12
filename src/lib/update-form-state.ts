import {AbstractControl} from '@angular/forms';

import {CreateControlStateAccessorFn} from './create-control-state-accessor';

export const updateFormState: {
	<TControl extends AbstractControl>(control: TControl, fn: {(wrap: CreateControlStateAccessorFn): void}): void;
} = (_control, _fn) => {
	throw 'not implemented yet';
};
