import {
	EventEmitter,
	Injectable,
	OnDestroy,
	Optional,
	Provider,
	Self,
	computed,
	inject,
	signal,
} from '@angular/core';
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

export class NoopControlValueAccessor
	implements ControlValueAccessor
{
	writeValue() {}

	registerOnChange() {}

	registerOnTouched() {}
}

@Injectable()
export class FormFallthroughService {
	static provide(): Provider {
		return [
			this,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useClass: NoopControlValueAccessor,
			},
		];
	}

	constructor(
		@Self()
		@Optional()
		controlContainer?: ControlContainer,

		@Self()
		@Optional()
		ngControl?: NgControl,
	) {
		this.#controlDirective = controlContainer ?? ngControl ?? null;
	}

	#controlDirective: null | AbstractControlDirective;

	get controlDirective(): null | AbstractControlDirective {
		return this.#controlDirective;
	}

	get control(): null | AbstractControl {
		return this.#controlDirective?.control ?? null;
	}
}

/*
let EMPTY_VALUE: any = {};

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

	constructor() {}

	get value(): TValue {
		let v = this.#value();
		if (v === EMPTY_VALUE) {
			throw '';
		}
		return v;
	}
	set value(v: TValue) {
		this.#value.set(v);
	}
	#value = signal<TValue>(EMPTY_VALUE);

	get disabled(): boolean {
		return this.#disabled();
	}
	#disabled = signal<boolean>(false);

	get errors(): null | ValidationErrors {
		return this.#errors();
	}
	set errors(v: null | ValidationErrors) {
		this.#errors.set(v);
	}
	#errors = signal<null | ValidationErrors>(null);

	get pending(): boolean {
		return this.#pending();
	}
	set pending(v: boolean) {
		this.#pending.set(v);
	}
	#pending = signal<boolean>(false);


	#asyncErrorsSubject: null | Subject<null | ValidationErrors> = null;

	#getAsyncErrors(): Observable<null | ValidationErrors> {
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

	#errorsAsync = computed<>(() => {

	});

	#updateAsyncErrors(): void {
		const v = this.#getAsyncErrors();
		if (this.#asyncErrors.value !== v) {
			this.#asyncErrors.next(v);
		}
	}

	get #updateAsyncErrorsSubscription(): Subscription {
		return merge(
			this.#pending.pipe(skip(1)),
			this.#errors.pipe(skip(1)),
		).subscribe(() => {
			this.#updateAsyncErrors();
		});
	}

	#touch = new EventEmitter<void>();

	touch(): void {
		this.#touch.next();
	}

	get touchEvents(): Observable<void> {
		return this.#touch.pipe();
	}

	#outerValue = this.value;

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
		if (!this.#touch.subscribe) {
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
*/
