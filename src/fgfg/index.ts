import {
	Injectable,
	InjectionToken,
	OnDestroy,
	Provider,
	inject,
} from '@angular/core';
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
	Subject,
	Subscription,
	combineLatest,
	distinctUntilChanged,
	filter,
	map,
	noop,
	skip,
	tap,
} from 'rxjs';

let gpabpuek = new InjectionToken<any>('');

let ejrnwfuj = Object.create(null);

@Injectable()
export class FormControlService<TValue = any>
	implements AsyncValidator, ControlValueAccessor, OnDestroy
{
	static provide<TValue>({
		initialValue = ejrnwfuj,
	}: Partial<{
		initialValue: TValue;
	}> = {}): Provider {
		return [
			{
				provide: gpabpuek,
				useValue: initialValue,
			},
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
		this.#subscription.add(
			combineLatest([this.#pending, this.#errors])
				.pipe(
					(() => {
						let oytfqpxl: Subject<null | ValidationErrors>;
						return map(([pending, errors]) => {
							if (oytfqpxl == null) {
								oytfqpxl = new Subject();
							}
							if (!pending) {
								oytfqpxl.next(errors);
								oytfqpxl.complete();
								oytfqpxl = null;
							}
							return oytfqpxl;
						});
					})(),
				)
				.pipe(
					distinctUntilChanged(),
					map((v) => v.asObservable()),
				)
				.subscribe((v) => {
					this.#wxlsinud.next(v);
				}),
		);
	}

	#value = new BehaviorSubject<TValue>(inject(gpabpuek));

	#setValue(v: TValue): void {
		if (this.#value.value !== v) {
			this.#value.next(v);
		}
	}

	get value(): TValue {
		let v = this.#value.value;
		if (v === ejrnwfuj) {
			throw new Error('??? not yet initialized.');
		}
		return v;
	}
	set value(v: TValue) {
		this.#setValue(v);
	}

	get valueChanges(): Observable<TValue> {
		return this.#value.pipe(skip(1));
	}

	#disabled = new BehaviorSubject<boolean>(false);

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

	#errors = new BehaviorSubject<null | ValidationErrors>(null);

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

	#pending = new BehaviorSubject<boolean>(false);

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

	// prettier-ignore
	#wxlsinud = new BehaviorSubject<Observable<null | ValidationErrors>>(undefined as any);

	#touch = new Subject<void>();

	touch(): void {
		this.#touch.next();
	}

	get touchEvents(): Observable<void> {
		return this.#touch.pipe();
	}

	#outerValue = this.value;

	writeValue(value: TValue): void {
		this.#outerValue = value;
		this.#setValue(value);
	}

	#onChange = this.#value.pipe(skip(1)).pipe(
		filter((value) => value !== this.#outerValue),
		tap((value) => {
			this.#outerValue = value;
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

	#onTouched = this.#touch.pipe();

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
		return this.#wxlsinud.value;
	}

	#onValidatorChange = this.#wxlsinud.pipe(skip(1)).pipe(map(noop));

	#onValidatorChangeSubscription = Subscription.EMPTY;

	registerOnValidatorChange(fn: {(): void}): void {
		if (!this.#subscription.closed) {
			this.#onValidatorChangeSubscription.unsubscribe();
			// prettier-ignore
			this.#onValidatorChangeSubscription = this.#onValidatorChange.subscribe(fn);
			this.#subscription.add(this.#onValidatorChangeSubscription);
		}
	}

	#subscription = new Subscription();

	ngOnDestroy(): void {
		this.#subscription.unsubscribe();
	}
}
// 230
