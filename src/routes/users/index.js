import Router from 'koa-router';
import api from '../../services/api';

const router = new Router({ prefix: '/users' });

router.get('/', async (ctx) => {
    const filter = { ...ctx.request.query };
    ctx.body = await api.user.getList(filter);
})

router.post('/', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await api.user.create(body);
})

export default router;