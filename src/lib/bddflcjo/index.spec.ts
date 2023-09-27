import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormControlService} from '.';

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

		expect(form.value).toEqual(0);
		expect(service.value).toEqual(0);

		service.value = 1;

		expect(form.value).toEqual(1);
		expect(service.value).toEqual(1);

		form.setValue(2);

		expect(form.value).toEqual(2);
		expect(service.value).toEqual(2);
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

		expect(service.disabled).toBeTrue();

		form.enable();

		expect(service.disabled).toBeFalse();
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

		expect(form.pending).toBeTrue();

		service.pending = false;

		expect(form.pending).toBeFalse();
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

		expect(form.errors).toEqual({error: true});

		service.errors = null;

		expect(form.errors).toBeNull();
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
		expect(form.errors).toBeNull();

		service.pending = false;

		expect(form.pending).toBeFalse();
		expect(form.errors).toEqual({error: {n: 1}});

		service.pending = true;
		service.errors = {error: {n: 2}};

		expect(form.pending).toBeTrue();
		expect(form.errors).toBeNull();

		service.pending = false;

		expect(form.pending).toBeFalse();
		expect(form.errors).toEqual({error: {n: 2}});
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
		expect(service.touched).toBeTrue();

		form.markAsUntouched();

		expect(form.touched).toBeFalse();
		expect(service.touched).toBeFalse();

		form.markAsTouched();

		expect(form.touched).toBeTrue();
		expect(service.touched).toBeTrue();
	}));
});
