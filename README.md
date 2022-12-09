# NgxAdvancedForms

Everything to make your work with Angular forms easier.

## Setup

```sh
npm i ngx-advanced-forms
```

---

```ts
import {
  DynamicFormArray,
  withCustomValidator,
  /* ... */
} from 'ngx-advanced-forms';
```

## API Reference

```ts
class DynamicFormArray<TControl> extends FormArray<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

---

```ts
class DynamicFormRecord<TControl> extends FormRecord<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

---

```ts
@Injectable()
class FormFallthroughService {
  static provide(): Provider;

  readonly controlDirective: null | AbstractControlDirective;

  readonly control: null | AbstractControl;
}
```

---

```ts
@Injectable()
class FormControlService<TValue> {
  static provide(): Provider;

  value: null | TValue;

  readonly valueChanges: Observable<null | TValue>;

  errors: null | ValidationErrors;

  readonly errorsChanges: Observable<null | ValidationErrors>;

  disabled: boolean;

  readonly disabledChanges = Observable<boolean>;

  pending: boolean;

  readonly pendingChanges = Observable<boolean>;
}
```

---

```ts
function withCustomValidator<TControl>(
  control: TControl,
  validator: ValidatorFn<TControl>,
): TControl;
```

---

```ts
function withCustomAsyncValidator<TControl>(
  control: TControl,
  validator: AsyncValidatorFn<TControl>,
): TControl;
```

---

```ts
function concatValidators<TControl>(
  ...validators: Array<ValidatorFn<TControl>>
): ValidatorFn<TControl>;
```

---

```ts
function concatAsyncValidators<TControl>(
  ...validators: Array<AsyncValidatorFn<TControl>>
): AsyncValidatorFn<TControl>;
```
