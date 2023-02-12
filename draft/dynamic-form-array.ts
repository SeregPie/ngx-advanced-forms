import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormArray} from './form-array';

// : rename?
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

	setControlsDynamically(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}>,
	): void {
		// ?
		const {controlFactory} = this;
		const controls = [...this.controls];
		{
			controls.splice(count > 0 ? count : 0);
			for (let i = controls.length; i < count; i++) {
				const control = controlFactory();
				controls.push(control);
			}
		}
		this.setControls(controls, options);
	}

	addControlDynamicallyAt(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.addControlAt(index, control, options);
	}

	addAt(
		index: number,
		value: ɵRawValue<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = [...this.getRawValue()];
		result.splice(index, 0, value);
		this.setValue(result, options);
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
		this.addControlsAt(index, controls, options);
	}

	addAllAt(
		index: number,
		values: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = [...this.getRawValue()];
		result.splice(index, 0, ...values);
		this.setValue(result, options);
	}

	addControlDynamicallyLast(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	) {
		const {controlFactory} = this;
		const control = controlFactory();
		this.addControlLast(control, options);
	}

	addLast(
		value: ɵRawValue<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	) {
		const result = [...this.getRawValue(), value];
		this.setValue(result, options);
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
		this.addControlsLast(controls, options);
	}

	addAllLast(
		values: Array<ɵRawValue<TControl>>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const result = [...this.getRawValue(), ...values];
		this.setValue(result, options);
	}

	// put?
}
