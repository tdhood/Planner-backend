"use strict";
/** Routes about logging in, out and signing up. */

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { ensureAdminOrCurrentUser, ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");
const { NotFoundError, BadRequestError } = require("../nodeSetup/expressError");
const db = require("../nodeSetup/db");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");


/** GET /[username] => { user }
 * 
 * Returns {username, user_id, email }
 */
// router.get(
//   "/:username",
//   ensureLoggedIn,
//   ensureAdminOrCurrentUser,
//   async function (req, res, next) {
//     const username = req.params.username;

//     try {
//       const user = await User.get(username);
//       return res.json({ user });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

// router.post("/:user_id", async function (req, res, next) {
//   const username = req.body.username;

//   try {
//     const validator = jsonschema.validate(req.body, userAuthSchema, {
//       required: true,
//     });
//     if (!validator.valid) {
//       const errs = validator.errors.map((e) => e.stack);
//       throw new BadRequestError(errs);
//     }
//     const user = await db.query(
//       `
//         SELECT *
//             FROM users
//                 WHERE username = $1`,
//       [username]
//     );
//     const token = createToken(user);
//     return res.json({ user, token });
//   } catch (err) {
//     console.log("err=", err);
//     return next(err);
//   }

  // const user = result.rows[0];
  // console.log('result', result)
  // console.log("user", user);

  // if (user) {
  //     return res.json({ user });
  // } else {
  //     return res.render("../views/users/login.html");
  // }
// });

module.exports = router;
