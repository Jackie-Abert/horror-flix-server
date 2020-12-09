BEGIN;

TRUNCATE
    movie_table,
    users
    RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, email, password)
VALUES
-- password = "pass"
('admin', 'admin@gmail.com','$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'),
('jackie', 'jackie@gmail.com','$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'),
('laila', 'laila@gmail.com','$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG');


INSERT INTO movie_table (title, genre, rating, watched, user_id)
VALUES
('Scream', 'Slasher', 4, true, 1),
('The Fog', 'Slasher', 5, true, 1),
('World War Z', 'Zombie', 5, true, 1),
('Pumpkin Head', 'Slasher', 4, true, 2),
('The Fog', 'Slasher', 5, true, 2),
('Train to Busan', 'Zombie', 5, true, 2),
('Scream', 'Slasher', 4, true, 3),
('The Fog', 'Slasher', 5, true, 3),
('Night of the Living Dead', 'Zombie', 5, true, 3);

COMMIT;