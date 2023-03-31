
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE tables (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(10) NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  days TEXT NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  content TEXT,
  list_id INTEGER NOT NULL
    REFERENCES lists ON DELETE CASCADE,
  timestamp TIMESTAMP
);

-- TODO: add updated at timestamp
CREATE TABLE journals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE task_lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE task_items (
  id SERIAL PRIMARY KEY,
  content TEXT,
  priority INTEGER,
  is_completed BOOLEAN,
  list_id INTEGER NOT NULL
    REFERENCES task_lists ON DELETE CASCADE,
  timestamp TIMESTAMP
);

CREATE TABLE bullets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE,
  table_id INTEGER NOT NULL
    REFERENCES tables ON DELETE CASCADE
);