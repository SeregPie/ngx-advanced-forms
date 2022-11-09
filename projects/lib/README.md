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

- form controls
  - [`DynamicFormArray`](#dynamicformarray)
  - [`DynamicFormRecord`](#dynamicformrecord)
- injectable services
  - [`FallthroughFormService`](#fallthroughformservice)
- helper functions
  - [`withCustomValidator`](#withcustomvalidator)
  - [`withCustomAsyncValidator`](#withcustomasyncvalidator)

### DynamicFormArray

A sup-class of `FormArray` that creates or removes sub-controls dynamically based on the passed value.

#### Type

```ts
class DynamicFormArray<
  TControl extends AbstractControl = AbstractControl,
> extends FormArray<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);

  addDynamicControl(
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  addDynamicControls(
    count: number,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  addDynamicControlAt(
    index: number,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  addDynamicControlsAt(
    index: number,
    count: number,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  setDynamicControls(
    count: number,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;
}
```

#### To-Do

- Add usage example.
- Rename class members.
- Add descriptions for class members.
- Add better tests.

### DynamicFormRecord

A sup-class of `FormRecord` that creates or removes sub-controls dynamically based on the passed value.

#### Type

```ts
class DynamicFormRecord<
  TControl extends AbstractControl = AbstractControl,
> extends FormRecord<TControl> {
  constructor(controlFactory: () => TControl, options?: AbstractControlOptions);

  hasControl(name: string): boolean;

  addDynamicControl(
    name: string,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  addDynamicControls(
    names: Array<string>,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  setDynamicControls(
    names: Array<string>,
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;

  clear(
    options?: Partial<{
      emitEvent: boolean;
    }>,
  ): void;
}
```

#### To-Do

- Add usage example.
- Rename class members.
- Add descriptions for class members.
- Add better tests.

### FallthroughFormService

Passes a form control from an Angular directive through.

#### Type

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
  providers: [FallthroughFormService.provide()],
  /* ... */
})
export class MyComponent {
  constructor(readonly fallthroughFormService: FallthroughFormService) {}

  get form() {
    return this.fallthroughFormService.control;
  }

  /* ... */
}
```

### withCustomValidator

Adds a custom typed synchronous validator on a control and recalculates the value and the validation status of the control.

#### Type

```ts
function withCustomValidator<
  TControl extends AbstractControl = AbstractControl,
>(
  control: TControl,
  validator: (control: TControl) => null | ValidationErrors,
): TControl;
```

#### Usage

```ts
const form = withCustomValidator(
  new FormControl(0, {
    nonNullable: true,
  }),
  (form) => (isPowerOfTwo(form.value) ? null : {error: true}),
);
```

### withCustomAsyncValidator

Adds a custom typed asynchronous validator on a control and recalculates the value and the validation status of the control.

#### Type

```ts
function withCustomAsyncValidator<
  TControl extends AbstractControl = AbstractControl,
>(
  control: TControl,
  validator: (
    control: TControl,
  ) => Promise<null | ValidationErrors> | Observable<null | ValidationErrors>,
): TControl;
```

#### Usage

```ts
const form = withCustomAsyncValidator(
  new FormControl('', {
    nonNullable: true,
  }),
  async (form) => ((await isNameAvailable(form.value)) ? null : {error: true}),
);
```

## To-Do

- Add new injectable service for sub-forms.
- Add new injectable service for better control value accessor handling.
- Add new helpers to modify enabled/disabled status.
