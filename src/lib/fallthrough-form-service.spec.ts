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

import {FallthroughFormService} from './fallthrough-form-service';

describe('FallthroughFormService', () => {
	it('should work with FormControlDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyFormControlExampleComponent],
		});
		const fixture = TestBed.createComponent(MyFormControlExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
			imports: [MyFormControlNameExampleComponent],
		});
		const fixture = TestBed.createComponent(MyFormControlNameExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
			imports: [MyFormGroupExampleComponent],
		});
		const fixture = TestBed.createComponent(MyFormGroupExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
			imports: [MyFormGroupNameExampleComponent],
		});
		const fixture = TestBed.createComponent(MyFormGroupNameExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
			imports: [MyFormArrayNameExampleComponent],
		});
		const fixture = TestBed.createComponent(MyFormArrayNameExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
			imports: [MyNgModelExampleComponent],
		});
		const fixture = TestBed.createComponent(MyNgModelExampleComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		tick();
		const form = fixture.debugElement.query(
			By.directive(MyFallthroughFormExampleComponent),
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
	providers: [FallthroughFormService.provide()],
	selector: 'my-fallthrough-form-example',
	standalone: true,
	template: '',
})
class MyFallthroughFormExampleComponent {
	constructor(readonly fallthroughFormService: FallthroughFormService) {}

	get form() {
		return this.fallthroughFormService.control!;
	}
}

@Component({
	imports: [ReactiveFormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-form-control-example',
	standalone: true,
	template: `<my-fallthrough-form-example
		[formControl]="form"
	></my-fallthrough-form-example>`,
})
class MyFormControlExampleComponent {
	form = new FormControl(0);
}

@Component({
	imports: [ReactiveFormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-form-control-name-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-fallthrough-form-example
				formControlName="a"
			></my-fallthrough-form-example>
		</ng-container>
	`,
})
class MyFormControlNameExampleComponent {
	form = new FormGroup({
		a: new FormControl(0),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-form-group-example',
	standalone: true,
	template: `<my-fallthrough-form-example
		[formGroup]="form"
	></my-fallthrough-form-example>`,
})
class MyFormGroupExampleComponent {
	form = new FormGroup({
		a: new FormControl(0),
		b: new FormControl(0),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-form-group-name-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-fallthrough-form-example
				formGroupName="group"
			></my-fallthrough-form-example>
		</ng-container>
	`,
})
class MyFormGroupNameExampleComponent {
	form = new FormGroup({
		group: new FormGroup({
			a: new FormControl(0),
			b: new FormControl(0),
		}),
	});
}

@Component({
	imports: [ReactiveFormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-form-array-name-example',
	standalone: true,
	template: `
		<ng-container [formGroup]="form">
			<my-fallthrough-form-example
				formArrayName="items"
			></my-fallthrough-form-example>
		</ng-container>
	`,
})
class MyFormArrayNameExampleComponent {
	form = new FormGroup({
		items: new FormArray([new FormControl(0), new FormControl(0)]),
	});
}

@Component({
	imports: [FormsModule, MyFallthroughFormExampleComponent],
	selector: 'my-ng-model-example',
	standalone: true,
	template: `<my-fallthrough-form-example
		[(ngModel)]="value"
	></my-fallthrough-form-example>`,
})
class MyNgModelExampleComponent {
	value = 0;
}
