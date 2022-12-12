import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export function registerControl(
	parent: FormGroup | FormArray,
	child: AbstractControl,
): void {
	child.setParent(parent);
	(child as any)._registerOnCollectionChange(
		(parent as any)._onCollectionChange,
	);
}

export function unregisterControl(child: AbstractControl): void {
	(child as any)._registerOnCollectionChange(() => {});
}

export function triggerCollectionChange(control: AbstractControl): void {
	(control as any)._onCollectionChange();
}

export function getChildren(control: AbstractControl): Array<AbstractControl> {
	if (control instanceof FormGroup) {
		return Object.values(control.controls);
	}
	if (control instanceof FormArray) {
		return control.controls;
	}
	return [];
}

export function getAncestors(control: AbstractControl): Array<AbstractControl> {
	const {parent} = control;
	return parent ? [parent, ...getAncestors(parent)] : [];
}

export function getDescendants(
	control: AbstractControl,
): Array<AbstractControl> {
	return getChildren(control).flatMap((child) => [
		...getDescendants(child),
		child,
	]);
}

export function isDescendantOf(
	control: AbstractControl,
	otherControl: AbstractControl,
): boolean {
	let x: null | AbstractControl = control;
	while ((x = x.parent)) {
		if (x === otherControl) {
			return true;
		}
	}
	return false;
}

export function isAncestorOf(
	control: AbstractControl,
	otherControl: AbstractControl,
): boolean {
	return isDescendantOf(otherControl, control);
}
