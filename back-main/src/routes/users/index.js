import Router from 'koa-router';
import config from '../../../config';
import api from '../../services/api';
import axios from 'axios';

const router = new Router({ prefix: '/users' });

router.get('/', async (ctx) => {
    const filter = { ...ctx.request.query };
    ctx.body = await api.user.getList(filter);
})

router.get('/by-second-back', async ctx => {
    const result = await axios.get(config.secondBackUrl + "/user");
    ctx.body = {
        status: result.status,
        body: result.data
    }
})

router.post('/', async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await api.user.create(body);
})

export default router;