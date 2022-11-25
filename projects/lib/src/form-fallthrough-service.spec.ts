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

// todo: rename nuxvvxim Nuxvvxim
// todo: rename hfeskqzk Hfeskqzk
// todo: rename yfvgjtss

describe('FormFallthroughService', () => {
	it('should work with FormControlDirective', () => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `<spec-hfeskqzk [formControl]="form"></spec-hfeskqzk>`,
		})
		class NuxvvximComponent {
			form = new FormControl(0);
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
		).componentInstance;

		expect(hfeskqzkComponent.service.control).toBe(nuxvvximComponent.form);
	});

	it('should work with FormControlNameDirective', () => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<spec-hfeskqzk formControlName="yfvgjtss"></spec-hfeskqzk>
				</ng-container>
			`,
		})
		class NuxvvximComponent {
			form = new FormGroup({
				yfvgjtss: new FormControl(0),
			});
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
		).componentInstance;

		expect(hfeskqzkComponent.service.control).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with FormGroupDirective', () => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `<spec-hfeskqzk [formGroup]="form"></spec-hfeskqzk>`,
		})
		class NuxvvximComponent {
			form = new FormGroup({
				a: new FormControl(0),
				b: new FormControl(0),
			});
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
		).componentInstance;

		expect(hfeskqzkComponent.service.control).toBe(nuxvvximComponent.form);
	});

	it('should work with FormGroupNameDirective', () => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<spec-hfeskqzk formGroupName="yfvgjtss"></spec-hfeskqzk>
				</ng-container>
			`,
		})
		class NuxvvximComponent {
			form = new FormGroup({
				yfvgjtss: new FormGroup({
					a: new FormControl(0),
					b: new FormControl(0),
				}),
			});
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
		).componentInstance;

		expect(hfeskqzkComponent.service.control).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with FormArrayNameDirective', () => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}
		}

		@Component({
			imports: [ReactiveFormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `
				<ng-container [formGroup]="form">
					<spec-hfeskqzk formArrayName="yfvgjtss"></spec-hfeskqzk>
				</ng-container>
			`,
		})
		class NuxvvximComponent {
			form = new FormGroup({
				yfvgjtss: new FormArray([new FormControl(0), new FormControl(0)]),
			});
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
		).componentInstance;

		expect(hfeskqzkComponent.service.control).toBe(
			nuxvvximComponent.form.controls.yfvgjtss,
		);
	});

	it('should work with NgModelDirective', fakeAsync(() => {
		@Component({
			providers: [FormFallthroughService.provide()],
			selector: 'spec-hfeskqzk',
			standalone: true,
			template: '',
		})
		class HfeskqzkComponent {
			constructor(public service: FormFallthroughService) {}

			get form() {
				return this.service.control as FormControl<number>;
			}
		}

		@Component({
			imports: [FormsModule, HfeskqzkComponent],
			selector: 'spec-nuxvvxim',
			standalone: true,
			template: `<spec-hfeskqzk [(ngModel)]="value"></spec-hfeskqzk>`,
		})
		class NuxvvximComponent {
			value = 0;
		}

		TestBed.configureTestingModule({
			imports: [NuxvvximComponent],
		});
		const fixture = TestBed.createComponent(NuxvvximComponent);
		fixture.detectChanges();
		const nuxvvximComponent = fixture.componentInstance;
		const hfeskqzkComponent: HfeskqzkComponent = fixture.debugElement.query(
			By.directive(HfeskqzkComponent),
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
