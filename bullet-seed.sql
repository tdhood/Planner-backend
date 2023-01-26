-- both test users have the password "password"

INSERT INTO users (username, password, firstName, lastName, email)
VALUES ('user',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'userFirst',
        'userLast',
        'user@user.com')