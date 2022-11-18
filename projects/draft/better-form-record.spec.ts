import {FormControl} from '@angular/forms';
import {noop} from 'rxjs';

import {BetterFormRecord} from './better-form-record';

describe('BetterFormRecord', () => {
	describe('set', () => {
		it('should work', () => {
			// todo: test
		});

		it('should trigger changes only once', () => {
			// todo: test
		});
	});

	describe('setAll', () => {
		it('should work', () => {
			// todo: test
		});

		it('should trigger changes only once', () => {
			// todo: test
		});
	});

	describe('remove', () => {
		it('should work', () => {
			// todo: test
		});

		it('should trigger changes only once', () => {
			// todo: test
		});
	});

	describe('removeAll', () => {
		it('should work', () => {
			// todo: test
		});

		it('should trigger changes only once', () => {
			// todo: test
		});
	});

	describe('clear', () => {
		it('should work', () => {
			// todo: test
		});

		it('should trigger changes only once', () => {
			// todo: test
		});
	});

	describe('has', () => {
		it('should work', () => {
			// todo: test
		});
	});

	describe('empty', () => {
		it('should work', () => {
			// todo: test
		});
	});

	describe('size', () => {
		it('should work', () => {
			// todo: test
		});
	});
});

(name: string): boolean {
	return this.controls[name] != null;
}

// todo: insert control
(
	name: string,
	control: TControl,
	options?: Partial<{
		emitEvent: boolean;
	}>,
): void {
	// todo: implement
	throw 'not implemented yet';
}

// todo: insert controls
(
	controls: Record<string, TControl>,
	options?: Partial<{
		emitEvent: boolean;
	}>,
): void {
	// todo: implement
	throw 'not implemented yet';
}

// todo: remove control
(
	name: string,
	options?: Partial<{
		emitEvent: boolean;
	}>,
): void {
	// todo: implement
	throw 'not implemented yet';
}

// todo: remove controls
(
	names: Array<string>,
	options?: Partial<{
		emitEvent: boolean;
	}>,
): void {
	// todo: implement
	throw 'not implemented yet';
}

(
	options?: Partial<{
		emitEvent: boolean;
	}>,
): void {
	// todo: implement
	throw 'not implemented yet';
}

get empty(): boolean {
	// todo: implement
	throw 'not implemented yet';
}

get size(): number {
	// todo: implement
	throw 'not implemented yet';
}
