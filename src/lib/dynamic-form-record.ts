import {
	AbstractControl,
	AbstractControlOptions,
	ɵRawValue,
} from '@angular/forms';

import {FormRecord} from './form-record';

export class DynamicFormRecord<TControl extends AbstractControl = AbstractControl>
	extends FormRecord<TControl>
{
	constructor(
		controlFactory: () => TControl,
		options?: AbstractControlOptions,
	) {
		super({}, options);
		this.#controlFactory = controlFactory;
	}

	#controlFactory: () => TControl;

	get controlFactory(): () => TControl {
		return this.#controlFactory;
	}

	override setValue(value: Record<string, ɵRawValue<TControl>>, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}

	override reset(value: Record<string, ɵRawValue<TControl>> = {}, options?: Partial<{
		onlySelf: boolean;
		emitEvent: boolean;
	}>): void {
		throw 'not implemented yet';
		value;
		options;
	}

	insertCkjwsahkControl(name: string, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const {controlFactory} = this;
		const control = this.controls[name] ?? controlFactory();
		this.insertControl(name, control, options);
	}

	insertHyrcbsklControl(name: string, value: ɵRawValue<TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const {controlFactory} = this;
		const control = this.controls[name] ?? controlFactory();
		control.setValue(value);
		this.insertControl(name, control, options);
	}

	insertCkjwsahkControls(names: Array<string>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const {controlFactory} = this;
		const controls: Record<string, TControl> = {};
		(new Set(names)).forEach((name) => {
			const control = this.controls[name] ?? controlFactory();
			controls[name] = control;
		});
		this.insertControls(controls, options);
	}

	// @deprecated
	hasControl(name: string): boolean {
		return this.controls[name] != null;
	}

	// @deprecated
	addDynamicControl(...args: any): void {
		this.insertCkjwsahkControl(...args);
	}

	// @deprecated
	addDynamicControls(...args: any[]): void {
		this.insertCkjwsahkControls(...args);
	}

	// @deprecated
	setDynamicControls(...args: any): void {

	}

	// @deprecated
	clear(...args: any): void {
		this.clearControls(...args);
	}
}
