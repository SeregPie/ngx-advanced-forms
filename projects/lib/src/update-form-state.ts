import {AbstractControl} from '@angular/forms';

// todo: rename
export interface Raqkxkuc<TControl extends AbstractControl> {
	readonly control: TControl;

	disabled: boolean;

	enabled: boolean;
}

// todo: rename
export interface Zyggsdzi {
	<TControl extends AbstractControl>(control: TControl): Raqkxkuc<TControl>;
}

class Wwhquhvs<TControl extends AbstractControl> {
	constructor(readonly control: TControl) {}

	itabxwak = new Fvwdslpy<TControl>(this);

	disabled: boolean = this.control.disabled;

	children: Array<Wwhquhvs<AbstractControl>> = [];
}

class Fvwdslpy<TControl extends AbstractControl> implements Raqkxkuc<TControl> {
	constructor(readonly wwwhquhvs: Wwhquhvs<TControl>) {}

	get control(): TControl {
		return this.wwwhquhvs.control;
	}

	get disabled(): boolean {
		return this.wwwhquhvs.disabled;
	}
	set disabled(v: boolean) {
		this.wwwhquhvs.disabled = v;
	}

	get enabled(): boolean {
		return !this.disabled;
	}
	set enabled(v: boolean) {
		this.disabled = !v;
	}
}

export function updateFormState(
	control: AbstractControl,
	fn: (wrap: Zyggsdzi) => void,
): void {
	control;
	fn;
	// todo
	/*interface Wwhquhvs<TControl extends AbstractControl> {
		control: TControl;
		kaablbon: boolean;
		itabxwak: Raqkxkuc<TControl>;
		disabled: boolean;
		children: Array<Wwhquhvs<AbstractControl>>;
	}
	const wweltkgv = new Map<AbstractControl, Wwhquhvs<AbstractControl>>();
	const miohiqrw = (otherControl: AbstractControl): boolean => {
		let x: null | AbstractControl = otherControl;
		do {
			if (x === control) {
				return true;
			}
		} while ((x = x.parent));
		return false;
	};
	const tnhyhhzs = <TControl extends AbstractControl>(
		control: TControl,
	): Wwhquhvs<TControl> => {
		if (wweltkgv.has(control)) {
			return wweltkgv.get(control) as Wwhquhvs<TControl>;
		}
		const hwznxzvo: Wwhquhvs<TControl> = {
			control,
			itabxwak: {
				get control() {
					return control;
				},
				get disabled() {
					return hwznxzvo.disabled;
				},
				set disabled(v) {
					hwznxzvo.disabled = v;
				},
				get enabled() {
					return !hwznxzvo.disabled;
				},
				set enabled(v) {
					hwznxzvo.disabled = !v;
				},
			},
			disabled: control.disabled,
			children: [],
		};
		wweltkgv.set(control, hwznxzvo);
		if (control.parent) {
			tnhyhhzs(control.parent).children.push(hwznxzvo);
		}
		return hwznxzvo;
	};
	const hwznxzvo = tnhyhhzs(control);
	fn((control) => tnhyhhzs(control).itabxwak);
	const qyiozgmz = (hwznxzvo: Wwhquhvs<AbstractControl>): boolean => {
		let changed = false;
		const {control} = hwznxzvo;
		if (hwznxzvo.disabled) {
			if (hwznxzvo.kaablbon) {
				if (control.enabled) {
					control.disable({emitEvent: false});
					if (control.disabled) {
						changed = true;
					}
				}
			}
		} else {
			if (hwznxzvo.kaablbon) {
				if (control.disabled) {
					control.enable({emitEvent: false});
					if (control.enabled) {
						changed = true;
					}
				}
			}
			hwznxzvo.children.forEach((hwznxzvo) => {
				if (qyiozgmz(hwznxzvo)) {
					changed = true;
				}
			});
		}
		return changed;
	};
	if (qyiozgmz(hwznxzvo)) {
		control.updateValueAndValidity();
	}*/
}
