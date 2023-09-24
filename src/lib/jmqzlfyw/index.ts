import {Injectable, OnDestroy, Provider, inject} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	AsyncValidator,
	ControlContainer,
	ControlValueAccessor,
	NG_ASYNC_VALIDATORS,
	NG_VALUE_ACCESSOR,
	NgControl,
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

// prettier-ignore
export class NoopValueAccessor
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}

// prettier-ignore
@Injectable()
export class ControlFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useClass: NoopValueAccessor,
			},
		];
	}

	constructor() {}

	#controlDirective = (
		inject(ControlContainer, {
			optional: true,
			self: true,
		}) ??
		inject(NgControl, {
			optional: true,
			self: true,
		}) ??
		null
	);

	get controlDirective(): null | AbstractControlDirective {
		return this.#controlDirective;
	}

	get control(): null | AbstractControl {
		return this.#controlDirective?.control ?? null;
	}
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
	static provide(): Provider {
		// todo
		return [
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
	}

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
