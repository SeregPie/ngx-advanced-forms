import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormFallthroughService} from './form-fallthrough-service';

describe('FormFallthroughService', () => {
	it('should work with FormControlDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormControlDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormControlDirectiveExampleComponent,
		);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as typeof component.form;

		expect(component.form.value).toEqual(form.value);

		component.form.setValue(1);
		tick();
		expect(component.form.value).toEqual(form.value);

		form.setValue(2);
		tick();
		expect(component.form.value).toEqual(form.value);
	}));

	it('should work with FormControlNameDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormControlNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormControlNameDirectiveExampleComponent,
		);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as typeof component.form.controls.a;

		expect(component.form.value.a).toEqual(form.value);

		component.form.setValue({a: 1});
		tick();
		expect(component.form.value.a).toEqual(form.value);

		form.setValue(2);
		tick();
		expect(component.form.value.a).toEqual(form.value);
	}));

	it('should work with FormGroupDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormGroupDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormGroupDirectiveExampleComponent,
		);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as typeof component.form;

		expect(component.form.value).toEqual(form.value);

		component.form.setValue({a: 1, b: 1});
		tick();
		expect(component.form.value).toEqual(form.value);

		form.setValue({a: 2, b: 2});
		tick();
		expect(component.form.value).toEqual(form.value);
	}));

	it('should work with FormGroupNameDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormGroupNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormGroupNameDirectiveExampleComponent,
		);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as typeof component.form.controls.group;

		expect(component.form.value.group).toEqual(form.value);

		component.form.setValue({group: {a: 1, b: 1}});
		tick();
		expect(component.form.value.group).toEqual(form.value);

		form.setValue({a: 2, b: 2});
		tick();
		expect(component.form.value.group).toEqual(form.value);
	}));

	it('should work with FormArrayNameDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormArrayNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormArrayNameDirectiveExampleComponent,
		);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as typeof component.form.controls.items;

		expect(component.form.value.items).toEqual(form.value);

		component.form.setValue({items: [1, 1]});
		tick();
		expect(component.form.value.items).toEqual(form.value);

		form.setValue([2, 2]);
		tick();
		expect(component.form.value.items).toEqual(form.value);
	}));

	it('should work with NgModelDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyNgModelDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(MyNgModelDirectiveExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFormFallthroughServiceExampleComponent),
		).componentInstance.form as FormControl<typeof component.value>;

		expect(component.value).toEqual(form.value);

		component.value = 1;
		fixture.detectChanges();
		tick();
		expect(component.value).toEqual(form.value);

		form.setValue(2);
		tick();
		expect(component.value).toEqual(form.value);
	}));
});

@Component({
	providers: [FormFallthroughService.provide()],
	selector: 'my-form-fallthrough-service-example',
	standalone: true,
	template: '',
})
class MyFormFallthroughServiceExampleComponent {
	constructor(readonly fallthroughFormService: FormFallthroughService) {}

	get form() {
		return this.fallthroughFormService.control!;
	}
}

@Component({
	imports: [ReactiveFormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-form-control-directive-example',
	standalone: true,
	template: `<my-form-fallthrough-service-example
		[formControl]="form"
	></my-form-fallthrough-service-example>`,
})
class MyFormControlDirectiveExampleComponent {
	form = new FormControl(0);
}

@Component({
	imports: [ReactiveFormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-form-control-name-directive-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-form-fallthrough-service-example
				formControlName="a"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
class MyFormControlNameDirectiveExampleComponent {
	form = new FormGroup({
		a: new FormControl(0),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-form-group-directive-example',
	standalone: true,
	template: `<my-form-fallthrough-service-example
		[formGroup]="form"
	></my-form-fallthrough-service-example>`,
})
class MyFormGroupDirectiveExampleComponent {
	form = new FormGroup({
		a: new FormControl(0),
		b: new FormControl(0),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-form-group-name-directive-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-form-fallthrough-service-example
				formGroupName="group"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
class MyFormGroupNameDirectiveExampleComponent {
	form = new FormGroup({
		group: new FormGroup({
			a: new FormControl(0),
			b: new FormControl(0),
		}),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-form-array-name-directive-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-form-fallthrough-service-example
				formArrayName="items"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
class MyFormArrayNameDirectiveExampleComponent {
	form = new FormGroup({
		items: new FormArray([new FormControl(0), new FormControl(0)]),
	});
}

@Component({
	imports: [FormsModule, MyFormFallthroughServiceExampleComponent],
	selector: 'my-ng-model-directive-example',
	standalone: true,
	template: `<my-form-fallthrough-service-example
		[(ngModel)]="value"
	></my-form-fallthrough-service-example>`,
})
class MyNgModelDirectiveExampleComponent {
	value = 0;
}
