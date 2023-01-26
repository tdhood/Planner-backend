"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *
     * Returns { username, email, is_admin }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/
    static async authenticate(username, password) {
    // try to find the user first
        const result = await db.query(
                `SELECT username,
                        password,
                        email,
                FROM users
                WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
            delete user.password;
            return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
   *
   * Returns { username, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

    static async register(
    { username, password, email, firstName, lastName}) {
        const duplicateCheck = await db.query(
            `SELECT username
                FROM users
                WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                (username,
                password,
                email,
                firstName,
                lastName)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING username, email`,
            [
            username,
            hashedPassword,
            firstName,
            lastName,
            email,
            ],
        );

        const user = result.rows[0];

        return user;
    }

      /** Given a username, return data about user.
   *
   * Returns { username, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

    // static async get(username) {
    //     const userRes = await db.query(
    //         `SELECT username,
    //                 first_name AS "firstName",
    //                 last_name AS "lastName",
    //                 email,
    //                 is_admin AS "isAdmin"
    //         FROM users
    //         WHERE username = $1`,
    //         [username],
    //     );

    //     const user = userRes.rows[0];

    //     if (!user) throw new NotFoundError(`No user: ${username}`);

    //     return user;
    // }
}

module.exports = User;