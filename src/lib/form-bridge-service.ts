import {
	Injectable,
	OnDestroy,
	Provider,
} from '@angular/core';
import {
	Observable,
	Subscription,
} from 'rxjs';

import {FormControlService} from './form-control-service';

@Injectable()
export class FormBridgeService<TValue = any>
	implements OnDestroy
{
	static provide(): Provider {
		return [
			FormControlService.provide(),
			this,
		];
	}

	constructor(formControlService: FormControlService<TValue>) {
		this.#formControlService = formControlService;
	}

	#formControlService: FormControlService<TValue>;

	get value(): null | TValue {
		return this.#formControlService.value;
	}
	set value(v: null | TValue) {
		this.#formControlService.value = v;
	}

	get valueChanges(): Observable<null | TValue> {
		return this.#formControlService.valueChanges;
	}

	get disabled(): boolean {
		return this.#formControlService.disabled;
	}

	get disabledChanges(): Observable<boolean> {
		return this.#formControlService.disabledChanges;
	}

	#subscription = new Subscription();

	ngOnDestroy(): void {
		this.#subscription.unsubscribe();
	}
}
