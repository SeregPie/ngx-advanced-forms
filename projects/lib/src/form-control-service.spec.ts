import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormControlService} from './form-control-service';

// prettier-ignore
fdescribe('FormControlService', () => {
	it('should not trigger changes initially', () => {
		const form = new FormControl(null);

		// todo: rename
		const dsbdrxlx = jasmine.createSpy('dsbdrxlx');
		form.valueChanges.subscribe(dsbdrxlx);
		// todo: rename
		const bivszejl = jasmine.createSpy('bivszejl');
		form.statusChanges.subscribe(bivszejl);

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

		expect(dsbdrxlx).toHaveBeenCalledTimes(0);
		expect(bivszejl).toHaveBeenCalledTimes(0);
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

		const dsbdrxlx = jasmine.createSpy('dsbdrxlx');
		form.valueChanges.subscribe(dsbdrxlx);

		service.value = 1;

		expect(form.value).toBe(1);
		expect(dsbdrxlx).toHaveBeenCalledTimes(1);

		dsbdrxlx.calls.reset();

		form.setValue(2);

		expect(service.value).toBe(2);
		expect(dsbdrxlx).toHaveBeenCalledTimes(1);
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

		const bivszejl = jasmine.createSpy('bivszejl');
		form.statusChanges.subscribe(bivszejl);

		form.disable();

		expect(service.disabled).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);

		bivszejl.calls.reset();

		form.enable();

		expect(service.disabled).toBeFalse();
		expect(bivszejl).toHaveBeenCalledTimes(2);
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

		const bivszejl = jasmine.createSpy('bivszejl');
		form.statusChanges.subscribe(bivszejl);

		service.pending = true;

		expect(form.pending).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);

		bivszejl.calls.reset();

		service.pending = false;

		expect(form.pending).toBeFalse();
		expect(bivszejl).toHaveBeenCalledTimes(1);
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

		const bivszejl = jasmine.createSpy('bivszejl');
		form.statusChanges.subscribe(bivszejl);

		service.errors = {error: true};

		expect(form.errors).toEqual({error: true});
		expect(bivszejl).toHaveBeenCalledTimes(2);

		bivszejl.calls.reset();

		service.errors = null;

		expect(form.errors).toBeNull();
		expect(bivszejl).toHaveBeenCalledTimes(2);
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

		const bivszejl = jasmine.createSpy('bivszejl');
		form.statusChanges.subscribe(bivszejl);

		service.pending = true;
		service.errors = {error: {n: 1}};

		expect(form.pending).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);

		bivszejl.calls.reset();

		service.pending = false;

		expect(form.errors).toEqual({error: {n: 1}});
		expect(bivszejl).toHaveBeenCalledTimes(1);

		bivszejl.calls.reset();

		service.pending = true;
		service.errors = {error: {n: 2}};

		expect(form.pending).toBeTrue();
		expect(bivszejl).toHaveBeenCalledTimes(1);

		bivszejl.calls.reset();

		service.pending = false;

		expect(form.errors).toEqual({error: {n: 2}});
		expect(bivszejl).toHaveBeenCalledTimes(1);
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
