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
	combineLatest,
	EMPTY,
	noop,
	Observable,
	of,
	Subject,
	Subscription,
} from 'rxjs';
import {filter, map, skip, tap} from 'rxjs/operators';

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
		let qbadbtoo$: null | Subject<null | ValidationErrors> = null;
		combineLatest({
			errors: this.errors$,
			pending: this.pending$,
		}).subscribe(({errors, pending}) => {
			if (pending) {
				if (qbadbtoo$ == null) {
					qbadbtoo$ = new Subject();
					this.xxnccupe$.next(qbadbtoo$);
				}
			} else {
				if (qbadbtoo$ == null) {
					this.xxnccupe$.next(of(errors));
				} else {
					qbadbtoo$.next(errors);
					qbadbtoo$.complete();
					qbadbtoo$ = null;
				}
			}
		});
	}

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

	private readonly xxnccupe$ = new BehaviorSubject<
		Observable<null | ValidationErrors>
	>(EMPTY);

	private readonly touch$ = new Subject<void>();

	readonly touchEvents = this.touch$.pipe();

	touch(): void {
		this.touch$.next();
	}

	private mjmhyekm = this.value;

	writeValue(value: null | TValue): void {
		this.mjmhyekm = value;
		this.value = value;
	}

	private get onChange(): Observable<null | TValue> {
		// todo: implement
		return this.valueChanges.pipe(
			filter((value) => value !== this.mjmhyekm),
			tap(() => {
				console.log('FormControlService.onChange');
			}),
		);
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
		return this.touchEvents;
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
		return this.xxnccupe$.value;
	}

	private get onValidatorChange(): Observable<void> {
		return this.xxnccupe$.pipe(
			skip(1),
			map(noop),
			tap(() => {
				console.log('FormControlService.onValidatorChange');
			}),
		);
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
