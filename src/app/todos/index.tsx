import { eq } from 'drizzle-orm';
import { insertTodoSchema, patchTodoSchema, todos } from '../../db/schemas/todo';
import { isAuthenticated } from '../../hooks/isAuthenticated';
import { getSession } from '../../lib/auth';
import { db, idParamsSchema } from '../../lib/db';
import { TodoForm, TodoItem, TodoList } from './components';
import { Elysia } from 'elysia'

export const routes = new Elysia({ prefix: '/todos' })
  .get('/', async (ctx) => {
    // const session = await getSession(ctx.request);
    const session = await getSession(ctx);

    const allTodos = await db.select().from(todos).all();
    return (
      <div class='flex flex-col'>
        <TodoForm enabled={!!session} />
        <TodoList todos={allTodos} enabled={!!session} />
      </div>
    );
  })
  .post(
    '/',
    async (ctx) => {
      const newTodo = await db.insert(todos).values(ctx.body).returning().get();
      return <TodoItem todo={newTodo} enabled={true} />;
    },
    {
      body: insertTodoSchema,
      beforeHandle: [isAuthenticated],
    }
  )
  .patch(
    '/:id',
    async (ctx) => {
      const patchedTodo = await db
        .update(todos)
        .set({ completed: ctx.body.completed === 'on' })
        .where(eq(todos.id, ctx.params.id))
        .returning()
        .get();
      return <TodoItem todo={patchedTodo} enabled={true} />;
    },
    {
      body: patchTodoSchema,
      params: idParamsSchema,
      beforeHandle: [isAuthenticated],
    }
  )
  .delete(
    '/:id',
    async (ctx) => {
      await db.delete(todos).where(eq(todos.id, ctx.params.id)).run();
    },
    {
      params: idParamsSchema,
      beforeHandle: [isAuthenticated],
    }
  );
