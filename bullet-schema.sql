CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  days TEXT NOT NULL,
  value INTEGER,
  is_tracking BOOLEAN NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  days TEXT NOT NULL,
  value INTEGER,
  is_tracking BOOLEAN NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP NOT NULL
);