import {AbstractControl} from '@angular/forms';

export function updateFormState(
	_control: AbstractControl,
	_fn: {
		(wrap: {
			(control: AbstractControl): {
				get disabled(): boolean;
				set disabled(v: boolean);

				get enabled(): boolean;
				set enabled(v: boolean);
			};
		}): void;
	},
): void {
	throw 'not implemented yet';
}
