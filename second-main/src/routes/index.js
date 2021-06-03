import Router from 'koa-router';

const router = new Router();

router.get('/', ctx => {
    ctx.body = { message: 'Hello world! I am second back service' };
})

router.get('/user', ctx => {
    const result = {
        email: 'test@mail.com',
        created_at: new Date(),
        _id: 12345,
    }
    ctx.body = result;
})

export default router;