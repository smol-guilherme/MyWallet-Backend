import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().min(1).max(64).required(),
  password: Joi.string().min(1).max(64).required(),
});

export default async function validateUser(user) {
  try {
    const response = await userSchema.validateAsync(user, {
      abortEarly: false,
    });
    return response;
  } catch (err) {
    return err.details[0];
  }
}
