CREATE DATABASE shelf_space;
USE shelf_space;

CREATE TABLE IF NOT EXISTS books (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO books (title, contents)
-- VALUES ('Babel', 'An arcane history'),
--        ('Poppy War', 'War on ideas');