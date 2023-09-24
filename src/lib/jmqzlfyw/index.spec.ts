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

import {ControlFallthroughService} from '.';

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
