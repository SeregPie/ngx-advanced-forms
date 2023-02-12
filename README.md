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

## API

- `C` [DynamicFormArray](#api/DynamicFormArray)
- `C` [DynamicFormRecord](#api/DynamicFormRecord)
- `C` [FallthroughFormService](#api/FallthroughFormService)
- `T` [CustomValidatorFn](#api/CustomValidatorFn)
- `T` [CustomAsyncValidatorFn](#api/CustomAsyncValidatorFn)
- `F` [withCustomValidator](#api/withCustomValidator)
- `F` [withCustomAsyncValidator](#api/withCustomAsyncValidator)
- `F` [composeValidators](#api/composeValidators)
- `T` [ControlStateAccessor](#api/ControlStateAccessor)
- `T` [CreateControlStateAccessorFn](#api/CreateControlStateAccessorFn)
- `F` [updateFormState](#api/updateFormState)

<a name="api/DynamicFormArray"></a>

### DynamicFormArray

A sup-class of `FormArray` that creates or removes sub-controls dynamically based on the passed value.

```ts
class DynamicFormArray<TControl>
  extends FormArray<TControl>
{
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

<a name="api/DynamicFormRecord"></a>

### DynamicFormRecord

A sup-class of `FormRecord` that creates or removes sub-controls dynamically based on the passed value.

```ts
class DynamicFormRecord<TControl>
  extends FormRecord<TControl>
{
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

<a name="api/FallthroughFormService"></a>

### FallthroughFormService

Passes a control from a control directive through.

```ts
@Injectable()
class FallthroughFormService {
  static provide(): Provider;

  readonly controlDirective: null | AbstractControlDirective;

  readonly control: null | AbstractControl;
}
```

#### Usage

```ts
@Component({
  imports: [ReactiveFormsModule, MyNumberInputComponent],
  providers: [FallthroughFormService.provide()],
  standalone: true,
  template: `
    <my-number-input
      [formControl]="form"
      [label]="label"
      [max]="100"
      [min]="0"
      [step]="0.1"
      unit="%"
    />
  `,
  selector: 'my-percent-input',
})
class MyPercentInputComponent {
  constructor(public fallthroughFormService: FallthroughFormService) {}

  get form() {
    return this.fallthroughFormService.control as FormControl;
  }

  @Input()
  label: string = '';
}
```

<a name="api/CustomValidatorFn"></a>

### CustomValidatorFn

```ts
interface CustomValidatorFn<TControl> {
  (control: TControl): null | ValidationErrors;
}
```

<a name="api/CustomAsyncValidatorFn"></a>

### CustomAsyncValidatorFn

```ts
interface CustomAsyncValidatorFn<TControl> {
  (control: TControl): Promise<null | ValidationErrors> | Observable<null | ValidationErrors>;
}
```

<a name="api/withCustomValidator"></a>

### withCustomValidator

Adds a typed validator to a control.

```ts
const withCustomValidator: {
  <TControl>(control: TControl, validator: CustomValidatorFn<TControl>): TControl;
};
```

#### Usage

```ts
const form = new FormGroup({
  email: new FormControl<string>('', {
    validators: [Validators.required, Validators.email],
  }),
  password: withCustomValidator(
    new FormGroup({
      actual: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
      verify: new FormControl<string>(''),
    }),
    (form) => {
      if (form.controls.actual.valid) {
        if (form.controls.actual.value !== form.controls.verify.value) {
          return {verifyPassword: true};
        }
      }
      return null;
    },
  ),
});
```

<a name="api/withCustomAsyncValidator"></a>

### withCustomAsyncValidator

Adds a typed asynchronous validator to a control.

```ts
const withCustomAsyncValidator: {
  <TControl>(control: TControl, validator: CustomAsyncValidatorFn<TControl>): TControl;
};
```

<a name="api/composeValidators"></a>

### composeValidators

Composes multiple validators into one.

```ts
const composeValidators: {
  <TControl>(validators: Array<CustomValidatorFn<TControl>>): CustomValidatorFn<TControl>;
};
```

#### Usage

```ts
const form = new FormControl<null | number>(null, {
  validators: composeValidators([Validators.required, Validators.min(0), Validators.max(100)]),
});
```

<a name="api/ControlStateAccessor"></a>

### ControlStateAccessor

```ts
interface ControlStateAccessor<TControl> {
  readonly control: TControl;
  get disabled(): boolean;
  set disabled(v: boolean);
  get enabled(): boolean;
  set enabled(v: boolean);
}
```

<a name="api/CreateControlStateAccessorFn"></a>

### CreateControlStateAccessorFn

```ts
interface CreateControlStateAccessorFn {
  <TControl>(control: TControl): ControlStateAccessor<TControl>;
}
```

<a name="api/updateFormState"></a>

### updateFormState

```ts
const updateFormState: {
  <TControl>(control: TControl, fn: {(wrap: CreateControlStateAccessorFn): void}): void;
};
```
