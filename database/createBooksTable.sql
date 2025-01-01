-- Will phase this file out closer to production

-- CREATE DATABASE shelf_space;
-- USE shelf_space;

-- CREATE TABLE IF NOT EXISTS books (
--     id integer PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(255) NOT NULL,
--     contents TEXT NOT NULL,
--     created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE books
-- ADD COLUMN cover_img VARCHAR(100),
-- ADD COLUMN author_id INT;


-- ALTER TABLE books 
-- ADD CONSTRAINT FK_Authors
-- FOREIGN KEY (author_id)
-- REFERENCES authors (id); 


-- INSERT INTO books (title, contents)
-- VALUES ('Babel', 'An arcane history'),
--        ('Poppy War', 'War on ideas');