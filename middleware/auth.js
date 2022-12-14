"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to ensure they are logged in as an admin user.
 *
 * If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
  if (
    res.locals.user === undefined
    || res.locals?.user.isAdmin !== true
  ) {
    throw new UnauthorizedError();
  }
  return next();
}

/**
 * Middleware to ensure user is logged in as admin
 * or is logged in as user from username url param
 */

function ensureAdminOrSelf(req, res, next) {
  if(res.locals.user === undefined) throw new UnauthorizedError();
  if(
    res.locals?.user.isAdmin !== true
    && res.locals?.user.username !== req.params.username
  ) {
    throw new UnauthorizedError();
  }
  return next();
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  if (!res.locals.user) throw new UnauthorizedError();
  return next();
}

module.exports = {
  authenticateJWT,
  ensureAdmin,
  ensureAdminOrSelf,
  ensureLoggedIn,
};
