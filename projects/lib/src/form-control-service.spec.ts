import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormControlService} from './form-control-service';

function spy<Fn extends jasmine.Func>(fn?: Fn) {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}

fdescribe('FormControlService', () => {
	it('should propagate value', () => {
		const form = new FormControl(0, {
			nonNullable: true,
		});
		const bivszejl = spy();
		form.valueChanges.subscribe(bivszejl);

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
		// prettier-ignore
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		console.log('START');

		expect(service.value).toEqual(0);
		expect(bivszejl).toHaveBeenCalledTimes(0);
		bivszejl.calls.reset();

		service.value = 1;

		expect(form.value).toEqual(1);
		expect(bivszejl).toHaveBeenCalledTimes(1);
		bivszejl.calls.reset();

		console.log('form.setValue(2)');
		form.setValue(2);
		console.log('END');

		expect(service.value).toEqual(2);
		expect(bivszejl).toHaveBeenCalledTimes(1);
		bivszejl.calls.reset();
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
		// prettier-ignore
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(service.disabled).toBeFalse();

		form.disable();

		expect(service.disabled).toBeTrue();

		form.enable();

		expect(service.disabled).toBeFalse();
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
		// prettier-ignore
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

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
		// prettier-ignore
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		service.errors = {error: true};

		expect(form.invalid).toBeTrue();
		expect(form.errors).toEqual({error: true});

		service.errors = null;

		expect(form.valid).toBeTrue();
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
		// prettier-ignore
		const {service}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

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
