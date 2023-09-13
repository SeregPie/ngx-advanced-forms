// todo: name file

import {ControlValueAccessor} from '@angular/forms';

export class NoopControlValueAccessor
	//
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}
