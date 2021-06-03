import Router from 'koa-router';

const router = new Router();

router.get('/', ctx => {
    ctx.body = { message: 'Hello world! I am second back service' };
})

export default router;