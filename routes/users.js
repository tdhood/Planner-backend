"use strict";
/** Routes about logging in, out and signing up. */

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const { NotFoundError, BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const db = require("../db");
const userAuthSchema  = require("../schemas/userAuth.json");
const userRegisterSchema  = require("../schemas/userRegister.json");

router.get("/login", async function (req, res, next) {
  return res.render("../views/users/login.html");
});

router.post("/login", async function (req, res, next) {
  console.log('database', db.database)
  const username = req.body.username;
  console.log("username", username);

  try {
    const validator = jsonschema.validate(
      req.body,
      userAuthSchema,
      {required: true}
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs)
    }
    const user = await db.query(`
        SELECT *
            FROM users
                WHERE username = $1`,
        [username],
    )
    console.log('user', user)
    const token = createToken(user)
    return res.json({ token });

  } catch (err) {
    console.log('you made an error in login')
    return next(err);
  }
  
  // const user = result.rows[0];
  // console.log('result', result)
  // console.log("user", user);

  // if (user) {
  //     return res.json({ user });
  // } else {
  //     return res.render("../views/users/login.html");
  // }
});


router.get("/signup", async function (req, res, next) {
    return res.render("../views/users/signup.html");
  });

/** POST /users/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/signup", async function (req, res, next) {
  console.log('database', db.database)
  const username = req.body.username;
  console.log("username", username);
  console.log('info passed in', req.body)

  try {
    const validator = jsonschema.validate(
      req.body,
      userRegisterSchema,
      {required: true}
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs)
    }
    const newUser = await User.register(req.body);
    const token = createToken(newUser)
    console.log('new user', newUser)
    return res.status(201).json({ token });
   

  } catch (err) {
    console.log('you made an error in signup')
    return next(err);
  }
});

module.exports = router;
