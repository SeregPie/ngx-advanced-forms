// todo: name file

import {Injectable, OnDestroy, Provider, signal} from '@angular/core';
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
	ReplaySubject,
	Subject,
	Subscription,
	filter,
	map,
	merge,
	noop,
	skip,
	tap,
} from 'rxjs';

@Injectable()
class FormControlService<TValue = any>
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

	constructor() {}

	#value = signal<null | TValue>(null);

	get value(): null | TValue {
		return this.#value();
	}
	set value(v: null | TValue) {
		this.#value.set(v);
	}

	#disabled = signal<boolean>(false);

	get disabled(): boolean {
		return this.#disabled();
	}

	#errors = signal<null | ValidationErrors>(null);

	get errors(): null | ValidationErrors {
		return this.#errors();
	}
	set errors(v: null | ValidationErrors) {
		this.#errors.set(v);
	}

	#pending = signal<boolean>(false);

	get pending(): boolean {
		return this.#pending();
	}
	set pending(v: boolean) {
		this.#pending.set(v);
	}

	// todo: refactor START

	#asyncErrorsSubject: null | Subject<null | ValidationErrors> = null;

	#getAsyncErrors(): Observable<null | ValidationErrors> {
		let result =
			this.#asyncErrorsSubject != null
				? this.#asyncErrors.value
				: (this.#asyncErrorsSubject = new ReplaySubject(1)).asObservable();
		if (!this.pending) {
			let subject = this.#asyncErrorsSubject;
			this.#asyncErrorsSubject = null;
			subject.next(this.errors);
			subject.complete();
		}
		return result;
	}

	#asyncErrors: BehaviorSubject<Observable<null | ValidationErrors>>;

	#updateAsyncErrors(): void {
		let v = this.#getAsyncErrors();
		if (this.#asyncErrors.value !== v) {
			this.#asyncErrors.next(v);
		}
	}

	// todo: rename Worker, Runner, Job
	get #updateAsyncErrorsSubscription(): Subscription {
		return merge(
			this.#pending.pipe(skip(1)),
			this.#errors.pipe(skip(1)),
		).subscribe(() => {
			this.#updateAsyncErrors();
		});
	}

	// todo: refactor END

	#touched = signal<boolean>(false);

	get touched(): boolean {
		return this.#touched();
	}

	touch(): void {
		this.#touched.set(true);
	}

	#outerValue = this.value;

	writeValue(value: null | TValue): void {
		this.#outerValue = value;
		this.#value.set(value);
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
		this.#disabled.set(disabled);
	}

	validate(): Observable<null | ValidationErrors> {
		return this.#asyncErrors.value;
	}

	get #onValidatorChange(): Observable<void> {
		return this.#asyncErrors.pipe(skip(1)).pipe(map(noop));
	}

	#onValidatorChangeSubscription = Subscription.EMPTY;

	registerOnValidatorChange(fn: {(): void}): void {
		if (!this.#subscription.closed) {
			this.#onValidatorChangeSubscription.unsubscribe();
			this.#onValidatorChangeSubscription =
				this.#onValidatorChange.subscribe(fn);
			this.#subscription.add(this.#onValidatorChangeSubscription);
		}
	}

	#subscription = new Subscription();

	ngOnDestroy(): void {
		this.#subscription.unsubscribe();
	}
}

export {FormControlService};
