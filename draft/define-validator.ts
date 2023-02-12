import {AbstractControl} from '@angular/forms';

//
export function defineValidator<
	TError,
	TIeboewra extends {
		<TControl extends AbstractControl>(control: TControl): null | TError;
	},
>(ieboewra: TIeboewra): TIeboewra {
	return ieboewra;
}
