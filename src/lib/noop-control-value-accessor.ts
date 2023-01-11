import {ControlValueAccessor} from '@angular/forms';
import {noop} from 'rxjs';

export const NoopControlValueAccessor: ControlValueAccessor = {
	writeValue: noop,
	registerOnChange: noop,
	registerOnTouched: noop,
};
