import {ControlValueAccessor} from '@angular/forms';

export class DummyControlValueAccessor
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}
