import {AbstractControl, FormArray as NativeFormArray} from '@angular/forms';

import {
	registerControl,
	triggerCollectionChange,
	unregisterControl,
} from './control-hacks';

export class FormArray<
	TControl extends AbstractControl = AbstractControl,
> extends NativeFormArray<TControl> {
	declare controls: Array<TControl>;

	setControls(
		controls: Array<TControl>,
		{
			updateValueAndValidity = true,
			...options
		}: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}> = {},
	): void {
		// todo
		const addedControls: Array<AbstractControl> = [];
		const removedControls: Array<AbstractControl> = [];
		const currentControls = this.controls;
		{
			if (currentControls.length > controls.length) {
				currentControls.splice(controls.length).forEach((control) => {
					removedControls.push(control);
				});
			} else if (currentControls.length < controls.length) {
				for (let i = currentControls.length; i)
			}
		}
		addedControls.forEach((control) => {
			registerControl(control, this);
		});
		removedControls.forEach((control) => {
			unregisterControl(control);
		});
		if (addedControls.length || removedControls.length) {
			triggerCollectionChange(this);
			if (updateValueAndValidity) {
				this.updateValueAndValidity(options);
			}
		}
	}

	// todo: rename: addLast, addLastControl
	eexzzszd(
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	) {
		const newControls = [...this.controls, control];
		this.setControls(newControls, options);
	}

	// todo: rename: addLastAll, addLastControls
	xrhtupyx(
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newControls = [...this.controls, ...controls];
		this.setControls(newControls, options);
	}

	// todo: rename: add, addControl
	apamnjsv(
		index: number,
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newControls = [...this.controls];
		newControls.splice(index, 0, control);
		this.setControls(newControls, options);
	}

	// todo: rename: addAll, addControls
	vbyhggsr(
		index: number,
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newControls = [...this.controls];
		newControls.splice(index, 0, ...controls);
		this.setControls(newControls, options);
	}

	// todo: rename: set, setControl
	olcmwvno(
		index: number,
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newControls = [...this.controls];
		newControls.splice(index, 1, control);
		this.setControls(newControls, options);
	}

	// todo: rename: remove, removeControl
	kohohxug(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const newControls = [...this.controls];
		newControls.splice(index, 1);
		this.setControls(newControls, options);
	}

	override clear(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.setControls([], options);
	}

	get empty(): boolean {
		return !this.size;
	}

	get size(): number {
		return this.length;
	}
}
