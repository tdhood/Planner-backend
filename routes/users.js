"use strict";
/** Routes about logging in, out and signing up. */

const express = require("express");
const { NotFoundError, BadRequestError } = require("../expressError");

const router = new express.Router();
const db = require("../db");

router.get("/login", async function (req, res, next) {
  return res.render("../views/users/login.html");
});

router.post("/login", async function (req, res, next) {
    console.log('database', db.database)
    const username = req.body.username;
    console.log("username", username);
    const result = await db.query(`
        SELECT *
            FROM users
                WHERE username = $1`,
        [username],
    );
    const user = result.rows[0];
    console.log('result', result)
    console.log("user", user);

    if (user) {
        return res.json({ user });
    } else {
        return res.render("../views/users/login.html");
    }
});


router.get("/signup", async function (req, res, next) {
    return res.render("../views/users/signup.html");
  });

module.exports = router;
