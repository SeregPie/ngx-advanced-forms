import {AbstractControl, FormRecord as NativeFormRecord} from '@angular/forms';

import {ɵstringify} from '@angular/core';

export class FormRecord<
	TControl extends AbstractControl = AbstractControl,
> extends NativeFormRecord<TControl> {
	declare readonly controls: Record<string, TControl>;

	setControls(
		controls: Record<string, TControl>,
		{
			updateValueAndValidity = true,
			...options
		}: Partial<{
			emitEvent: boolean;
			updateValueAndValidity: boolean;
		}> = {},
	): void {
		// todo: implement
		const qieprebh = this.controls;
		[...new Set([...Object.keys(qieprebh), ...Object.keys(controls)])].every(
			(name) => qieprebh[name] === controls[name],
		);
		if (!isEqual(qieprebh, controls)) {
			const oldControls = new Set(Object.values(qieprebh));
			{
				Object.keys(qieprebh).forEach((name) => {
					delete qieprebh[name];
				});
				Object.assign(qieprebh, controls);
			}
			const newControls = new Set(Object.values(qieprebh));
			{
				let changed = false;
				[...newControls]
					.filter((x) => !oldControls.has(x))
					.forEach((control) => {
						changed = true;
						registerControl(this, control);
					});
				[...oldControls]
					.filter((x) => !newControls.has(x))
					.forEach((control) => {
						changed = true;
						unregisterControl(this, control);
					});
				if (changed) {
					triggerCollectionChange(this);
				}
			}
			if (updateValueAndValidity) {
				this.updateValueAndValidity(options);
			}
		}
	}

	// prettier-ignore
	insertControl(name: string, control: TControl, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls, [name]: control};
		this.setControls(result, options);
	}

	// prettier-ignore
	insertControls(controls: Record<string, TControl>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls, ...controls};
		this.setControls(result, options);
	}

	// prettier-ignore
	override removeControl(name: string, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls};
		delete result[name];
		this.setControls(result, options);
	}

	// prettier-ignore
	removeControls(names: Array<string>, options?: Partial<{
		emitEvent: boolean;
	}>): void {
		const result = {...this.controls};
		(new Set(names)).forEach((name) => {
			delete result[name];
		});
		this.setControls(result, options);
	}

	// prettier-ignore
	clearControls(options?: Partial<{
		emitEvent: boolean;
	}>): void {
		this.setControls({}, options);
	}
}
