import {AbstractControl, FormRecord as NativeFormRecord} from '@angular/forms';

export class FormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends NativeFormRecord<TControl> {
	// prettier-ignore
	// todo: rename
	has(name: string): boolean {
		return this.controls[name] != null;
	}

	// todo: rename
	get set() {
		return this.setControl;
	}

	// todo: rename
	setAll(
		controls: Record<string, TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		Object.entries(controls).forEach(([name, control]) => {
			this.set(name, control, options);
		});
		// todo
	}

	// todo: rename
	get remove() {
		return this.removeControl;
	}

	// todo: rename
	removeAll(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		names.forEach((name) => {
			this.remove(name, options);
		});
		// todo
	}

	// todo: rename
	retainAll(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		names.forEach((name) => {
			this.remove(name, options);
		});
		// todo
	}

	clear(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.removeAll(Object.keys(this.controls), options);
		// todo
	}

	// prettier-ignore
	get empty(): boolean {
		return !this.size;
	}

	// prettier-ignore
	get size(): number {
		return Object.keys(this.controls).length;
	}
}
