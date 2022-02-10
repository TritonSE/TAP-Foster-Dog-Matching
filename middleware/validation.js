const { validationResult } = require("express-validator");

/**
 * Rejected a request with 400 if it does not meet the validation
 * criteria specified using express-validator.
 */
const validateRequest = (req, res, next) => {
  const validationRes = validationResult(req);
  if (validationRes.isEmpty()) {
    return next();
  }
  const badFields = new Set(validationRes.errors.map((error) => error.param));
  return res.status(400).json({
    message: `Invalid or missing fields: ${[...badFields].join(", ")}`,
  });
};

module.exports = {
  validateRequest,
};
