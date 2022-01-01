
CREATE DATABASE IF NOT EXISTS shopDB;

USE shopDB;

CREATE TABLE IF NOT EXISTS customers(
    id INTEGER  AUTO_INCREMENT,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS products(
    id INTEGER  AUTO_INCREMENT,
    description TEXT NOT NULL,
    customerId INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (customerId) REFERENCES customers(id)
);

INSERT INTO customers (name, lastname)
    VALUES('Peter', 'Smith');

INSERT INTO products (description, customerId)
    VALUES('Laptop', 1)