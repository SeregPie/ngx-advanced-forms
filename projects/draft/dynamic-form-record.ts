import {
	AbstractControl,
	AbstractControlOptions,
	FormRecord,
	ɵRawValue,
} from '@angular/forms';
import {
	registerControl,
	triggerCollectionChange,
	unregisterControl,
} from './control-hacks';

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
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	ensure(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	ensureAll(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	ensure(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}
}
