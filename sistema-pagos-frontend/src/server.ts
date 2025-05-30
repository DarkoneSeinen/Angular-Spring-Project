import { APP_BASE_HREF } from '@angular/common';
import { Provider } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import express, { Express, Request, Response, NextFunction } from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'fs';
import bootstrap from './main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = existsSync(join(serverDistFolder, 'index.server.html'))
    ? readFileSync(join(serverDistFolder, 'index.server.html'), 'utf-8')
    : readFileSync(join(browserDistFolder, 'index.html'), 'utf-8');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder));

  // All regular routes use the Universal engine
  server.get('*', async (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    try {
      const document = await renderApplication(bootstrap, {
        document: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }]
      });

      res.send(document);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

const mainModule = import.meta.url === `file://${process.argv[1]}`;
if (mainModule) {
  run();
}

export default app;
