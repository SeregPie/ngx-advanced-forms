import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormControlService} from './form-control-service';

describe('FormControlService', () => {
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
			constructor(public service: FormControlService<number>) {}
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
		const {service}: MySubComponent = fixture.debugElement.query(
			By.directive(MySubComponent),
		).componentInstance;

		expect(service.value).toEqual(0);

		service.value = 1;

		expect(form.value).toEqual(1);

		form.setValue(2);

		expect(service.value).toEqual(2);
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
		const {service}: MySubComponent = fixture.debugElement.query(
			By.directive(MySubComponent),
		).componentInstance;

		expect(service.disabled).toBeFalse();

		form.disable();

		expect(service.disabled).toBeTrue();

		form.enable();

		expect(service.disabled).toBeFalse();
	});

	it('should propagate pending status', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;

		expect(form.pending).toBeFalse();

		service.pending = true;

		expect(form.pending).toBeTrue();

		service.pending = false;

		expect(form.pending).toBeFalse();
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
		const {service}: MySubComponent = fixture.debugElement.query(
			By.directive(MySubComponent),
		).componentInstance;

		service.errors = {error: true};

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: true});

		service.errors = null;

		expect(form.valid).toBeTrue();
	});

	it('should propagate touched status', () => {
		// todo: setup
		const form = new FormControl(0);
		const service: FormControlService<number> = null as any;

		service.touch();

		expect(form.touched).toBeTrue();

		// todo: form.markAsUntouched();
	});

	// todo: test disabled & pending

	// todo: test disabled & value

	// todo: test disabled & errors

	// todo: test pending & value

	// todo: test pending & errors
});
