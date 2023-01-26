\echo 'Delete and recreate bullet db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE bullet;
CREATE DATABASE bullet;
\connect bullet

\i bullet-schema.sql
\i bullet-seed.sql

\echo 'Delete and recreate bullet_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE bullet_test;
CREATE DATABASE bullet_test;
\connect bullet_test

\i bullet-schema.sql