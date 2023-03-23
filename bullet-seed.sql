-- both test users have the password "password"


INSERT INTO tables (table_name)
VALUES  ('habits'),
        ('moods'),
        ('lists'),
        ('tasks'),
        ('events'),
        ('journals')

INSERT INTO users (username, password, firstName, lastName, email)
VALUES ('user',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'userFirst',
        'userLast',
        'user@user.com'),
        ('user1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'user1First',
        'user1Last',
        'user1@user.com'),
        ('user2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'user2First',
        'user2Last',
        'user2@user.com')

INSERT INTO habit (title, description, days, user_id, timestamp)
VALUES ('habit1',
        'habit1 description',
        'M W F',
        1,
        '2023-1-1 12:00'),
        ('habit2',
        'habit2 description',
        'SA SU',
        1,
        '2023-1-1 13:00'),
        ('habit3',
        'habit3 description',
        'M',
        1,
        '2023-1-1 13:30')

INSERT INTO events (title, description, date_start, date_end, time_start, time_end, user_id)
VALUES ('event1', 
        'event1 description', 
        2023-01-01, 
        2023-01-01, 
        09:00:00, 10:00:00, 
        1),
        ('event2', 
        'event2 description', 
        2023-02-02, 
        2023-02-02, 
        11:00:00, 12:00:00, 
        1),
        ('event3', 
        'event3 description', 
        2023-03-03, 
        2023-03-03, 
        12:00:00, 13:00:00, 
        1)

INSERT INTO lists (title, description, content, user_id)
VALUES ('list1',
        'list1 description',
        ['item1', 'item2', 'item3'],
        1),
        ('list2',
        'list2 description',
        ['item1', 'item2', 'item3'],
        1),
        ('list3',
        'list3 description',
        ['item1', 'item2', 'item3'],
        1)

INSERT INTO journals (title, content, user_id)
VALUES ('journal1',
        'journal1 entry',
        1),
        ('journal2',
        'journal2 entry',
        1),
        ('journal3',
        'journal3 entry',
        1)

INSERT INTO bullets (user_id, table_id)
VALUES (1,1), (1,2), (1,3), (1,4), (1,5), (1,6)