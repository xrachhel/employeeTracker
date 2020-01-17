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
VALUE ("Lawyer", 190000, 4);f
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