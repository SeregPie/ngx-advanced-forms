import {
	AbstractControl,
	FormArray as NativeFormArray,
} from '@angular/forms';

export class FormArray<TControl extends AbstractControl = AbstractControl>
	extends NativeFormArray<TControl>
{
	declare readonly controls: Array<TControl>;

	get children(): Set<AbstractControl> {
		return new Set(this.controls);
	}

	setControls(controls: Array<TControl>, {
		updateValueAndValidity = true,
		...options
	}: Partial<{
		emitEvent: boolean;
		updateValueAndValidity: boolean;
	}> = {}): void {
		throw 'not implemented yet';
		controls;
		updateValueAndValidity;
		options;
	}

	insertControlBefore(index: number, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 0, control);
		this.setControls(result, options);
	}

	insertControlsBefore(index: number, controls: Array<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 0, ...controls);
		this.setControls(result, options);
	}

	insertControlLast(control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls, control];
		this.setControls(result, options);
	}

	insertControlsLast(controls: Array<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls, ...controls];
		this.setControls(result, options);
	}

	insertControlAt(index: number, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 1, control);
		this.setControls(result, options);
	}

	removeControlAt(index: number, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls];
		result.splice(index, 1);
		this.setControls(result, options);
	}

	clearControls(options?: Partial<{
		emitEvent: boolean;
	}>): void {
		this.setControls([], options);
	}
}
