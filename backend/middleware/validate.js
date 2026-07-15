import { ApiError } from '../utils/ApiError.js';

const validate = (validator) => (req, _res, next) => {
  const errors = validator(req);
  if (errors.length) return next(new ApiError(422, 'Validation failed', errors));
  next();
};
export default validate;
