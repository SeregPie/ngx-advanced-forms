import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {ControlFallthroughService, FormControlService} from '.';

// prettier-ignore
describe('ControlFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form" />`,
		})
		class MyComponent {
			form = new FormControl(null);
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async() => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formControlName="a" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormControl(null),
			});
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form" />`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formGroupName="a" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormGroup({
					a: new FormControl(null),
					b: new FormControl(null),
				}),
			});
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formArrayName="a" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormArray([
					new FormControl(null),
					new FormControl(null),
				]),
			});
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	}));

	it('should work with NgModelDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: ControlFallthroughService) {}

			get form() {
				return this.service.control as FormControl<number>;
			}
		}

		@Component({
			imports: [FormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [(ngModel)]="value" />`,
		})
		class MyComponent {
			value = 0;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let myComponent = fixture.componentInstance;
		let mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		await tick();

		expect(mySubComponent.form.value).toEqual(0);

		mySubComponent.form.setValue(1);

		await tick();

		expect(myComponent.value).toEqual(1);

		myComponent.value = 2;
		fixture.detectChanges();

		await tick();

		expect(mySubComponent.form.value).toEqual(2);
	}));
});

describe('FormControlService', () => {
	it('should not trigger changes initially', fakeAsync(async () => {
		let form = new FormControl(null);

		// todo: rename
		let spy = jasmine.createSpy();
		form.valueChanges.subscribe(spy);
		form.statusChanges.subscribe(spy);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();

		await tick();

		expect(spy).not.toHaveBeenCalled();
	}));

	it('should propagate value', fakeAsync(async () => {
		let form = new FormControl(0, {
			nonNullable: true,
		});

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(service.value).toBe(0);

		let spy = jasmine.createSpy();
		form.valueChanges.subscribe(spy);

		service.value = 1;

		expect(form.value).toBe(1);
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		form.setValue(2);

		expect(service.value).toBe(2);
		expect(spy).toHaveBeenCalledTimes(1);
	}));

	it('should propagate disabled status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		// todo: rename
		let spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		form.disable();

		expect(service.disabled).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		form.enable();

		expect(service.disabled).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(2);
	}));

	it('should propagate pending status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		// todo: rename
		let spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		service.pending = true;

		expect(form.pending).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		service.pending = false;

		expect(form.pending).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(1);
	}));

	it('should propagate errors', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		// todo: rename
		let spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		service.errors = {error: true};

		expect(form.errors).toEqual({error: true});
		expect(spy).toHaveBeenCalledTimes(2);

		spy.calls.reset();

		service.errors = null;

		expect(form.errors).toBeNull();
		expect(spy).toHaveBeenCalledTimes(2);
	}));

	it('should propagate pending status and errors', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form" />`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		// todo: rename
		let spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		service.pending = true;
		service.errors = {error: {n: 1}};

		expect(form.pending).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		service.pending = false;

		expect(form.errors).toEqual({error: {n: 1}});
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		service.pending = true;
		service.errors = {error: {n: 2}};

		expect(form.pending).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		service.pending = false;

		expect(form.errors).toEqual({error: {n: 2}});
		expect(spy).toHaveBeenCalledTimes(1);
	}));

	it('should propagate touched status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [FormControlService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormControlService) {}
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
		fixture.detectChanges();
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		service.touch();

		expect(form.touched).toBeTrue();

		form.markAsUntouched();

		service.touch();

		expect(form.touched).toBeTrue();
	}));
});
