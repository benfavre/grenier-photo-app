// import { routes as authRoutes } from './auth/index.bakts';
import { Elysia } from 'elysia'

export const routes = new Elysia({ prefix: '/api' })
  // .use(authRoutes)
  .get('/ping', () => 'pong')


