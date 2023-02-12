import {AbstractControl} from '@angular/forms';

import {ControlStateAccessor} from './control-state-accessor';

export interface CreateControlStateAccessorFn {
	<TControl extends AbstractControl>(control: TControl): ControlStateAccessor<TControl>;
}
