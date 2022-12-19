import {AbstractControl, FormArray as NativeFormArray} from '@angular/forms';

export class FormArray<
	TControl extends AbstractControl = AbstractControl,
> extends NativeFormArray<TControl> {
	// todo: rename
	get addLast() {
		return this.push;
	}

	// todo: rename
	addLastAll(
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		controls.forEach((control) => {
			this.addLast(control, options);
		});
		// todo
	}

	// todo: rename
	get add() {
		return this.insert;
	}

	// todo: rename
	addAll(
		index: number,
		controls: Array<TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		controls.forEach((control) => {
			this.add(index++, control, options);
		});
		// todo
	}

	// todo: rename
	get set() {
		return this.setControl;
	}

	// todo: rename
	get remove() {
		return this.removeAt;
	}

	// todo: rename
	kbninfzq(
		index: number,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// prettier-ignore
	get empty(): boolean {
		return !this.size;
	}

	// prettier-ignore
	get size(): number {
		return this.length;
	}
}
