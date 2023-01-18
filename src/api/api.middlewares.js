import { validationResult } from 'express-validator';
import CustomError from './api.errors.js';

export const validator = (schemas) => {
  return async (req, res, next) => {
    try {
      await Promise.all(schemas.map((schema) => schema.run(req)));
      const result = validationResult(req);
      if (result.isEmpty()) return next();
      const { errors } = result;
      throw new CustomError.ValidationError('Validation errors within your requests!', errors);
    } catch (err) {
      next(err);
    }
  };
};
