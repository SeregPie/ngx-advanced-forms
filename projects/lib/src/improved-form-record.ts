import {AbstractControl, FormRecord} from '@angular/forms';

import {triggerCollectionChange} from './control-hacks';

export class ImprovedFormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
	protected needsUpdate: boolean = false;

	protected collectionChanged: boolean = false;

	hasControl(name: string): boolean {
		return this.controls[name] != null;
	}

	clear(
		options?: Partial<{
			emitEvent: boolean;
		}>,
	): void {
		throw 'not implemeted yet';
	}

	protected flushChanges({
		emitEvent = true,
	}: Partial<{
		emitEvent: boolean;
	}> = {}): void {
		if (this.needsUpdate) {
			this.needsUpdate = false;
			this.updateValueAndValidity({emitEvent});
		}
		if (this.collectionChanged) {
			this.collectionChanged = false;
			triggerCollectionChange(this);
		}
	}
}
