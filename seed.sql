DROP DATABASE IF EXISTS seedDB;
CREATE DATABASE seedDB;
USE seedDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
) ENGINE = InnoDB;

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    foreign key (department_id) references department(id) on delete cascade
) ENGINE = InnoDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    foreign key (role_id) references role(id) on delete cascade,
    foreign key (manager_id) references employee(id) on delete cascade
) ENGINE = InnoDB;


INSERT INTO employee(first_name, last_name)
VALUES ("John", "Doe"), ("Mike", "Chan"), ("Ashley", "Rodriguez");

INSERT INTO role(title, salary)
VALUES ("Sales Lead", 100000), ("Salesperson", 80000), ("Lead Engineer", 150000);

INSERT INTO department (name)
VALUES ("Sales"), ("Sales"), ("Engineering");