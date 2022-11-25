import {ControlValueAccessor} from '@angular/forms';
import {noop} from 'rxjs';

export const NOOP_CONTROL_VALUE_ACCESSOR: ControlValueAccessor = {
	writeValue: noop,
	registerOnChange: noop,
	registerOnTouched: noop,
};
