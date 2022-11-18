import {
	AbstractControl,
	AbstractControlOptions,
	FormArray,
	ɵRawValue,
} from '@angular/forms';

import {
	registerControl,
	triggerCollectionChange,
	unregisterControl,
} from './control-hacks';

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
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: push
	addLast2(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	addLastAll2(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	add2(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.insert(index, control, options);
	}

	// todo: rename
	addAll2(
		index: number,
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	ensure(
		count: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}
}
