import Joi from "joi";

const emtrySchema = Joi.object({
  value: Joi.number().precision(2).required(),
  description: Joi.string().min(1).max(64).required(),
});

export default async function validateEntry(data) {
  try {
    const response = await emtrySchema.validateAsync(data, {
      abortEarly: false,
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}
