import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export function registerControl(
	parent: FormGroup | FormArray,
	child: AbstractControl,
) {
	child.setParent(parent);
	(child as any)._registerOnCollectionChange(
		(parent as any)._onCollectionChange,
	);
}

export function unregisterControl(child: AbstractControl) {
	(child as any)._registerOnCollectionChange(() => {});
}

export function triggerCollectionChange(control: AbstractControl) {
	(control as any)._onCollectionChange();
}
