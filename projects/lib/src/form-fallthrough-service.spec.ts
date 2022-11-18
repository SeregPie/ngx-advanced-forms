import {Component} from '@angular/core';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {
	FormArray,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {FormFallthroughService} from './form-fallthrough-service';

// todo: rename nuxvvximComponent
// todo: rename hfeskqzkComponent
// todo: rename yfvgjtss

describe('FormFallthroughService', () => {
	it('should work with FormControlDirective', () => {
		TestBed.configureTestingModule({
			imports: [MyFormControlDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormControlDirectiveExampleComponent,
		);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		expect(hfeskqzkComponent.form).toBe(nuxvvximComponent.form);
	});

	it('should work with FormControlNameDirective', () => {
		TestBed.configureTestingModule({
			imports: [MyFormControlNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormControlNameDirectiveExampleComponent,
		);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		expect(hfeskqzkComponent.form).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with FormGroupDirective', () => {
		TestBed.configureTestingModule({
			imports: [MyFormGroupDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormGroupDirectiveExampleComponent,
		);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		expect(hfeskqzkComponent.form).toBe(nuxvvximComponent.form);
	});

	it('should work with FormGroupNameDirective', () => {
		TestBed.configureTestingModule({
			imports: [MyFormGroupNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormGroupNameDirectiveExampleComponent,
		);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		expect(hfeskqzkComponent.form).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with FormArrayNameDirective', () => {
		TestBed.configureTestingModule({
			imports: [MyFormArrayNameDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(
			MyFormArrayNameDirectiveExampleComponent,
		);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		expect(hfeskqzkComponent.form).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with NgModelDirective', fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [MyNgModelDirectiveExampleComponent],
		});
		const fixture = TestBed.createComponent(MyNgModelDirectiveExampleComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: MyFormFallthroughServiceExampleComponent =
			fixture.debugElement.query(
				By.directive(MyFormFallthroughServiceExampleComponent),
			).componentInstance;

		flush();

		expect(hfeskqzkComponent.form.value).toEqual(0);

		hfeskqzkComponent.form.setValue(1);

		flush();

		expect(nuxvvximComponent.value).toEqual(1);

		nuxvvximComponent.value = 2;
		fixture.detectChanges();

		flush();

		expect(hfeskqzkComponent.form.value).toEqual(2);
	}));
});

@Component({
	providers: [FormFallthroughService.provide()],
	selector: 'my-form-fallthrough-service-example',
	standalone: true,
	template: '',
})
// todo: rename?
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
// todo: rename?
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
				formControlName="yfvgjtss"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
// todo: rename?
class MyFormControlNameDirectiveExampleComponent {
	form = new FormGroup({
		yfvgjtss: new FormControl(0),
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
// todo: rename?
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
				formGroupName="yfvgjtss"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
// todo: rename?
class MyFormGroupNameDirectiveExampleComponent {
	form = new FormGroup({
		yfvgjtss: new FormGroup({
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
				formArrayName="yfvgjtss"
			></my-form-fallthrough-service-example>
		</ng-container>
	`,
})
// todo: rename?
class MyFormArrayNameDirectiveExampleComponent {
	form = new FormGroup({
		yfvgjtss: new FormArray([new FormControl(0), new FormControl(0)]),
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
// todo: rename?
class MyNgModelDirectiveExampleComponent {
	value = 0;
}
