import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormArray} from './form-array';

export class DynamicFormArray<TControl extends AbstractControl = AbstractControl>
	extends FormArray<TControl>
{
	constructor(
		controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super([], options);
		this.#controlFactory = controlFactory;
	}

	#controlFactory: () => TControl;

	get controlFactory(): () => TControl {
		return this.#controlFactory;
	}

	override setValue(value: Array<ɵRawValue<TControl>>, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}

	override reset(value: Array<ɵRawValue<TControl>> = [], options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}

	gbncjtpx(count: number, options?: Partial<{
		emitEvent: boolean;
		updateValueAndValidity: boolean;
	}>): void {
		throw 'not implemented yet';
		count;
		options;
	}

	insertCkjwsahkControlBefore(index: number, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.insertControlBefore(index, control, options);
	}

	insertCkjwsahkControlsBefore(index: number, count: number, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		for (let i = 0; i < count; i++) {
			const control = controlFactory();
			controls.push(control);
		}
		this.insertControlsBefore(index, controls, options);
	}

	insertCkjwsahkControlLast(control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = [...this.controls, control];
		this.setControls(result, options);
	}

	insertCkjwsahkControlsLast(controls: Array<TControl>, options?: Partial<{
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

	addControlWithValueAt(
		index: number,
		value: ɵRawValue<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		control.setValue(value);
		this.insertControlBefore(index, control, options);
	}

	addControlsDynamicallyAt(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {

	}

	addControlsWithValueAt(
		index: number,
		values: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		values.forEach((value) => {
			const control = controlFactory();
			control.setValue(value);
			controls.push(control);
		});
		this.insertControlsBefore(index, controls, options);
	}

	addControlDynamicallyLast(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	) {
		const {controlFactory} = this;
		const control = controlFactory();
		this.insertControlLast(control, options);
	}

	addControlWithValueLast(
		value: ɵRawValue<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	) {
		const {controlFactory} = this;
		const control = controlFactory();
		control.setValue(value);
		this.insertControlLast(control, options);
	}

	addControlsDynamicallyLast(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		for (let i = 0; i < count; i++) {
			const control = controlFactory();
			controls.push(control);
		}
		this.insertControlsLast(controls, options);
	}

	addControlsWithValueLast(
		values: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		values.forEach((value) => {
			const control = controlFactory();
			control.setValue(value);
			controls.push(control);
		});
		this.insertControlsLast(controls, options);
	}

	// @deprecated
	addDynamicControl(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.push(control, options);
	}


	// @deprecated
	addDynamicControls(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._addDynamicControls(count);
		this.flushChanges(options);
	}

	// @deprecated
	addDynamicControlAt(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.insert(index, control, options);
	}


	// @deprecated
	addDynamicControlsAt(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {

	}


	// @deprecated
	setDynamicControls(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this._setDynamicControls(count);
		this.flushChanges(options);
	}
}
