import * as Joi from "joi";


const userSchema: Record<string, Joi.Schema> = {
  userAccount: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(5).max(16).required(),
  }),
  userUpdate: Joi.object().keys({
    newEmail: Joi.string(),
    email: Joi.string(),
  }),
};

export default userSchema;
