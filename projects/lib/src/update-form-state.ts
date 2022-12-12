import {AbstractControl} from '@angular/forms';

import {isAncestorOf, isDescendantOf} from './control-hacks';

// todo: rename
export class Raqkxkuc<TControl extends AbstractControl> {
	constructor(readonly control: TControl) {}

	disabled = this.control.disabled;

	get enabled(): boolean {
		return !this.disabled;
	}

	set enabled(v: boolean) {
		this.disabled = !v;
	}
}

// todo: rename
export interface Zyggsdzi {
	<TControl extends AbstractControl>(control: TControl): Raqkxkuc<TControl>;
}

export function updateFormState(
	control: AbstractControl,
	fn: (wrap: Zyggsdzi) => void,
): void {
	// todo: rename wweltkgv, culrkwmp, whevuusi, pzzpdgeq
	const wweltkgv = new Map<AbstractControl, Raqkxkuc<AbstractControl>>();
	let changed = false;
	fn((control) => {
		if (wweltkgv.has(control)) {
			return wweltkgv.get(control) as any;
		}
		const culrkwmp = new Raqkxkuc(control);
		wweltkgv.set(control, culrkwmp);
		return culrkwmp;
	});
	wweltkgv.forEach((whevuusi) => {
		if (whevuusi.disabled) {
			wweltkgv.forEach((pzzpdgeq) => {
				if (whevuusi !== pzzpdgeq) {
					if (isAncestorOf(whevuusi.control, pzzpdgeq.control)) {
						wweltkgv.delete(pzzpdgeq.control);
					}
				}
			});
		}
	});
	wweltkgv.forEach((whevuusi) => {
		if (whevuusi.enabled) {
			wweltkgv.forEach((pzzpdgeq) => {
				if (whevuusi !== pzzpdgeq) {
					if (isDescendantOf(whevuusi.control, pzzpdgeq.control)) {
						wweltkgv.delete(pzzpdgeq.control);
					}
				}
			});
		}
	});
	wweltkgv.forEach((culrkwmp) => {
		const {control} = culrkwmp;
		if (culrkwmp.disabled) {
			if (control.enabled) {
				control.disable({emitEvent: false});
				if (control.disabled) {
					changed = true;
				}
			}
		} else {
			if (control.disabled) {
				control.enable({emitEvent: false});
				if (control.enabled) {
					changed = true;
				}
			}
		}
	});
	if (changed) {
		control.updateValueAndValidity();
	}
}
