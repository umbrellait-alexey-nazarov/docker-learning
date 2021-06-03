import { Types } from 'mongoose'

export default function checkObjectId (id) {
    return Types.ObjectId.isValid(id);
  };
