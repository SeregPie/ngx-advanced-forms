import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormArray} from './form-array';

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
		this.hpjprvfa(count, {updateValueAndValidity: false});
		super.setValue(value, options);
	}

	// todo: rename
	hpjprvfa(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}>,
	): void {
		// todo?
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

	// todo: rename: addLast, addLastControl
	xciprnay(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.eexzzszd(control, options);
	}

	// todo: rename: addLastAll, addLastControls
	ajamxilj(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		{
			for (let i = 0; i < count; i++) {
				const control = controlFactory();
				controls.push(control);
			}
		}
		this.xrhtupyx(controls, options);
	}

	// todo: rename: add, addControl
	sdcfszlp(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const control = controlFactory();
		this.apamnjsv(index, control, options);
	}

	// todo: rename: addAll, addControls
	gxfjcuhm(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		const {controlFactory} = this;
		const controls: Array<TControl> = [];
		{
			for (let i = 0; i < count; i++) {
				const control = controlFactory();
				controls.push(control);
			}
		}
		this.vbyhggsr(index, controls, options);
	}
}
