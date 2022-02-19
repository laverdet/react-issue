import { lazy, Suspense } from 'react';

const Async = lazy(async () => {
	// await new Promise(resolve => setTimeout(resolve, 500));
	return import('./hot.jsx');
});

export const app = <div>
	<Suspense fallback={<div>Loading...</div>}>
		<Async />
		<span id="after">after</span>
	</Suspense>
</div>;
