"use strict";
/** Routes about calendar. */

const express = require("express");
const { NotFoundError, BadRequestError } = require("../nodeSetup/expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

const router = new express.Router();
const db = require("../nodeSetup/db");

const User = require("../models/user");

/** GET / - list of all events for current month
 *  returns `{ companies: [{ code, name }, ...]}` */

router.get("/:user_id", ensureLoggedIn, async function (req, res, next) {
  const results = await db.query(
    `SELECT * FROM users WHERE id = $1`,
    [user_id]
  );
  const user = results.rows;

  return res.json({ user });
});

module.exports = router;