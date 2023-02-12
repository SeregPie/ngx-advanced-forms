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

- `C` [FormArray](#api/FormArray)
- `C` [FormRecord](#api/FormRecord)
- `C` [DynamicFormArray](#api/DynamicFormArray)
- `C` [DynamicFormRecord](#api/DynamicFormRecord)
- `C` [FormControlService](#api/FormControlService)
- `T` [FormBridge](#api/FormBridge)
- `C` [FormBridgeService](#api/FormBridgeService)
- `C` [FallthroughFormService](#api/FallthroughFormService)
- `T` [CustomValidatorFn](#api/CustomValidatorFn)
- `T` [CustomAsyncValidatorFn](#api/CustomAsyncValidatorFn)
- `F` [withCustomValidator](#api/withCustomValidator)
- `F` [withCustomAsyncValidator](#api/withCustomAsyncValidator)
- `F` [composeValidators](#api/composeValidators)
- `F` [composeAsyncValidators](#api/composeAsyncValidators)
- `T` [ControlStateAccessor](#api/ControlStateAccessor)
- `T` [CreateControlStateAccessorFn](#api/CreateControlStateAccessorFn)
- `F` [updateFormState](#api/updateFormState)

<a name="api/FormArray"></a>

### FormArray

A sup-class of native `FormArray` with extended functionality.

```ts
// prettier-ignore
class FormArray<TControl>
  extends NativeFormArray<TControl>
{
  setControls(controls: Array<TControl>): void;

  insertControlBefore(index: number, control: TControl): void;

  insertControlsBefore(index: number, controls: Array<TControl>): void;

  insertControlLast(control: TControl): void;

  insertControlsLast(controls: Array<TControl>): void;

  insertControlAt(index: number, control: TControl): void;

  removeControlAt(index: number): void;

  clearControls(): void;
}
```

<a name="api/FormRecord"></a>

### FormRecord

A sup-class of native `FormRecord` with extended functionality.

```ts
// prettier-ignore
class FormRecord<TControl>
  extends NativeFormRecord<TControl>
{
  setControls(controls: Record<string, TControl>): void;

  insertControl(name: string, control: TControl): void;

  insertControls(controls: Record<string, TControl>): void;

  removeControl(name: string): void;

  removeControls(names: Array<string>): void;

  clearControls(): void;
}
```

<a name="api/DynamicFormArray"></a>

### DynamicFormArray

A sup-class of `FormArray` that creates or removes sub-controls dynamically based on the passed value.

```ts
// prettier-ignore
class DynamicFormArray<TControl>
  extends FormArray<TControl>
{
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

#### Usage

_todo_

<a name="api/DynamicFormRecord"></a>

### DynamicFormRecord

A sup-class of `FormRecord` that creates or removes sub-controls dynamically based on the passed value.

```ts
// prettier-ignore
class DynamicFormRecord<TControl>
  extends FormRecord<TControl>
{
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);
}
```

#### Usage

_todo_

<a name="api/FormControlService"></a>

### FormControlService

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

#### Usage

_todo_

<a name="api/FormBridge"></a>

### FormBridge

```ts
export interface FormBridge<TControl> {
  readonly control: TControl;
}
```

<a name="api/FormBridgeService"></a>

### FormBridgeService

_todo_

```ts
@Injectable()
class FormBridgeService<TValue> {
  static provide(): Provider;

  get value(): null | TValue;
  set value(v: null | TValue);

  get disabled(): boolean;

  use<TControl>(control: TControl): FormBridge<TControl>;
}
```

#### Usage

_todo_

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

_todo_

```ts
@Component({
  imports: [ReactiveFormsModule, MyNumberInputComponent],
  providers: [FallthroughFormService.provide()],
  standalone: true,
  template: `./template.html`,
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

```html
<my-number-input
  [formControl]="form"
  [label]="label"
  [max]="100"
  [min]="0"
  [step]="0.1"
  unit="%"
/>
```

```html
<my-percent-input
  [formControl]="form"
  label="label"
/>
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

Composes multiple validators into one. Validators are executed sequentially until one fails. _todo_

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

<a name="api/composeValidators"></a>

### composeAsyncValidators

Composes multiple asynchronous validators into one. _todo_

```ts
const composeAsyncValidators: {
  <TControl>(validators: Array<CustomAsyncValidatorFn<TControl>>): CustomAsyncValidatorFn<TControl>;
};
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

<a name="api/ControlStateAccessor"></a>

### CreateControlStateAccessorFn

```ts
interface CreateControlStateAccessorFn {
  <TControl>(control: TControl): ControlStateAccessor<TControl>;
}
```

<a name="api/update-form-state"></a>

### updateFormState

_todo_

```ts
const updateFormState: {
  <TControl>(control: TControl, fn: {(wrap: CreateControlStateAccessorFn): void}): void;
};
```

#### Usage

_todo_

```ts
// prettier-ignore
@Component(/* ... */)
class MyComponent
  implements AfterContentChecked
{
  // ...

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
