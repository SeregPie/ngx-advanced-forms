import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {
	FormControl,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormControlService} from './form-control-service';

describe('FormControlService', () => {
	it('should not trigger changes initially', () => {
		const form = new FormControl(null);

		const spy = jasmine.createSpy();
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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalledTimes(0);
	});

	it('should propagate value', () => {
		const form = new FormControl(0, {
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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(service.value).toBe(0);

		const spy = jasmine.createSpy();
		form.valueChanges.subscribe(spy);

		service.value = 1;

		expect(form.value).toBe(1);
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		form.setValue(2);

		expect(service.value).toBe(2);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should propagate disabled status', () => {
		const form = new FormControl(null);

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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		form.disable();

		expect(service.disabled).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		form.enable();

		expect(service.disabled).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should propagate pending status', () => {
		const form = new FormControl(null);

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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		service.pending = true;

		expect(form.pending).toBeTrue();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.calls.reset();

		service.pending = false;

		expect(form.pending).toBeFalse();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should propagate errors', () => {
		const form = new FormControl(null);

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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		const spy = jasmine.createSpy();
		form.statusChanges.subscribe(spy);

		service.errors = {error: true};

		expect(form.errors).toEqual({error: true});
		expect(spy).toHaveBeenCalledTimes(2);

		spy.calls.reset();

		service.errors = null;

		expect(form.errors).toBeNull();
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should propagate pending status and errors', () => {
		const form = new FormControl(null);

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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		const spy = jasmine.createSpy();
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
	});

	it('should propagate touched status', () => {
		const form = new FormControl(null);

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
			template: `<my-sub [formControl]="form"></my-sub>`,
		})
		class MyComponent {
			form = form;
		}

		TestBed.configureTestingModule({
			imports: [MyComponent],
		});
		const fixture = TestBed.createComponent(MyComponent);
		fixture.detectChanges();
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		service.touch();

		expect(form.touched).toBeTrue();

		form.markAsUntouched();

		service.touch();

		expect(form.touched).toBeTrue();
	});
});
