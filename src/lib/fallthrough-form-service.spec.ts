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

import {FallthroughFormService} from './fallthrough-form-service';

describe('FallthroughFormService', () => {
	it('should work with FormControlDirective', () => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = new FormControl(null);
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form);
	});

	it('should work with FormControlNameDirective', () => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formControlName="a"></my-sub>
				</ng-container>
			`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormControl(null),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	});

	it('should work with FormGroupDirective', () => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form"></my-sub>`,
		})
		class MyComponent {
			form = new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			});
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form);
	});

	it('should work with FormGroupNameDirective', () => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formGroupName="a"></my-sub>
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

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	});

	it('should work with FormArrayNameDirective', () => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub formArrayName="a"></my-sub>
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

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const myComponent = fixture.componentInstance;
		const mySubComponent: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(mySubComponent.service.control).toBe(myComponent.form.controls.a);
	});

	it('should work with NgModelDirective', fakeAsync(() => {
		@Component({
			providers: [FallthroughFormService.provide()],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			constructor(public service: FallthroughFormService) {}

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
		const mySubComponent: MySubComponent = (fixture
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
