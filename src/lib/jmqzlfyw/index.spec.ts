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

describe('ControlFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		let form = new FormControl(null);

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

		expect(service.control).toBe(form);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl(null),
		});

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

		expect(service.control).toBe(form.controls.a);
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

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

		expect(service.control).toBe(form);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			}),
		});

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

		expect(service.control).toBe(form.controls.a);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormArray([
				//
				new FormControl(null),
				new FormControl(null),
			]),
		});

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

		expect(service.control).toBe(form.controls.a);
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
		}

		@Component({
			imports: [FormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [(ngModel)]="value" />`,
		})
		class MyComponent {
			value: number = 0;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		let component = fixture.componentInstance;
		// prettier-ignore
		let {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		await tick();

		expect(service.control.value).toEqual(0);

		service.control.setValue(1);

		await tick();

		expect(component.value).toEqual(1);

		component.value = 2;
		fixture.detectChanges();

		await tick();

		expect(service.control.value).toEqual(2);
	}));
});

xdescribe('FormControlService', () => {
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
		let form = new FormControl<number>(0, {
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

		expect(service.value).toBe(form.value);

		service.value = 1;

		expect(service.value).toBe(form.value);

		form.setValue(2);

		expect(service.value).toBe(form.value);
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

		form.disable();

		expect(service.disabled).toBe(form.disabled);

		form.enable();

		expect(service.disabled).toBe(form.disabled);
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

		service.pending = true;

		expect(service.pending).toBe(form.pending);

		service.pending = false;

		expect(service.pending).toBe(form.pending);
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

		service.errors = {error: true};

		expect(service.errors).toBe(form.errors);

		service.errors = null;

		expect(service.errors).toBe(form.errors);
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
