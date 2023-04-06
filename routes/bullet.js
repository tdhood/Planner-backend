"use strict";
/** Routes about calendar. */

const express = require("express");
const jsonschema = require("jsonschema");
const { NotFoundError, BadRequestError } = require("../nodeSetup/expressError");
const {
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");

const router = new express.Router();
const db = require("../nodeSetup/db");

const User = require("../models/user");
const Bullet = require("../models/bullet");

const taskNewSchema = require("../schemas/taskListNew.json")

/** GET / =>
*   { user_data: [{ user, habits, lists, events, tasks, journals }, ...]} 
*
* Authorization required: Logged In, and CorrectUser or Admin
*/
router.get(
  "/:username",
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const username = req.params.username;

    try {
      const user = await User.get(username);
      const user_id = user.user_id;
      const habits = await Bullet.getHabits(user_id);
      const lists = await Bullet.getLists(user_id);
      const events = await Bullet.getEvents(user_id);
      const tasks = await Bullet.getTaskList(user_id);
      const journals = await Bullet.getJournals(user_id);

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

//++++++++ Tasks ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/** POST / { tasklist } => { tasklist }
 * 
 * tasklist should be { title, description, user_id }
 * 
 * Returns { tasklist: { id, title, user_id }}
 * 
 * Authorization required: logged in, current user or admin
 * 
 */

router.post('/:username/tasklist/new', 
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    console.log('new tasklist route')
    const username = req.params.username;
    const user = await User.get(username)
    console.log('body', req.body)

    const validator = jsonschema.validate(
      req.body,
      taskNewSchema,
      {required: true}
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    
    const tasklist = await Bullet.addTaskList(req.body);
    return res.status(201).json({tasklist});
    
  })


module.exports = router;