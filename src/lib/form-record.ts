import {
	AbstractControl,
	FormRecord as NativeFormRecord,
} from '@angular/forms';

export class FormRecord<TControl extends AbstractControl = AbstractControl>
	extends NativeFormRecord<TControl>
{
	declare readonly controls: Record<string, TControl>;

	get children(): Set<AbstractControl> {
		return new Set(Object.values(this.controls));
	}

	setControls(controls: Record<string, TControl>, {
		updateValueAndValidity = true,
		...options
	}: Partial<{
		emitEvent: boolean;
		updateValueAndValidity: boolean;
	}> = {}): void {
		throw 'not implemented yet';
		controls;
		updateValueAndValidity;
		options;
	}

	insertControl(name: string, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls, [name]: control};
		this.setControls(result, options);
	}

	insertControls(controls: Record<string, TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls, ...controls};
		this.setControls(result, options);
	}

	override removeControl(name: string, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls};
		delete result[name];
		this.setControls(result, options);
	}

	removeControls(names: Array<string>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls};
		(new Set(names)).forEach((name) => {
			delete result[name];
		});
		this.setControls(result, options);
	}

	clearControls(options?: Partial<{
		emitEvent: boolean;
	}>): void {
		this.setControls({}, options);
	}
}
