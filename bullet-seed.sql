-- both test users have the password "password"


INSERT INTO users (username, password, first_name, last_name, email)
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
        'user2@user.com');

INSERT INTO tables (table_name, user_id)
VALUES  ('habits', 1),
        ('moods', 1),
        ('lists', 1),
        ('tasks', 1),
        ('events', 1),
        ('journals', 1);

INSERT INTO habits (title, description, days, user_id, timestamp)
VALUES ('habit1',
        'habit1 description',
        'M W F',
        1,
        '2023-1-1 12:00:00'),
        ('habit2',
        'habit2 description',
        'SA SU',
        1,
        '2023-1-1 13:00:00'),
        ('habit3',
        'habit3 description',
        'M',
        1,
        '2023-1-1 13:30:00');

INSERT INTO events (title, description, date_start, date_end, time_start, time_end, user_id)
VALUES ('event1', 
        'event1 description', 
        '2023-01-01', 
        '2023-01-01', 
        '09:00:00', '10:00:00', 
        1),
        ('event2', 
        'event2 description', 
        '2023-02-02', 
        '2023-02-02', 
        '11:00:00', '12:00:00', 
        1),
        ('event3', 
        'event3 description', 
        '2023-03-03', 
        '2023-03-03', 
        '12:00:00', '13:00:00', 
        1);

INSERT INTO lists (title, description, user_id)
VALUES ('list1',
        'list1 description',
        1),
        ('list2',
        'list2 description',
        1),
        ('list3',
        'list3 description',
        1);

INSERT INTO list_items (content, list_id)
VALUES ('item1', 1), ('item2', 1), ('item3', 1),
        ('item1', 2), ('item2', 2), ('item3', 2),
        ('item1', 3), ('item2', 3), ('item3', 3);

INSERT INTO journals (title, content, user_id)
VALUES ('journal1',
        'journal1 entry',
        1),
        ('journal2',
        'journal2 entry',
        1),
        ('journal3',
        'journal3 entry',
        1);

INSERT INTO bullets (user_id, table_id)
VALUES (1,1), (1,2), (1,3), (1,4), (1,5), (1,6);