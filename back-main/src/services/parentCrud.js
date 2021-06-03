import getError from '../utils/getError';
import getSuccess from '../utils/getSuccess';
import checkValidId from '../utils/checkObjectIdIsValid';
import logger from 'winston';

class Parent {
    constructor (schema) {
        this.schema = schema;
        this.INVALID_IDENTIFIER = 'invalid identifier';
    }

    async getById(id) {
        if(!checkValidId(id)) {
            return getError(this.INVALID_IDENTIFIER);
        }

        try {
            const result = await this.schema.findById(id);
            return result;
        } catch (error) {
            logger.error(error.toString());
            return getError(error);
        }
    }

    async getList(filter = {}) {
        const limit = filter.limit || 1000;
        const offset = filter.offset || 0;
        delete filter.limit;
        delete filter.offset;

        try {
            const result = await this.schema.find(filter)
                .sort({ data_created: 1 })
                .skip(offset)
                .limit(limit)

            return result;
        } catch (error) {
            logger.error(error.toString());
            return getError(error);
        }
    }

    async create(data) {
        if(!data) {
            return getError('data is required');
        }

        try {
            const result = await this.schema.create(data);
            return result;
        } catch (error) {
            logger.error(error.toString());
            return getError(error);
        }
    }

    async delete(id) {
        if(!checkValidId(id)) {
            return getError(this.INVALID_IDENTIFIER);
        }

        try {
            await this.schema.findByIdAndDelete(id);
            return getSuccess(`${this.schema}: object ${id} was deleted`);
        } catch (error) {
            logger.error(error.toString());
            return getError(error);
        }
    }

    async update(id, data) {
        if(!checkValidId(id)) {
            return getError(this.INVALID_IDENTIFIER);
        }

        if(!data) {
            return getError('data is required')
        }

        try {
            await this.schema.findByIdAndUpdate(id, data);
            return await this.getById(id);
        } catch (error) {
            logger.error(error.toString());
            return getError(error);
        }
    }
}

export default Parent;