"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../nodeSetup/config");

/** return signed JWT {username, isAdmin} from user data. */

function createToken(user) {
  console.assert(user.username !== undefined,
      "token created");

  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
