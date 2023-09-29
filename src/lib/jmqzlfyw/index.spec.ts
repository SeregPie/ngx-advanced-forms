import {Component, signal} from '@angular/core';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormRecord,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {ControlFallthroughProvider, useControlFallthrough} from '.';

describe('ControlFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let eoyazczv = signal<null | string>(null);

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form.controls[eoyazczv()]" />`,
		})
		class MyComponent {
			form = form;
			eoyazczv = eoyazczv;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg()).toBeNull();

		eoyazczv.set('a');

		expect(htpqiipg()).toBe(form.controls.a);

		eoyazczv.set('b');

		expect(htpqiipg()).toBe(form.controls.b);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let eoyazczv = signal<null | string>(null);

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formControlName]="eoyazczv()" />
				</ng-container>
			`,
		})
		class MyComponent {
			form = form;
			eoyazczv = eoyazczv;
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg()).toBeNull();

		eoyazczv.set('a');

		expect(htpqiipg()).toBe(form.controls.a);

		eoyazczv.set('b');

		expect(htpqiipg()).toBe(form.controls.b);
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormControl(null),
			b: new FormControl(null),
		});

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough();
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
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg()).toBe(form);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		let form = new FormGroup({
			a: new FormGroup({
				a: new FormControl(null),
				b: new FormControl(null),
			}),
		});

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough();
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
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg.control).toBe(form.controls.a);
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
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough();
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
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg.control).toBe(form.controls.a);
	}));

	it('should work with NgModelDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useControlFallthrough({
				required: true,
			});
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
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		await tick();

		expect(component.value).toEqual(0);
		expect(htpqiipg().value).toEqual(0);

		htpqiipg().setValue(1);

		await tick();

		expect(component.value).toEqual(1);
		expect(htpqiipg().value).toEqual(1);

		component.value = 2;
		fixture.detectChanges();

		await tick();

		expect(component.value).toEqual(2);
		expect(htpqiipg().value).toEqual(2);
	}));
});
