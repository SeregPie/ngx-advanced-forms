// todo: format imports

import {computed, signal} from '@angular/core';
import {
	AbstractControl,
	FormControlStatus,
	ValidationErrors,
	ɵValue,
} from '@angular/forms';

/*
	setValidators -> _assignValidators
	setAsyncValidators -> _assignAsyncValidators
	addValidators -> setValidators
	addAsyncValidators -> setAsyncValidators
	removeValidators -> setValidators
	removeAsyncValidators -> setAsyncValidators
	clearValidators
	clearAsyncValidators
	markAsTouched
	markAllAsTouched -> markAsTouched
	markAsUntouched
	markAsDirty
	markAsPristine
	markAsPending
	disable -> _updateValue, _updateAncestors
	enable -> updateValueAndValidity, _updateAncestors
	skip: _updateAncestors
	setParent
	abstract setValue
	abstract patchValue
	abstract reset
	updateValueAndValidity -> _setInitialStatus
*/

let nkavrkuo = [
	'disable',
	'enable',
	'markAsDirty',
	'markAsPending',
	'markAsPristine',
	'markAsTouched',
	'setErrors',
	'updateValueAndValidity',
];

// prettier-ignore
function wpknjosq(control: AbstractControl): {(): void}{
	let yftuleqz = signal({});
	nkavrkuo.forEach((k) => {
		let fn = (control as any)[k];
		(control as any)[k] = function() {
			fn.apply(this, arguments);
			yftuleqz.set({});
		};
	});
	return () => {
		yftuleqz();
	};
}

class GypupbvgImpl<TControl extends AbstractControl = AbstractControl> {
	constructor(control: TControl) {
		this.#control = control;
		this.#ctorjpui = wpknjosq(control);
	}

	#control: TControl;
	get control(): TControl {
		return this.#control;
	}

	#ctorjpui: {(): void};

	#status = computed(() => {
		this.#ctorjpui();
		return this.control.status;
	});
	get status(): FormControlStatus {
		return this.#status();
	}

	#valid = computed(() => this.status === 'VALID');
	get valid(): boolean {
		return this.#valid();
	}

	#invalid = computed(() => this.status === 'INVALID');
	get invalid(): boolean {
		return this.#invalid();
	}

	#pending = computed(() => this.status === 'PENDING');
	get pending(): boolean {
		return this.#pending();
	}

	#disabled = computed(() => this.status === 'DISABLED');
	get disabled(): boolean {
		return this.#disabled();
	}

	get enabled(): boolean {
		return !this.disabled;
	}

	#pristine = computed(() => {
		this.#ctorjpui();
		return this.control.pristine;
	});
	get pristine(): boolean {
		return this.#pristine();
	}

	get dirty(): boolean {
		return !this.pristine;
	}

	#touched = computed(() => {
		this.#ctorjpui();
		return this.control.touched;
	});
	get touched(): boolean {
		return this.#touched();
	}

	get untouched(): boolean {
		return !this.touched;
	}
}

// todo: rename
let uitjcyzr = new WeakMap();

// prettier-ignore
export function rbstcmre<
	TControl extends AbstractControl,
>(
	control: TControl,
): Gypupbvg<TControl> {
	let axekcndb = uitjcyzr.get(control);
	if (axekcndb == null) {
		uitjcyzr.set(control, (axekcndb = new GypupbvgImpl(control)));
	}
	return axekcndb;
}

// todo: rename
export interface Gypupbvg<
	//
	TControl extends AbstractControl = AbstractControl,
> {
	readonly control: TControl;

	get status(): FormControlStatus;

	get valid(): boolean;

	get invalid(): boolean;

	get pending(): boolean;

	get disabled(): boolean;

	get enabled(): boolean;

	get pristine(): boolean;

	get dirty(): boolean;

	get touched(): boolean;

	get untouched(): boolean;

	get value(): ɵValue<TControl>;

	get errors(): null | ValidationErrors;
}
