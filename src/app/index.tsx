import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
// import { SignIn, SignOut } from '../components/auth';
import { Layout } from '../components/Layout';
import { getSession } from '../lib/auth';
import { routes as apiRoutes } from './api';
import { routes as todosRoutes } from './todos';
import { Elysia } from 'elysia'
import { basicAuth } from '@eelkevdbos/elysia-basic-auth'

process.env["BASIC_AUTH_CREDENTIALS"] = "admin:admin;user:user"

export const app = new Elysia()
  // Plugins on all routes
  .use(swagger())

  // Non-page routes
  .use(apiRoutes)

  // Plugins on all page routes
  .use(html())

  .use(basicAuth())

  // Page routes
  .use(todosRoutes)
  .get('/', async (ctx) => {
    // const session = await getSession(ctx.request);
    const session = await getSession(ctx);

    return (
      <Layout>
        <div class='px-6 py-6'>
          <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
        </div>
      </Layout>
    );
  })
  .get('/health', (ctx) => 'ok');

export type App = typeof app;
