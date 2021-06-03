import models from "../models";
import Parent from "../parentCrud";

class User extends Parent {};

export default new User(models.user);