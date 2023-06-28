// todo: name file

import {AbstractControl, ValidationErrors} from '@angular/forms';

// ---

export const NoopValidator: {
	<TControl extends AbstractControl>(control: TControl): null;
} = () => null;

export const FailValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		<TControl extends AbstractControl>(control: TControl): TErrors;
	};
} = (errors) => () => errors;

// ---

export const NoopAsyncValidator: {
	<TControl extends AbstractControl>(control: TControl): Promise<null>;
} = async () => null;

export const FailAsyncValidator: {
	<TErrors extends ValidationErrors>(errors: TErrors): {
		<TControl extends AbstractControl>(control: TControl): Promise<TErrors>;
	};
} = (errors) => async () => errors;

// ---

export interface Cftgcovx<TKey extends string, TError> {
	key: TKey;

	fmubzhiy(errors: ValidationErrors): null | TError;

	njhuoico(key: string, value: unknown): value is TError;
}

export function defineValidator<
	//
	TErrors extends ValidationErrors,
>(fn: {
	(value: unknown): null | TErrors;
}): {
	<TControl extends AbstractControl>(control: TControl): null | TErrors;
} {
	return (control) => fn(control.value);
}

// ---

export const NonNullishValidatorKey = 'NonNullish';

export const NonNullishValidator = Object.assign(
	defineValidator((v) => {
		if (v == null) {
			return true;
		}
		return null;
	}),
	{
		key: NonNullishValidatorKey,
	},
);

// ---

export const MinSizeValidatorKey = 'NonNullish';

export const MinSizeValidator = Object.assign(
	(n: number, excluded: boolean = false) =>
		defineValidator(MinSizeValidatorKey),
	{
		key: NonNullishValidatorKey,
	},
);
