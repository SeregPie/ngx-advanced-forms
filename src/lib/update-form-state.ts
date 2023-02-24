import {AbstractControl} from '@angular/forms';

import {ControlStateAccessor} from './control-state-accessor';
import {CreateControlStateAccessorFn} from './create-control-state-accessor';

export function updateFormState<TControl extends AbstractControl>(
	control: TControl,
	fn: {(wrap: CreateControlStateAccessorFn): void},
): void {
	class ItemProxy<TControl extends AbstractControl = AbstractControl>
		implements ControlStateAccessor<TControl>
	{
		constructor(data: ItemData<TControl>) {
			this.#data = data;
		}

		#data: ItemData<TControl>;

		get control(): TControl {
			return this.#data.control;
		}

		get disabled(): boolean {
			const ref = this.#data.disabledRef;
			return ref ? ref.v : this.control.disabled;
		}
		set disabled(v: boolean) {
			this.#data.disabledRef = {v};
		}

		get enabled(): boolean {
			return !this.disabled;
		}
		set enabled(v: boolean) {
			this.disabled = !v;
		}
	}

	class ItemData<TControl extends AbstractControl = AbstractControl> {
		constructor(control: TControl) {
			this.control = control;
			this.proxy = new ItemProxy<TControl>(this);
		}

		control: TControl;

		disabledRef?: {v: boolean};

		proxy: ControlStateAccessor<TControl>;

		children = new Set<ItemData>();
	}

	const instances = new WeakMap();

	function wrap<TControl extends AbstractControl>(
		control: TControl,
	): ItemData<TControl> {
		if (instances.has(control)) {
			return instances.get(control);
		}
		const instance = new ItemData(control);
		instances.set(control, instance);
		{
			if (control.parent != null) {
				wrap(control.parent).children.add(instance);
			}
		}
		return instance;
	}

	fn((control) => wrap(control).proxy);

	function commit(data: ItemData): boolean {
		const {control} = data;
		if (data.disabledRef) {
			if (data.disabledRef.v) {
				if (control.enabled) {
					control.disable({emitEvent: false});
					return control.disabled;
				}
				return false;
			}
			if (control.disabled) {
				control.enable({emitEvent: false});
				data.children.forEach((item) => {
					commit(item);
				});
				return control.enabled;
			}
		}
		let changed = false;
		data.children.forEach((item) => {
			if (commit(item)) {
				changed = true;
			}
		});
		return changed;
	}

	if (commit(wrap(control))) {
		control.updateValueAndValidity();
	}
}
