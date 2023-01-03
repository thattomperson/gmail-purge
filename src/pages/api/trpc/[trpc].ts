import { z } from 'zod';
import { TRPCError, initTRPC, type inferAsyncReturnType } from '@trpc/server';
import {
  CreateNextContextOptions,
  createNextApiHandler,
} from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import Client from '@/utils/gmail';

export async function createContext(opts: CreateNextContextOptions) {
  const secret = process.env.NEXTAUTH_SECRET;
  const session = await getSession({ req: opts.req });
  const token = await getToken({ req: opts.req, secret });

  return {
    session,
    token,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
      token: ctx.token,
      gmail: new Client(ctx.token.accessToken),
    },
  });
});

const proc = t.procedure.use(isAuthed);

export const appRouter = t.router({
  getLabels: proc.query(
    async ({ ctx: { gmail } }) => (await gmail.getLabels()).labels,
  ),

  getLabelDetails: proc
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx: { gmail } }) =>
      gmail.getLabelDetails({ id: input.id }),
    ),

  deleteLabelMessages: proc
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx: { gmail } }) => {
      const { messages } = await gmail.getMessages({
        maxResults: 500,
        labelIds: input.id,
      });

      const ids = messages.map((message) => message.id);
      return gmail.deleteMessages({ ids });
    }),

  getSubscribedEmails: proc
    .input(z.object({ pageToken: z.string().optional() }))
    .query(({ input, ctx: { gmail } }) =>
      gmail.getMessages({
        maxResults: 10,
        q: '"Unsubscribe"',
        pageToken: input.pageToken,
      }),
    ),

  getMessage: proc
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx: { gmail } }) => gmail.getMessage({ id: input.id })),
});
// export type definition of API
export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
