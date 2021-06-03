import { model } from 'mongoose';
import userSchema from './schemas/user';

export default {
    user: model('user', userSchema),
}