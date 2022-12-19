import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormRecord} from './form-record';

export class DynamicFormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
	constructor(
		public readonly controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super({}, options);
	}

	override setValue(
		value: Record<string, ɵRawValue<TControl>>,
		options?: Partial<{
			onlySelf: boolean;
			emitEvent: boolean;
		}>,
	): void {
		const names = Object.keys(value);
		this.hpjprvfa(names);
		super.setValue(value, options);
		// todo
	}

	// todo: rename
	ensure(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const currentControls = this.controls;
		const {controlFactory} = this;
		const control = currentControls[name] ?? controlFactory();
		this.set(name, control, options);
	}

	// todo: rename
	ensureAll(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo?
		const currentControls = this.controls;
		const {controlFactory} = this;
		const controls = Object.fromEntries(
			names.map((name) => [name, currentControls[name] ?? controlFactory()]),
		);
		this.setAll(controls, options);
	}

	// todo: rename
	hpjprvfa(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.ensureAll(names, options);
		this.retainAll(names, options);
	}
}
