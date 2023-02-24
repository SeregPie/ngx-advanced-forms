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

- **`C`** [DynamicFormArray](#dynamicformarray)
- **`C`** [DynamicFormRecord](#dynamicformrecord)
- **`C`** [FormControlService](#formcontrolservice)
- **`C`** [FallthroughFormService](#fallthroughformservice)
- **`T`** [CustomValidatorFn](#customvalidatorfn)
- **`T`** [CustomAsyncValidatorFn](#customasyncvalidatorfn)
- **`F`** [withCustomValidator](#withcustomvalidator)
- **`F`** [withCustomAsyncValidator](#withcustomasyncvalidator)
- **`F`** [composeValidators](#composevalidators)
- **`F`** [composeAsyncValidators](#composeasyncvalidators)
- **`T`** [ControlStateAccessor](#controlstateaccessor)
- **`T`** [CreateControlStateAccessorFn](#createcontrolstateaccessorfn)
- **`F`** [updateFormState](#updateformstate)

### DynamicFormArray

A sup-class of `FormArray` that creates or removes sub-controls dynamically based on the passed value.

#### Type

```ts
class DynamicFormArray<TControl> extends FormArray<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

### DynamicFormRecord

A sup-class of `FormRecord` that creates or removes sub-controls dynamically based on the passed value.

#### Type

```ts
class DynamicFormRecord<TControl> extends FormRecord<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

### FormControlService

Implements all necessary tools to connect to the overlying control.

#### Type

```ts
@Injectable()
class FormControlService<TValue> {
  static provide(): Provider;

  get value(): null | TValue;
  set value(v: null | TValue);

  readonly valueChanges: Observable<null | TValue>;

  get disabled(): boolean;

  readonly disabledChanges: Observable<boolean>;

  get errors(): null | ValidationErrors;
  set errors(v: null | ValidationErrors);

  readonly errorsChanges: Observable<null | ValidationErrors>;

  get pending(): boolean;
  set pending(v: boolean);

  readonly pendingChanges: Observable<boolean>;

  touch(): void;

  readonly touchEvents: Observable<void>;
}
```

### FallthroughFormService

Passes a control from a control directive through.

#### Type

```ts
@Injectable()
class FallthroughFormService {
  static provide(): Provider;

  readonly controlDirective: null | AbstractControlDirective;

  readonly control: null | AbstractControl;
}
```

#### Details

- Works with any reactive and non-reactive control directive.
- The control is available after the component is initialized.

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

### CustomValidatorFn

#### Type

```ts
interface CustomValidatorFn<TControl> {
  (control: TControl): null | ValidationErrors;
}
```

### CustomAsyncValidatorFn

#### Type

```ts
interface CustomAsyncValidatorFn<TControl> {
  (control: TControl): Promise<null | ValidationErrors> | Observable<null | ValidationErrors>;
}
```

### withCustomValidator

Adds a typed validator to a control.

#### Type

```ts
function withCustomValidator<TControl>(
  control: TControl,
  validator: CustomValidatorFn<TControl>,
): TControl;
```

#### Details

- Recalculates the validation status of the control.

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

### withCustomAsyncValidator

Adds a typed asynchronous validator to a control.

#### Type

```ts
function withCustomAsyncValidator<TControl>(
  control: TControl,
  validator: CustomAsyncValidatorFn<TControl>,
): TControl;
```

#### Details

- Behaves the same as `withCustomValidator`.

### composeValidators

Composes multiple validators into one.

#### Type

```ts
function composeValidators<TControl>(
  validators: Array<CustomValidatorFn<TControl>>,
): CustomValidatorFn<TControl>;
```

#### Usage

```ts
const form = new FormControl<null | number>(null, {
  validators: composeValidators([
    Validators.required,
    Validators.min(0),
    Validators.max(100),
  ]),
});
```

### composeAsyncValidators

Composes multiple asynchronous validators into one.

#### Type

```ts
function composeAsyncValidators<TControl>(
  validators: Array<CustomAsyncValidatorFn<TControl>>,
): CustomAsyncValidatorFn<TControl>;
```

#### Details

- Behaves the same as `composeValidators`.

### ControlStateAccessor

#### Type

```ts
interface ControlStateAccessor<TControl> {
  readonly control: TControl;

  get disabled(): boolean;
  set disabled(v: boolean);

  get enabled(): boolean;
  set enabled(v: boolean);
}
```

### CreateControlStateAccessorFn

#### Type

```ts
interface CreateControlStateAccessorFn {
  <TControl>(control: TControl): ControlStateAccessor<TControl>;
}
```

### updateFormState

Provides a convenient way to manage the enabled/disabled state of multiple nested controls.

#### Type

```ts
function updateFormState<TControl>(
  control: TControl,
  fn: {(wrap: CreateControlStateAccessorFn): void},
): void;
```

#### Details

- Accepts only the provided control and its descendants.
- The order of the statements doesn't matter.
- Prevents unnecessary events from being emitted when no changes are detected.

#### Usage

```ts
class {
  form = new FormGroup({
    unit: new FormControl<'meter' | 'feet'>('meter'),
    valueInMeters: new FormControl<null | number>(null),
    valueInFeet: new FormControl<null | number>(null),
  });

  ngAfterContentChecked(): void {
    const {form} = this;
    updateFormState(form, (wrap) => {
      const {unit} = form.getRawValue();
      wrap(form.controls.valueInMeters).enabled = unit === 'meter';
      wrap(form.controls.valueInFeet).enabled = unit === 'feet';
    });
  }
}
```
