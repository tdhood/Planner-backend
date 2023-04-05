"use strict";

const db = require("../nodeSetup/db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../nodeSetup/expressError");

const { BCRYPT_WORK_FACTOR } = require("../nodeSetup/config.js");

/** Related functions for calendar page. */

class Calendar {
  /** Get habit info for a specific user id
   *
   * Returns habit data
   *
   * Habit data should be { id, title, description, days, timestamp}
   */
  static async getHabits(id) {
    const habits = await db.query(
      `SELECT h.id, h.title, h.description, h.days, h.timestamp
        FROM habits h
          INNER JOIN users u
            ON h.user_id = u.id
              WHERE u.id = $1`,
      [id]
    );
    return habits.rows;
  }

  /** Get event info for a specific user id
   *
   * Returns event data
   *
   * Event data should be { id, title, description, date_start, date_end, time_start, time_end}
   */
  static async getEvents(id) {
    const events = await db.query(
      `SELECT e.id, e.title, e.description, e.date_start, e.date_end, e.time_start, e.time_end
        FROM events e
          INNER JOIN users u
            ON e.user_id = u.id
              WHERE u.id = $1`,
      [id]
    );
    return events.rows;
  }

  /** Get journal info for a specific user id
   *
   * Returns journal data
   *
   * Journal data should be { id, title, content, timestamp}
   */
  static async getJournals(id) {
    const journals = await db.query(
      `SELECT j.id, j.title, j.content, j.timestamp
        FROM journals j
         INNER JOIN users u
            ON j.user_id = u.id
              WHERE u.id = $1`,
      [id]
    );
    return journals.rows;
  }

  /** Get task info for a specific user id
   *
   * Returns task data
   *
   * Task data should be { id, title, description, priority }
   */
  static async getTasks(id) {
    const tasks = await db.query(
      `SELECT tl.id, tl.title, tl.description, ARRAY_AGG(ti.priority ||','|| ti.content || ',' || ti.is_completed ORDER BY ti.priority) as content, tl.timestamp
        FROM task_lists tl
          INNER JOIN users u
            ON tl.user_id = u.id
              INNER JOIN task_items ti
                ON tl.id = ti.list_id
                  WHERE u.id = $1
                    GROUP BY tl.id`,
      [id]
    );
    return tasks.rows;
  }

  /** Get ;ist info for a specific user id
   *
   * Returns list data
   *
   * List data should be { id, title, description, [content], timestamp }
   */
  static async getLists(id) {
    const lists = await db.query(
      `SELECT l.id, l.title, l.description, ARRAY_AGG(li.content) as content, l.timestamp
        FROM lists l
          INNER JOIN users u
            ON l.user_id = u.id
              INNER JOIN list_items li
                ON l.id = li.list_id
                  WHERE u.id = $1
                    GROUP BY l.id`,
      [id]
    );

    return lists.rows;
  }
}

module.exports = Calendar;
