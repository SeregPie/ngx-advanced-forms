import {Injectable, Provider, inject} from '@angular/core';
import {
	AbstractControl,
	AbstractControlDirective,
	ControlContainer,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgControl,
	ValidationErrors,
} from '@angular/forms';
import {Observable} from 'rxjs';

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
// todo: rename
export class FormControlService<TValue = any> {
	static provide(): Provider {
		// todo
		return [this];
	}

	constructor() {}

	get value(): TValue {
		throw 'not implemented yet';
	}
	set value(v: TValue) {
		throw 'not implemented yet';
	}

	get valueChanges(): Observable<TValue> {
		throw 'not implemented yet';
	}

	get disabled(): boolean {
		throw 'not implemented yet';
	}

	get disabledChanges(): Observable<boolean> {
		throw 'not implemented yet';
	}

	get errors(): null | ValidationErrors {
		throw 'not implemented yet';
	}
	set errors(v: null | ValidationErrors) {
		throw 'not implemented yet';
	}

	get errorsChanges(): Observable<null | ValidationErrors> {
		throw 'not implemented yet';
	}

	get pending(): boolean {
		throw 'not implemented yet';
	}
	set pending(v: boolean) {
		throw 'not implemented yet';
	}

	get pendingChanges(): Observable<boolean> {
		throw 'not implemented yet';
	}

	get touched(): boolean {
		throw 'not implemented yet';
	}

	get touchedChanges(): Observable<boolean> {
		throw 'not implemented yet';
	}

	touch(): void {
		throw 'not implemented yet';
	}
}
