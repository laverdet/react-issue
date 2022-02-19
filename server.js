import http from 'http';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import { app } from './app.jsx';

const handler = new Koa();
handler.use(KoaStatic('./dist/browser'));
handler.use(async (context) => {
	context.set('Content-Type', 'text/html')
	const stream = context.body = new PassThrough();
	stream.write('<!doctype html><html><head><script defer src=/main.js></script></head><body><div id="root">');
	void async function() {
		const nodeStream = new PassThrough();
		renderToPipeableStream(app).pipe(nodeStream);
		for await (const chunk of nodeStream) {
			stream.write(chunk);
		}
		stream.end('</body></html>');
	}();
});

const server = http.createServer();
server.on("request", handler.callback());
server.listen(8000);
console.log(`🌎 Server running`);
