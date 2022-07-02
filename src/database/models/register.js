import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  email: Joi.string().min(1).max(64).required(),
  password: Joi.string().min(1).max(64).required(),
});

export default async function validateSignup(signup) {
  try {
    const response = await signupSchema.validateAsync(signup, {
      abortEarly: false,
    });
    return signup;
  } catch (err) {
    return null;
  }
}
