import { routes as authRoutes } from './auth';
import { Elysia } from 'elysia'

export const routes = new Elysia({ prefix: '/api' })
  .use(authRoutes)
  .get('/ping', () => 'pong')


