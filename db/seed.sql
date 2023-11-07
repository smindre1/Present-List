USE present_db;
SELECT * FROM lists;

INSERT INTO users (username, email, password)
VALUES ("user", "user@gmail.com", "password");

INSERT INTO lists (title, theme, user_id)
VALUES ("List Title", Null, 1), ("Empty", Null, 1);

INSERT INTO list_items (recipient, price, present, date, list_id)
VALUES ("Bob", "3:00$", "Present 1", Null, 1 ),
("Jerry", "6:00$", "Present 2", Null, 1 ),
("Tom", "9:00$", "Present 3", Null, 1 ),
("Chuck", "12:00$", "Present 4", Null, 1 );