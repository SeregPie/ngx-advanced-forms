import {AbstractControl, FormArray, FormRecord} from '@angular/forms';

import {triggerCollectionChange} from './control-hacks';

export class BetterFormArray<TControl extends AbstractControl = AbstractControl> extends FormArray<TControl> {
	// todo: rename
	addLast(
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.push(control, options);
	}

	// todo: rename
	addLastAll(
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	add(
		index: number,
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.insert(index, control, options);
	}

	// todo: rename
	addAll(
		index: number,
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	set(
		index: number,
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.setControl(index, control, options);
	}

	// todo: rename
	remove(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.removeAt(index, options);
	}

	get empty(): boolean {
		return !this.size;
	}

	get size(): number {
		return this.length;
	}
}
