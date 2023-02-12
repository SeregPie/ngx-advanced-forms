import {Injectable, OnDestroy, Provider} from '@angular/core';
import {
	AsyncValidator,
	ControlValueAccessor,
	NG_ASYNC_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
} from '@angular/forms';
import {
	BehaviorSubject,
	filter,
	map,
	merge,
	noop,
	Observable,
	ReplaySubject,
	skip,
	Subject,
	Subscription,
	tap,
} from 'rxjs';

@Injectable()
export class FormControlService<TValue = any>
	implements AsyncValidator, ControlValueAccessor, OnDestroy
{
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useExisting: this,
			},
			{
				provide: NG_ASYNC_VALIDATORS,
				multi: true,
				useExisting: this,
			},
		];
	}

	constructor() {
		this.#value = new BehaviorSubject<null | TValue>(null);
		this.#disabled = new BehaviorSubject<boolean>(false);
		this.#errors = new BehaviorSubject<null | ValidationErrors>(null);
		this.#pending = new BehaviorSubject<boolean>(false);
		this.#asyncErrors = new BehaviorSubject(this.#getAsyncErrors());
		// prettier-ignore
		this.#subscription.add(
			merge(
				this.#pending.pipe(skip(1)),
				this.#errors.pipe(skip(1)),
			).subscribe(() => {
				const v = this.#getAsyncErrors();
				if (this.#asyncErrors.value !== v) {
					this.#asyncErrors.next(v);
				}
			}),
		);
		this.#touch = new Subject<void>();
		this.#outerValue = this.value;
	}

	#value: BehaviorSubject<null | TValue>;

	get value(): null | TValue {
		return this.#value.value;
	}
	set value(v: null | TValue) {
		if (this.#value.value !== v) {
			this.#value.next(v);
		}
	}

	get valueChanges(): Observable<null | TValue> {
		return this.#value.pipe(skip(1));
	}

	#disabled: BehaviorSubject<boolean>;

	#setDisabled(v: boolean): void {
		if (this.#disabled.value !== v) {
			this.#disabled.next(v);
		}
	}

	get disabled(): boolean {
		return this.#disabled.value;
	}

	get disabledChanges(): Observable<boolean> {
		return this.#disabled.pipe(skip(1));
	}

	#errors: BehaviorSubject<null | ValidationErrors>;

	get errors(): null | ValidationErrors {
		return this.#errors.value;
	}
	set errors(v: null | ValidationErrors) {
		if (this.#errors.value !== v) {
			this.#errors.next(v);
		}
	}

	get errorsChanges(): Observable<null | ValidationErrors> {
		return this.#errors.pipe(skip(1));
	}

	#pending: BehaviorSubject<boolean>;

	get pending(): boolean {
		return this.#pending.value;
	}
	set pending(v: boolean) {
		if (this.#pending.value !== v) {
			this.#pending.next(v);
		}
	}

	get pendingChanges(): Observable<boolean> {
		return this.#pending.pipe(skip(1));
	}

	#asyncErrorsSubject: null | Subject<null | ValidationErrors> = null;

	// prettier-ignore
	#getAsyncErrors(): Observable<null | ValidationErrors> {
		// todo?
		const result = (this.#asyncErrorsSubject != null ? this.#asyncErrors.value
			: (this.#asyncErrorsSubject = new ReplaySubject(1)).asObservable()
		);
		if (!this.pending) {
			const subject = this.#asyncErrorsSubject;
			this.#asyncErrorsSubject = null;
			subject.next(this.errors);
			subject.complete();
		}
		return result;
	}

	#asyncErrors: BehaviorSubject<Observable<null | ValidationErrors>>;

	#touch: Subject<void>;

	touch(): void {
		this.#touch.next();
	}

	get touchEvents(): Observable<void> {
		return this.#touch.pipe();
	}

	#outerValue: null | TValue;

	writeValue(value: null | TValue): void {
		this.#outerValue = value;
		this.value = value;
	}

	get #onChange(): Observable<null | TValue> {
		return this.#value.pipe(skip(1)).pipe(
			filter((value) => value !== this.#outerValue),
			tap((value) => {
				this.#outerValue = value;
			}),
		);
	}

	#onChangeSubscription = Subscription.EMPTY;

	registerOnChange(fn: {(value: null | TValue): void}): void {
		if (!this.#subscription.closed) {
			this.#onChangeSubscription.unsubscribe();
			this.#onChangeSubscription = this.#onChange.subscribe(fn);
			this.#subscription.add(this.#onChangeSubscription);
		}
	}

	get #onTouched(): Observable<void> {
		return this.#touch.pipe();
	}

	#onTouchedSubscription = Subscription.EMPTY;

	registerOnTouched(fn: {(): void}): void {
		if (!this.#subscription.closed) {
			this.#onTouchedSubscription.unsubscribe();
			this.#onTouchedSubscription = this.#onTouched.subscribe(fn);
			this.#subscription.add(this.#onTouchedSubscription);
		}
	}

	setDisabledState(disabled: boolean): void {
		this.#setDisabled(disabled);
	}

	validate(): Observable<null | ValidationErrors> {
		return this.#asyncErrors.value;
	}

	get #onValidatorChange(): Observable<void> {
		return this.#asyncErrors.pipe(skip(1)).pipe(map(noop));
	}

	#onValidatorChangeSubscription = Subscription.EMPTY;

	// prettier-ignore
	registerOnValidatorChange(fn: {(): void}): void {
		if (!this.#subscription.closed) {
			this.#onValidatorChangeSubscription.unsubscribe();
			this.#onValidatorChangeSubscription = this.#onValidatorChange.subscribe(fn);
			this.#subscription.add(this.#onValidatorChangeSubscription);
		}
	}

	#subscription = new Subscription();

	ngOnDestroy(): void {
		this.#subscription.unsubscribe();
	}
}
