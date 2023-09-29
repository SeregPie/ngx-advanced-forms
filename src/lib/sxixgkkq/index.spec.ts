import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {SxixgkkqProvider, useSxixgkkq} from '.';

describe('FormControlService', () => {
	it('should not trigger changes initially', fakeAsync(async () => {
		let form = new FormControl(null);

		// todo: rename
		let spy = jasmine.createSpy();
		form.valueChanges.subscribe(spy);
		form.statusChanges.subscribe(spy);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		expect(form.value).toEqual(0);
		expect(umbcyimu.value).toEqual(0);

		umbcyimu.value = 1;

		expect(form.value).toEqual(1);
		expect(umbcyimu.value).toEqual(1);

		form.setValue(2);

		expect(form.value).toEqual(2);
		expect(umbcyimu.value).toEqual(2);
	}));

	it('should propagate disabled status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		form.disable();

		expect(umbcyimu.disabled).toBeTrue();

		form.enable();

		expect(umbcyimu.disabled).toBeFalse();
	}));

	it('should propagate pending status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		umbcyimu.pending = true;

		expect(form.pending).toBeTrue();

		umbcyimu.pending = false;

		expect(form.pending).toBeFalse();
	}));

	it('should propagate errors', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		umbcyimu.errors = {error: true};

		expect(form.errors).toEqual({error: true});

		umbcyimu.errors = null;

		expect(form.errors).toBeNull();
	}));

	it('should propagate pending status and errors', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		umbcyimu.pending = true;
		umbcyimu.errors = {error: {n: 1}};

		expect(form.pending).toBeTrue();
		expect(form.errors).toBeNull();

		umbcyimu.pending = false;

		expect(form.pending).toBeFalse();
		expect(form.errors).toEqual({error: {n: 1}});

		umbcyimu.pending = true;
		umbcyimu.errors = {error: {n: 2}};

		expect(form.pending).toBeTrue();
		expect(form.errors).toBeNull();

		umbcyimu.pending = false;

		expect(form.pending).toBeFalse();
		expect(form.errors).toEqual({error: {n: 2}});
	}));

	it('should propagate touched status', fakeAsync(async () => {
		let form = new FormControl(null);

		@Component({
			providers: [SxixgkkqProvider],
			selector: 'my-sub',
			standalone: true,
			template: '',
		})
		class MySubComponent {
			umbcyimu = useSxixgkkq();
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
		let {umbcyimu}: MySubComponent = (fixture
			.debugElement
			.query(By.directive(MySubComponent))
			.componentInstance
		);

		umbcyimu.touch();

		expect(form.touched).toBeTrue();
		expect(umbcyimu.touched).toBeTrue();

		form.markAsUntouched();

		expect(form.touched).toBeFalse();
		expect(umbcyimu.touched).toBeFalse();

		form.markAsTouched();

		expect(form.touched).toBeTrue();
		expect(umbcyimu.touched).toBeTrue();
	}));
});
