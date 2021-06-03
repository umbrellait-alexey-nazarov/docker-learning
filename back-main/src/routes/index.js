import Router from 'koa-router';
import userRouter from './users';

const router = new Router();

router.get('/', ctx => {
    ctx.body = { message: 'Hello world!' };
})

router
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())

export default router;