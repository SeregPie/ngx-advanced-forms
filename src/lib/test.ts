import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FallthroughFormService} from './fallthrough-form-service';

@Component({
	imports: [ReactiveFormsModule, MyNumberInputComponent],
	providers: [FallthroughFormService.provide()],
	standalone: true,
	template: `./template.html`,
	selector: 'my-percent-input',
})
class MyPercentInputComponent {
	constructor(public fallthroughFormService: FallthroughFormService) {}

	get form() {
		return this.fallthroughFormService.control as FormControl;
	}

	@Input()
	label: string = '';
}
