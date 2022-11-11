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
class DynamicFormArray<
  TControl extends AbstractControl = AbstractControl,
> extends FormArray<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

---

```ts
class DynamicFormRecord<
  TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

---

```ts
@Injectable()
class FallthroughFormService {
  static provide(): Provider;

  readonly controlDirective: null | AbstractControlDirective;

  readonly control: null | AbstractControl;
}
```

---

```ts
interface TypedValidatorFn<TControl extends AbstractControl = AbstractControl> {
  (control: TControl): null | ValidationErrors;
}
```

---

```ts
interface TypedAsyncValidatorFn<
  TControl extends AbstractControl = AbstractControl,
> {
  (control: TControl):
    | Promise<null | ValidationErrors>
    | Observable<null | ValidationErrors>;
}
```

---

```ts
function withCustomValidator<
  TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: TypedValidatorFn<TControl>): TControl;
```

---

```ts
function withCustomAsyncValidator<
  TControl extends AbstractControl = AbstractControl,
>(control: TControl, validator: TypedAsyncValidatorFn<TControl>): TControl;
```
