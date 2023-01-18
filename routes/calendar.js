"use strict";
/** Routes about calendar. */

const express = require("express");
const { NotFoundError, BadRequestError } = require("../expressError");

const router = new express.Router();
const db = require("../db");

/** GET / - list of all events for current month
 *  returns `{ companies: [{ code, name }, ...]}` */

router.get("/:user_id", async function (req, res, next) {
  const results = await db.query(
    `SELECT code, name FROM users WHERE user_id = $1`,
    [user_id]
  );
  const user = results.rows;

  return res.json({ user });
});

module.exports = router;