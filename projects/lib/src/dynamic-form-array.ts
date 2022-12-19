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
		this.rxsigtut(count);
		super.setValue(value, options);
		// todo
	}

	// todo: rename
	addLast2(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory} = this;
		const control = controlFactory();
		this.addLast(control, options);
	}

	// todo: rename
	addLastAll2(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory} = this;
		const controls = Array.from({length: count}, () => controlFactory());
		this.addLastAll(controls, options);
	}

	// todo: rename
	add2(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory} = this;
		const control = controlFactory();
		this.add(index, control, options);
	}

	// todo: rename
	addAll2(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const {controlFactory} = this;
		const controls = Array.from({length: count}, () => controlFactory());
		this.addAll(index, controls, options);
	}

	// todo: rename
	llaelqfh(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const currentCount = this.controls.length;
		this.addAll2(currentCount, count - currentCount, options);
	}

	// todo: rename
	rxsigtut(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		this.llaelqfh(count, options);
		this.kbninfzq(count, options);
	}
}
