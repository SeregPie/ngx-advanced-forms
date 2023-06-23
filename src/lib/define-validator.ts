import {AbstractControl, ValidationErrors} from '@angular/forms';

export function defineValidator<TErrors extends ValidationErrors>(fn: {
	(value: unknown): null | TErrors;
}): {
	<TControl extends AbstractControl>(control: TControl): null | TErrors;
} {
	return (control) => fn(control.getRawValue());
}
