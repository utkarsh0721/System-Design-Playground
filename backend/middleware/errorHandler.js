import env from '../config/env.js';

const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';
  let details = error.details || null;

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = `Duplicate value for: ${Object.keys(error.keyValue).join(', ')}`;
    details = error.keyValue;
  }

  if (error.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed';
    details = Object.values(error.errors).map((item) => item.message);
  }

  const payload = { success: false, message, details };
  if (env.nodeEnv !== 'production') payload.stack = error.stack;

  res.status(statusCode).json(payload);
};

export default errorHandler;
