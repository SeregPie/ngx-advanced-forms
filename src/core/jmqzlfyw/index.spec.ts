import {Component, computed, signal} from '@angular/core';
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

import {ControlFallthroughProvider, useFormFallthrough} from '.';

describe('ControlFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let eoyazczv = signal<string>('a');

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formControl]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[eoyazczv()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg()).toBe(form.controls.a);

		eoyazczv.set('b');
		fixture.detectChanges();

		expect(htpqiipg()).toBe(form.controls.b);
	}));

	it('should work with FormControlNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormControl(null),
			b: new FormControl(null),
		});
		let eoyazczv = signal<string>('a');

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough();
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

		expect(htpqiipg()).toBe(form.get('a'));

		console.log('CHANGES 1');
		eoyazczv.set('b');
		fixture.detectChanges();
		console.log('CHANGES 2');

		await tick(2000);

		expect(htpqiipg()).toBe(form.get('b'));
	}));

	it('should work with FormGroupDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({yeihcmpq: new FormControl(null)}),
			b: new FormGroup({yeihcmpq: new FormControl(null)}),
		});
		let eoyazczv = signal<string>('a');

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `<my-sub [formGroup]="form()" />`,
		})
		class MyComponent {
			form = computed(() => form.controls[eoyazczv()]);
		}

		let fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		// prettier-ignore
		let {htpqiipg}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(htpqiipg()).toBe(form.get('a'));

		eoyazczv.set('b');
		fixture.detectChanges();

		expect(htpqiipg()).toBe(form.get('b'));
	}));

	it('should work with FormGroupNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormGroup({yeihcmpq: new FormControl(null)}),
			b: new FormGroup({yeihcmpq: new FormControl(null)}),
		});
		let eoyazczv = signal<string>('a');

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formGroupName]="eoyazczv()" />
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

		expect(htpqiipg()).toBe(form.controls.a);

		eoyazczv.set('b');
		fixture.detectChanges();

		expect(htpqiipg()).toBe(form.controls.b);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(async () => {
		let form = new FormRecord({
			a: new FormArray([new FormControl(null)]),
			b: new FormArray([new FormControl(null)]),
		});
		let eoyazczv = signal<string>('a');

		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough();
		}

		@Component({
			imports: [ReactiveFormsModule, MySubComponent],
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<my-sub [formArrayName]="eoyazczv()" />
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

		expect(htpqiipg()).toBe(form.controls.a);

		eoyazczv.set('b');
		fixture.detectChanges();

		expect(htpqiipg()).toBe(form.controls.b);
	}));

	it('should work with NgModelDirective', fakeAsync(async () => {
		@Component({
			providers: [ControlFallthroughProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			htpqiipg = useFormFallthrough<FormControl<number>>({
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
		let form = htpqiipg();

		await tick();

		expect(form.value).toEqual(0);

		form.setValue(1);

		await tick();

		expect(component.value).toEqual(1);

		component.value = 2;
		fixture.detectChanges();

		await tick();

		expect(form.value).toEqual(2);
	}));
});
