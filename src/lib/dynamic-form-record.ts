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
}
