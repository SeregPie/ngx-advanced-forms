import {toAsyncValidator} from './to-async-validator';
import {AsyncValidatorFn2, ValidatorFn2} from './validator';

export const noopValidator: ValidatorFn2 = () => null;

export const noopAsyncValidator: AsyncValidatorFn2 = toAsyncValidator(noopValidator);
