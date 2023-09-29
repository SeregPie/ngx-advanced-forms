import {Injectable, OnDestroy, Provider, inject, signal} from '@angular/core';
import {
	AsyncValidator,
	ControlValueAccessor,
	NG_ASYNC_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
} from '@angular/forms';
import {
	BehaviorSubject,
	Observable,
	Subscription,
	distinctUntilChanged,
	filter,
	of,
	skip,
	tap,
} from 'rxjs';

describe('', () => {});

export const SxixgkkqProvider: Provider = [
	this,
	Lbtrqpyk,
	{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: Lbtrqpyk,
	},
	{
		provide: NG_ASYNC_VALIDATORS,
		multi: true,
		useExisting: Lbtrqpyk,
	},
];

export interface Sxixgkkq<TValue = any> {
	get value(): TValue;
	set value(v: TValue);

	get disabled(): boolean;

	get errors(): null | ValidationErrors;
	set errors(v: null | ValidationErrors);

	get pending(): boolean;
	set pending(v: boolean);

	get touched(): boolean;

	touch(): void;
}

export function useSxixgkkq<TValue>(): Sxixgkkq<TValue> {
	let value$ = signal<TValue>(null as any);
	let disabled$ = signal<boolean>(false);
	let errors$ = signal<null | ValidationErrors>(null);
	let pending$ = signal<boolean>(false);
	let touched$ = signal<boolean>(false);
	return {
		get value() {
			return value$();
		},
		set value(v) {
			value$.set(v);
		},

		get disabled() {
			return disabled$();
		},

		get errors() {
			return errors$();
		},
		set errors(v) {
			errors$.set(v);
		},

		get pending() {
			return pending$();
		},
		set pending(v) {
			pending$.set(v);
		},

		get touched() {
			return touched$();
		},

		touch() {
			touched$.set(true);
		},
	};
}

@Injectable()
class Lbtrqpyk<TValue>
	implements AsyncValidator, ControlValueAccessor, OnDestroy
{
	constructor() {}

	_value = new BehaviorSubject<TValue>(undefined as any);

	_disabled = new BehaviorSubject<boolean>(false);

	_errors = new BehaviorSubject<null | ValidationErrors>(null);

	_pending = new BehaviorSubject<boolean>(false);

	_touched = new BehaviorSubject<boolean>(false);

	#kcjqxkev = this._value.value;

	writeValue(value: TValue): void {
		this.#kcjqxkev = value;
		this._value.next(value);
	}

	#onChange = this._value.pipe(skip(1)).pipe(
		filter((value) => value !== this.#kcjqxkev),
		tap((value) => {
			this.#kcjqxkev = value;
		}),
	);

	#onChangeSubscription = Subscription.EMPTY;

	registerOnChange(fn: {(value: TValue): void}): void {
		if (!this.#subscription.closed) {
			this.#onChangeSubscription.unsubscribe();
			this.#onChangeSubscription = this.#onChange.subscribe(fn);
			this.#subscription.add(this.#onChangeSubscription);
		}
	}

	setDisabledState(disabled): void {
		this._disabled.next(disabled);
	}

	validate(): Observable<null | ValidationErrors> {
		return of(null);
	}

	registerOnValidatorChange(): void {}

	registerOnTouched(): void {}

	#subscription = new Subscription();

	ngOnDestroy(): void {
		this.#subscription.unsubscribe();
	}
}

@Injectable()
// todo: rename
export class FormControlService<TValue = any> {
	constructor() {}

	#lbtrqpyk = inject<Lbtrqpyk<TValue>>(Lbtrqpyk);

	#value = this.#lbtrqpyk._value;

	get value(): TValue {
		return this.#value.value;
	}
	set value(v: TValue) {
		if (this.#value.value !== v) {
			this.#value.next(v);
		}
	}

	get valueChanges(): Observable<TValue> {
		return this.#value.pipe(skip(1));
	}

	#disabled = this.#lbtrqpyk._disabled;

	get disabled(): boolean {
		return this.#disabled.value;
	}

	get disabledChanges(): Observable<boolean> {
		return this.#disabled.pipe(skip(1));
	}

	#errors = this.#lbtrqpyk._errors;

	get errors(): null | ValidationErrors {
		return this.#errors.value;
	}
	set errors(v: null | ValidationErrors) {
		this.#errors.next(v);
	}

	get errorsChanges(): Observable<null | ValidationErrors> {
		return this.#errors.pipe(skip(1));
	}

	#pending = this.#lbtrqpyk._pending;

	get pending(): boolean {
		return this.#pending.value;
	}
	set pending(v: boolean) {
		this.#pending.next(v);
	}

	get pendingChanges(): Observable<boolean> {
		return this.#disabled.pipe(skip(1));
	}

	#touched = this.#lbtrqpyk._touched;

	get touched(): boolean {
		return this.#touched.value;
	}

	get touchedChanges(): Observable<boolean> {
		return this.#touched.pipe(distinctUntilChanged(), skip(1));
	}

	touch(): void {
		this.#touched.next(true);
	}
}
