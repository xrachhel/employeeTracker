DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30)
 
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
INSERT INTO department (department)
VALUE ("Sales");
INSERT INTO department (department)
VALUE ("Engineering");
INSERT INTO department (department)
VALUE ("Finance");
INSERT INTO department (department)
VALUE ("Legal");
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ashley", "Rodriguez", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Snider", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Malia","Puterbaugh",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Larivee", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mike", "Doe", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kevin", "Armstrong", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Vlasco", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department
FROM employee 
INNER JOIN role on role.id = employee.role_id
INNER JOIN department on department.id = role.department_id