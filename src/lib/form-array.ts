import {AbstractControl, FormArray as NativeFormArray} from '@angular/forms';

export class FormArray<
	TControl extends AbstractControl = AbstractControl,
> extends NativeFormArray<TControl> {
	declare readonly controls: Array<TControl>;

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
		if (!isEqual(this.controls, controls)) {
			updateValueAndValidity = false;
		}
		{
			this.controls.splice(0, Infinity, ...controls);
			incoming;
			existing;
		}
		{
			let triggerCollectionChange = false;
			newControls.difference(oldControls).forEach((control) => {
				triggerCollectionChange = true;
				this.registerControl(control);
			});
			oldControls.difference(newControls).forEach((control) => {
				triggerCollectionChange = true;
				this.unregisterControl(control);
			});
			if (triggerCollectionChange) {
				this.triggerCollectionChange(this);
			}
		}
		if (updateValueAndValidity) {
			this.updateValueAndValidity(options);
		}
		// todo: implement
	}

	// prettier-ignore
	insertControlBefore(index: number, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 0, control);
		this.setControls(result, options);
	}

	// prettier-ignore
	insertControlsBefore(index: number, controls: Array<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 0, ...controls);
		this.setControls(result, options);
	}

	// prettier-ignore
	insertControlLast(control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls, control];
		this.setControls(result, options);
	}

	// prettier-ignore
	insertControlsLast(controls: Array<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls, ...controls];
		this.setControls(result, options);
	}

	// prettier-ignore
	insertControlAt(index: number, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 1, control);
		this.setControls(result, options);
	}

	// prettier-ignore
	removeControlAt(index: number, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 1);
		this.setControls(result, options);
	}

	// prettier-ignore
	clearControls(options?: Partial<{
		emitEvent: boolean;
	}>): void {
		this.setControls([], options);
	}
}
