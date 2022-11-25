import {AbstractControl, FormRecord} from '@angular/forms';

export class BetterFormRecord<TControl extends AbstractControl = AbstractControl> extends FormRecord<TControl> {
	// todo: rename
	has(name: string): boolean {
		return this.controls[name] != null;
	}

	// todo: rename
	set(
		name: string,
		control: TControl,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.setControl(name, control, options);
	}

	// todo: rename
	setAll(
		controls: Record<string, TControl>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	// todo: rename
	remove(
		name: string,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		this.removeControl(name, options);
	}

	// todo: rename
	removeAll(
		names: Array<string>,
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	clear(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		// todo: implement
		throw 'not implemented yet';
	}

	get empty(): boolean {
		return !this.size;
	}

	get size(): number {
		return Object.keys(this.controls).length;
	}
}
