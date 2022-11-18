import {concat, forkJoin, from, Observable, of, EMPTY} from 'rxjs';
import {first, last, map, takeLast, tap} from 'rxjs/operators';

function spy(v) {
	console.log('spy', v);
}

concat(
	...[of(1, 2, 3), of(4, 5, 6), of(7, 8, 9), EMPTY].map((v) =>
		v.pipe(takeLast(1), tap(spy)),
	),
)
	.pipe(first((v) => v > 9, null))
	.subscribe({
		next(v) {
			console.log('next', v);
		},
		complete() {
			console.log('complete');
		},
	});
