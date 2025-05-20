CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO teachers (username, password)
VALUES ('Claudine', '$2b$10$uEJZ1Iqdd0RzG6.nM/5uZOWGIDQAf8QKM3FoPgLkAZP9MZKZBumDi'); -- password is '123'

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  reg_no VARCHAR(50) UNIQUE,
  class VARCHAR(100)
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  date DATE,
  status VARCHAR(10)
);
