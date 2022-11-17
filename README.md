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
function combineValidators<TControl>(
  ...validators: Array<ValidatorFn<TControl>>
): ValidatorFn<TControl>;
```

---

```ts
function combineAsyncValidators<TControl>(
  ...validators: Array<AsyncValidatorFn<TControl>>
): AsyncValidatorFn<TControl>;
```
