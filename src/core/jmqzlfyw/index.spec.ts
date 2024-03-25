import {Component, computed, signal} from '@angular/core';
import {TestBed, fakeAsync} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormRecord,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {simpleFaker as faker} from '@faker-js/faker';

import {flush} from '../../test';
import {useFormBridge, useFormFallthrough} from './';

// prettier-ignore
describe('useFormFallthrough', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[formSwitch$()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');

		await flush();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formControlName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');

		await flush();

		// todo: comment
		expect(result()).toBe(form.controls.a);
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({a: new FormControl(null)}),
			b: new FormGroup({a: new FormControl(null)}),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[formSwitch$()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');

		await flush();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({a: new FormControl(null)}),
			b: new FormGroup({a: new FormControl(null)}),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formGroupName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');

		await flush();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormArray([new FormControl(null)]),
			b: new FormArray([new FormControl(null)]),
		});
		let formSwitch$ = signal<string>('a');

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formArrayName]="formSwitch()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			formSwitch = formSwitch$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(result()).toBe(form.controls.a);

		formSwitch$.set('b');

		await flush();

		expect(result()).toBe(form.controls.b);
	}));

	it('should work with NgModelDirective', fakeAsync(async () => {
		let value$ = signal<number>(0);

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormFallthrough.required<FormControl<number>>();
		}

		@Component({
			imports: [FormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [(ngModel)]="value" />`,
		})
		class MyComponent {
			value = value$;
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);
		let form = result();

		// todo: rand & multiple
		expect(form.value).toEqual(value$());

		form.setValue(faker.number.int());

		await flush();

		expect(form.value).toEqual(value$());

		value$.set(faker.number.int());

		await flush();

		expect(form.value).toEqual(value$());
	}));

	it('should return null if not available', fakeAsync(async () => {
		@Component({
			standalone: true,
			template: '',
		})
		class MyComponent {
			result = useFormFallthrough();
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result} = fixture.componentInstance;

		expect(result()).toBeNull();
	}));

	it('should throw if required and not available', fakeAsync(async () => {
		@Component({
			standalone: true,
			template: '',
		})
		class MyComponent {
			result = useFormFallthrough.required();
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		let {result} = fixture.componentInstance;

		expect(result).toThrow();
	}));
});

describe('useFormBridge', () => {
	it('should work', fakeAsync(async () => {
		let form = new FormControl<number>(1);
		let value$ = signal<null | number>(null);

		@Component({
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			result = useFormBridge(value$);
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form" />`,
		})
		class MyComponent {
			form = form;
		}

		let fixture = TestBed.createComponent(MyComponent);
		await flush();
		// prettier-ignore
		let {result}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(value$()).toBe(1);

		form.disable();

		await flush();

		expect(result.disabled()).toBeTrue();
	}));
});
