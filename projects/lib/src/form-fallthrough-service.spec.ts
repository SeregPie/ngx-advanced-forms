import {Component} from '@angular/core';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormFallthroughService} from './form-fallthrough-service';

describe('FormFallthroughService', () => {
	it('should work with FormControlDirective', () => {
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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = new FormControl(0);
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(mySubComponent.service.control).toBe(myComponent.form);
	});

	it('should work with FormControlNameDirective', () => {
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
					<my-sub formControlName="one"></my-sub>
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				one: new FormControl(0),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.one);
	});

	it('should work with FormGroupDirective', () => {
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
			template: `<my-sub [formGroup]="form"></my-sub>`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormControl(0),
				b: new FormControl(0),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(mySubComponent.service.control).toBe(myComponent.form);
	});

	it('should work with FormGroupNameDirective', () => {
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
					<my-sub formGroupName="one"></my-sub>
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				one: new FormGroup({
					a: new FormControl(0),
					b: new FormControl(0),
				}),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.one);
	});

	it('should work with FormArrayNameDirective', () => {
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
					<my-sub formArrayName="one"></my-sub>
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				one: new FormArray([new FormControl(0), new FormControl(0)]),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.one);
	});

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
			template: `<my-sub [(ngModel)]="value"></my-sub>`,
		})
		class MyComponent {
			value = 0;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = fixture.debugElement.query(By.directive(MySubComponent)).componentInstance;

		flush();

		expect(mySubComponent.form.value).toEqual(0);

		mySubComponent.form.setValue(1);

		flush();

		expect(myComponent.value).toEqual(1);

		myComponent.value = 2;
		fixture.detectChanges();

		flush();

		expect(mySubComponent.form.value).toEqual(2);
	}));
});
