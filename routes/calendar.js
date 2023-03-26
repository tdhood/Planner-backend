"use strict";
/** Routes about calendar. */

const express = require("express");
const { NotFoundError, BadRequestError } = require("../nodeSetup/expressError");
const {
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");

const router = new express.Router();
const db = require("../nodeSetup/db");

const User = require("../models/user");
const Calendar = require("../models/calendar");

/** GET / - list of all user bullets
 *  returns { user_data: [{ user, habits, lists, events, tasks, journals }, ...]} */

router.get(
  "/:username",
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const username = req.params.username;

    try {
      const user = await User.get(username);
      const user_id = user.user_id;
      const habits = await Calendar.getHabits(user_id);
      const lists = await Calendar.getLists(user_id);
      const events = await Calendar.getEvents(user_id);
      const tasks = await Calendar.getTasks(user_id);
      const journals = await Calendar.getJournals(user_id);

      const user_data = {
        user: user,
        habits: habits,
        lists: lists,
        events: events,
        tasks: tasks,
        journals: journals,
      };
      return res.json({ user_data });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;