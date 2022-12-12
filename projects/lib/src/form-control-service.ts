import {Injectable, OnDestroy, Provider} from '@angular/core';
import {
	AsyncValidator,
	ControlValueAccessor,
	NG_ASYNC_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
} from '@angular/forms';
import {BehaviorSubject, EMPTY, Observable, Subscription} from 'rxjs';
import {skip} from 'rxjs/operators';

@Injectable()
export class FormControlService<TValue = any>
	implements AsyncValidator, ControlValueAccessor, OnDestroy
{
	static provide(): Provider {
		return [
			this,
			{
				multi: true,
				provide: NG_VALUE_ACCESSOR,
				useExisting: this,
			},
			{
				multi: true,
				provide: NG_ASYNC_VALIDATORS,
				useExisting: this,
			},
		];
	}

	constructor() {}

	private readonly value$ = new BehaviorSubject<null | TValue>(null);

	readonly valueChanges = this.value$.pipe(skip(1));

	get value(): null | TValue {
		return this.value$.value;
	}
	set value(v: null | TValue) {
		if (this.value$.value !== v) {
			this.value$.next(v);
		}
	}

	private readonly errors$ = new BehaviorSubject<null | ValidationErrors>(null);

	readonly errorsChanges = this.errors$.pipe(skip(1));

	get errors(): null | ValidationErrors {
		return this.errors$.value;
	}
	set errors(v: null | ValidationErrors) {
		if (this.errors$.value !== v) {
			this.errors$.next(v);
		}
	}

	private readonly disabled$ = new BehaviorSubject<boolean>(false);

	readonly disabledChanges = this.disabled$.pipe(skip(1));

	get disabled(): boolean {
		return this.disabled$.value;
	}
	set disabled(v: boolean) {
		if (this.disabled$.value !== v) {
			this.disabled$.next(v);
		}
	}

	private readonly pending$ = new BehaviorSubject<boolean>(false);

	readonly pendingChanges = this.pending$.pipe(skip(1));

	get pending(): boolean {
		return this.pending$.value;
	}
	set pending(v: boolean) {
		if (this.pending$.value !== v) {
			this.pending$.next(v);
		}
	}

	touch(): void {
		// todo: implement
	}

	writeValue(value: null | TValue): void {
		this.value = value;
	}

	private get onChange(): Observable<null | TValue> {
		// todo: implement
		return this.valueChanges;
	}

	private onChangeSubscription = Subscription.EMPTY;

	registerOnChange(fn: (v: null | TValue) => void): void {
		if (!this.subscription.closed) {
			this.onChangeSubscription.unsubscribe();
			this.onChangeSubscription = this.onChange.subscribe(fn);
			this.subscription.add(this.onChangeSubscription);
		}
	}

	private get onTouched(): Observable<void> {
		// todo: implement
		return EMPTY;
	}

	private onTouchedSubscription = Subscription.EMPTY;

	registerOnTouched(fn: () => void): void {
		if (!this.subscription.closed) {
			this.onTouchedSubscription.unsubscribe();
			this.onTouchedSubscription = this.onTouched.subscribe(fn);
			this.subscription.add(this.onTouchedSubscription);
		}
	}

	setDisabledState(disabled: boolean): void {
		this.disabled = disabled;
	}

	validate(): Observable<null | ValidationErrors> {
		// todo: implement
		return EMPTY;
	}

	private get onValidatorChange(): Observable<void> {
		// todo: implement
		return EMPTY;
	}

	private onValidatorChangeSubscription = Subscription.EMPTY;

	registerOnValidatorChange(fn: () => void): void {
		if (!this.subscription.closed) {
			this.onValidatorChangeSubscription.unsubscribe();
			this.onValidatorChangeSubscription = this.onValidatorChange.subscribe(fn);
			this.subscription.add(this.onValidatorChangeSubscription);
		}
	}

	private readonly subscription = new Subscription();

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
