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
	merge,
	noop,
	Observable,
	ReplaySubject,
	Subject,
	Subscription,
} from 'rxjs';
import {
	distinctUntilChanged,
	filter,
	map,
	share,
	skip,
	startWith,
} from 'rxjs/operators';

// todo: rename
@Injectable()
class Ahqdhiyg<TValue>
	implements AsyncValidator, ControlValueAccessor, OnDestroy
{
	constructor(private readonly parent: FormControlService<TValue>) {}

	/*
	constructor() {
		// todo
		let qbadbtoo$: null | Subject<null | ValidationErrors> = null;
		combineLatest({
			errors: this.errors$,
			pending: this.pending$,
		}).subscribe(({errors, pending}) => {
			console.log('trigger qbadbtoo');
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
*/

	private value = this.parent.value;

	writeValue(value: null | TValue): void {
		this.value = value;
		this.parent.value = value;
	}

	private get onChange(): Observable<null | TValue> {
		return this.parent.valueChanges.pipe(
			filter((value) => value !== this.value),
		);
	}

	private onChangeSubscription = Subscription.EMPTY;

	registerOnChange(fn: (value: null | TValue) => void): void {
		if (!this.subscription.closed) {
			this.onChangeSubscription.unsubscribe();
			this.onChangeSubscription = this.onChange.subscribe(fn);
			this.subscription.add(this.onChangeSubscription);
		}
	}

	private get onTouched(): Observable<void> {
		return this.parent.touchEvents;
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
		this.parent.disabled = disabled;
	}

	validate(): Observable<null | ValidationErrors> {
		return this.parent.xxnccupe;
	}

	private get onValidatorChange(): Observable<void> {
		return this.parent.xxnccupeChanges.pipe(map(noop));
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

@Injectable()
export class FormControlService<TValue = any> {
	static provide(): Provider {
		return [
			this,
			Ahqdhiyg,
			{
				provide: NG_VALUE_ACCESSOR,
				multi: true,
				useExisting: Ahqdhiyg,
			},
			{
				provide: NG_ASYNC_VALIDATORS,
				multi: true,
				useExisting: Ahqdhiyg,
			},
		];
	}

	private readonly value$ = new BehaviorSubject<null | TValue>(null);

	get value(): null | TValue {
		return this.value$.value;
	}
	set value(v: null | TValue) {
		if (this.value$.value !== v) {
			this.value$.next(v);
		}
	}

	readonly valueChanges = this.value$.pipe(skip(1), share());

	private readonly disabled$ = new BehaviorSubject<boolean>(false);

	get disabled(): boolean {
		return this.disabled$.value;
	}
	set disabled(v: boolean) {
		if (this.disabled$.value !== v) {
			this.disabled$.next(v);
		}
	}

	readonly disabledChanges = this.disabled$.pipe(skip(1), share());

	private readonly errors$ = new BehaviorSubject<null | ValidationErrors>(null);

	get errors(): null | ValidationErrors {
		return this.errors$.value;
	}
	set errors(v: null | ValidationErrors) {
		if (this.errors$.value !== v) {
			this.errors$.next(v);
		}
	}

	readonly errorsChanges = this.errors$.pipe(skip(1), share());

	private readonly pending$ = new BehaviorSubject<boolean>(false);

	get pending(): boolean {
		return this.pending$.value;
	}
	set pending(v: boolean) {
		if (this.pending$.value !== v) {
			this.pending$.next(v);
		}
	}

	readonly pendingChanges = this.pending$.pipe(skip(1), share());

	// todo: rename
	private ffecxhbj$: null | Subject<null | ValidationErrors> = null;

	private mnypfsmd$: null | Observable<null | ValidationErrors> = null;

	// todo: rename
	get xxnccupe(): Observable<null | ValidationErrors> {
		const {errors, pending} = this;
		if (pending) {
			if (this.ffecxhbj$ == null) {
				this.ffecxhbj$ = new ReplaySubject(1);
				this.mnypfsmd$ = this.ffecxhbj$.pipe();
			}
		} else {
			if (this.ffecxhbj$ == null) {
				this.ffecxhbj$ = new ReplaySubject(1);
				this.ffecxhbj$.next(errors);
				this.ffecxhbj$.complete();
				this.mnypfsmd$ = this.ffecxhbj$.pipe();
				this.ffecxhbj$ = null;
			} else {
				this.ffecxhbj$.next(errors);
				this.ffecxhbj$.complete();
				this.ffecxhbj$ = null;
			}
		}

		return this.mnypfsmd$!;
	}

	// todo: rename
	readonly xxnccupeChanges = merge(
		this.errorsChanges,
		this.pendingChanges,
	).pipe(
		map(() => this.xxnccupe),
		startWith(this.xxnccupe),
		distinctUntilChanged(),
		skip(1),
		share(),
	);

	private readonly touch$ = new Subject<void>();

	readonly touchEvents = this.touch$.pipe();

	touch(): void {
		this.touch$.next();
	}
}
