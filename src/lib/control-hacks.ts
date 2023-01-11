import {
	AbstractControl,
	ControlValueAccessor,
	FormArray,
	FormGroup,
} from '@angular/forms';
import {noop} from 'rxjs';

export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
	writeValue: noop,
	registerOnChange: noop,
	registerOnTouched: noop,
};

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
