import { Auth } from '@auth/core';
import { authConfig } from '../../../lib/auth';
import { Elysia } from 'elysia'

// createElysia()
export const routes = new Elysia({ prefix: '/auth' })
  .get('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  })
  .post('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  });
