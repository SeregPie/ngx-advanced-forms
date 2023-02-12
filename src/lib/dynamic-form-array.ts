import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormArray} from './form-array';

// todo: rename all

export class DynamicFormArray<
	TControl extends AbstractControl = AbstractControl,
> extends FormArray<TControl> {
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super([], options);
	}

	override setValue(
		value: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const count = value.length;
		this.setControlsDynamically(count, {updateValueAndValidity: false});
		super.setValue(value, options);
	}

	override reset(
		value: Array<ɵRawValue<TControl>> = [],
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const count = value.length;
		this.setControlsDynamically(count, {updateValueAndValidity: false});
		super.reset(value, options);
	}

	setControlsDynamically(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory, controls} = this;
		const result: Array<TControl> = [];
		if (count > controls.length) {
			result.push(...controls);
			for (let i = result.length; i < count; i++) {
				result.push(controlFactory());
			}
		} else if (count > 0) {
			result.push(...controls.slice(0, count));
		}
		this.setControls(result, options);
	}

	addControlDynamicallyAt(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.insertControlBefore(index, control, options);
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
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		for (let i = 0; i < count; i++) {
			const control = controlFactory();
			controls.push(control);
		}
		this.insertControlsBefore(index, controls, options);
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
}
