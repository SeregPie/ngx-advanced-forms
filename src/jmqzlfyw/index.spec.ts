import {Component} from '@angular/core';
import {
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormFallthroughService} from '.';

describe('FormFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}
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

	it('should work with FormControlNameDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}
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

	it('should work with FormGroupDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}
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

	it('should work with FormGroupNameDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}
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

	it('should work with FormArrayNameDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}
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

	it('should work with NgModelDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FormFallthroughService) {}

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

		tick();

		expect(mySubComponent.form.value).toEqual(0);

		mySubComponent.form.setValue(1);

		tick();

		expect(myComponent.value).toEqual(1);

		myComponent.value = 2;
		fixture.detectChanges();

		tick();

		expect(mySubComponent.form.value).toEqual(2);
	}));
});
