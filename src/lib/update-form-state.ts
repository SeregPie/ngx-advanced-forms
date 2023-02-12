import {AbstractControl} from '@angular/forms';

import {AbstractControlStateAccessor} from './abstract-control-state-accessor';
import {CreateControlStateAccessorFn} from './create-control-state-accessor';

// todo: rename Olimiwfg, olimiwfg, kaablbon, parentThis, Nlizdvul

export const updateFormState: {
	<TControl extends AbstractControl>(
		control: TControl,
		fn: {(wrap: CreateControlStateAccessorFn): void},
	): void;
} = (control, fn) => {
	// todo

	class Nlizdvul<
		TControl extends AbstractControl,
	> extends AbstractControlStateAccessor<TControl> {
		constructor(private readonly parentThis: Olimiwfg<TControl>) {
			super(parentThis.control);
		}

		get disabled(): boolean {
			if (this.parentThis.kaablbon) {
				return this.parentThis.disabled;
			}
			return this.control.disabled;
		}
		set disabled(v: boolean) {
			this.parentThis.kaablbon = true;
			this.parentThis.disabled = v;
		}
	}

	class Olimiwfg<TControl extends AbstractControl> {
		constructor(public control: TControl) {}

		proxy = new Nlizdvul<TControl>(this);

		kaablbon: boolean = false;

		disabled: boolean = false;

		children = new Set<Olimiwfg<AbstractControl>>();
	}

	const instances = new Map();
	function wrap<TControl extends AbstractControl>(
		control: TControl,
	): Olimiwfg<TControl> {
		if (instances.has(control)) {
			return instances.get(control);
		}
		const instance = new Olimiwfg(control);
		instances.set(control, instance);
		if (control.parent) {
			wrap(control.parent).children.add(instance);
		}
		return instance;
	}

	fn((control) => wrap(control).proxy);

	function commit(olimiwfg: Olimiwfg<AbstractControl>): boolean {
		const {control} = olimiwfg;
		let isChanged = () => false;
		if (olimiwfg.disabled) {
			if (olimiwfg.kaablbon) {
				if (control.enabled) {
					control.disable({emitEvent: false});
					isChanged = () => control.disabled;
				}
			}
		} else {
			if (olimiwfg.kaablbon) {
				if (control.disabled) {
					control.enable({emitEvent: false});
					isChanged = () => control.enabled;
				}
			}
			olimiwfg.children.forEach((olimiwfg) => {
				if (commit(olimiwfg)) {
					isChanged = () => true;
				}
			});
		}
		return isChanged();
	}
	if (commit(wrap(control))) {
		control.updateValueAndValidity();
	}
};
