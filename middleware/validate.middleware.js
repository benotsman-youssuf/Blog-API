import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(4).required(),
  role: Joi.string().min(3).optional(), // Fixed incorrect method usage
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export const blogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).min(1),
});

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((e) => e.message),
      });
    }
    next();
  };
};
