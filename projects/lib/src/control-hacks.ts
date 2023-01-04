import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

// todo?

export function registerControl(
	control: AbstractControl,
	controlContainer: FormGroup | FormArray,
): void {
	control.setParent(controlContainer);
	(control as any)._registerOnCollectionChange(
		(controlContainer as any)._onCollectionChange,
	);
}

export function unregisterControl(control: AbstractControl): void {
	(control as any)._registerOnCollectionChange(() => {});
}

export function triggerCollectionChange(control: AbstractControl): void {
	(control as any)._onCollectionChange();
}
