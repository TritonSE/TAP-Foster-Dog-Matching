/**
 * Error format for errors thrown in services
 * 
 * Throw this error in a service. This will be caught by the error handler in index.js
 * 
 * EX: throw ServiceError(400, "An account with this email already exists");
 *
 * @param {number} status - http status code to send to client
 * @param {string} message - message to send to client
 * @return {*} - service error object
 */
function ServiceError(status, message) {
  return {
    name: "ServiceError",
    status,
    message,
  };
}

module.exports = { ServiceError };
