import Joi, { not } from "joi";

const messageSchema = Joi.object({
  value: Joi.number().valid(not(0)).min(1).max(12).required(),
  description: Joi.string().min(1).max(64).required(),
});

export default async function validateMessage(data) {
  try {
    const response = await messageSchema.validateAsync(data, {
      abortEarly: false,
    });
    console.log(response);
    return true;
  } catch (err) {
    return false;
  }
}
