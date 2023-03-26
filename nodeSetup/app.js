/** Bullet express application. */

const express = require("express");
const app = express();
const cors = require("cors");


const { authenticateJWT } = require("../middleware/auth");
const { NotFoundError } = require("./expressError");
const calendarRoutes = require("../routes/calendar");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth")

app.use(cors());
// process JSON body => req.body
app.use(express.json());
// app.use(authenticateJWT);
app.use(authenticateJWT);

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/myCalendar", calendarRoutes);
app.use("/user", userRoutes);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});


module.exports = app;
