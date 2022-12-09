import {AbstractControl} from '@angular/forms';

// todo: rename
export interface Raqkxkuc<TControl extends AbstractControl> {
	control: TControl;

	disabled: boolean;

	enabled: boolean;
}

// todo: rename
export interface Zyggsdzi {
	<TControl extends AbstractControl>(control: TControl): Raqkxkuc<TControl>;
}

export function updateFormState(
	control: AbstractControl,
	fn: (wrap: Zyggsdzi) => void,
): void {
	// todo: implement
	control;
	fn;
}
