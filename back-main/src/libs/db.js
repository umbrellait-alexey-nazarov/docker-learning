import mongoose from 'mongoose';
import config from '../../config';

const connection = () => {
    mongoose.connect(config.dbUri, { useNewUrlParser: true, useFindAndModify: false });
    return mongoose.connection
}

export default connection;