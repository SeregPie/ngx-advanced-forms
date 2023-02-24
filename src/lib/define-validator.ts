import {AbstractControl} from '@angular/forms';

//
export const defineValidator: {
	<
		TName extends string,
		TError,
		TInstance extends {
			<TControl extends AbstractControl>(control: TControl): null | Record<
				TName,
				TError
			>;
		},
	>(
		instance: TInstance,
	): TInstance;
} = (instance) => instance;

const a = defineValidator((form) => {
	return {lol: true};
});
