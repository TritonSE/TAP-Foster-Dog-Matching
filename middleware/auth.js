const { Admin, User } = require("../models");
const { decodeAuthToken } = require("../services/auth");

/**
 * Protected Route Middleware
 *
 * Require a valid JWT token from Firebase be passed into the Authorization header
 */
async function requireAuthentication(req, res, next) {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({ message: "Authorization token required." });
  }

  const decodedToken = await decodeAuthToken(token);
  console.log("decoded token:", decodedToken);

  if (decodedToken) {
    req.decodedToken = decodedToken;
    return next();
  }

  return res.status(401).send({ message: "You are not authorized to make this request." });
}

/**
 * User Protected Route Middleware
 *
 * requireAuthentication and require caller to be an authenticated User
 */

function requireAuthenticatedUser(req, res, next) {
  requireAuthentication(req, res, async () => {
    const { decodedToken } = req;
    const user = await User.findById(decodedToken.uid).exec();

    if (!user) {
      return res.status(401).send({ message: "You must be an authenticated user." });
    }

    req.currentUser = user;

    return next();
  });
}

/**
 * Admin Protected Route Middleware
 *
 * requireAuthentication and require caller to be an authenticated Admin
 */
function requireAuthenticatedAdmin(req, res, next) {
  requireAuthentication(req, res, async () => {
    const { decodedToken } = req;
    const admin = await Admin.findById(decodedToken.uid).exec();

    if (!admin) {
      return res.status(401).send({ message: "You must be an authenticated admin." });
    }

    req.currentUser = admin;

    return next();
  });
}

/**
 * Required Admin Role Middleware
 *
 * requireAuthenticatedAdmin and require caller to be an Admin with a certain role
 */
function requireAdminRoles(...allowedRoles) {
  return (req, res, next) =>
    requireAuthenticatedAdmin(req, res, async () => {
      if (!allowedRoles.includes(req.currentUser.role)) {
        return res.status(401).send({ message: `You must be one of these roles: ${allowedRoles.join(", ")}` });
      }
      return next();
    });
}

module.exports = {
  requireAuthentication,
  requireAuthenticatedAdmin,
  requireAuthenticatedUser,
  requireAdminRoles,
};
