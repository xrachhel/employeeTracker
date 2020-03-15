// Dependencies
var mysql = require("mysql")
var inquirer = require("inquirer")
var cTable = require("console.table")

// Create connection for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
})
// Connect to mysql server and database
connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
    start()
});

// function which prompts the user for what action they should take
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees by Role", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"]
        }
    ]).then(function (res) {
        switch (res.action) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Employees By Department":
                viewDept();
                break;
            case "View All Employees by Role":
                viewRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDept();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "Exit":
                return;
        };
    });
};

// View list of all employees
function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function (err, res) {
        if (err) throw err

        console.table(res)
        start()
    });
};

// View list of employees by department
function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err

        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department's employees would you like to see?",
                choices: function () {
                    var choiceArray = []
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].department)
                    }
                    return choiceArray
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
                var deptArr = []
                for (var i = 0; i < res.length; i++) {
                    if (answer.department === res[i].department) {
                        deptArr.push(res[i])
                    }
                }
                console.table(deptArr)
                start()
            });
        });
    });
};

// View list of employees by role
function viewRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Which role's employees would you like to see?",
                choices: function () {
                    var choiceArray = []
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title)
                    }
                    return choiceArray
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
                var roleArr = []
                for (var i = 0; i < res.length; i++) {
                    if (answer.role === res[i].title) {
                        roleArr.push(res[i])
                    }
                }
                console.table(roleArr);
                start();
            });
        });
    });
};

// Select types of roles from database
var roleArr = []
function readRoles() {
    
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        };
    });
    return roleArr
};

// Select managers from database
var managerArr = []
function readManager() {
   
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name + " " + res[i].last_name)
        };
    });
    return managerArr
};

// Add employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: readRoles()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: readManager()
        }
    ]).then(function (answers) {
        var roleId = readRoles().indexOf(answers.role) + 1
        var managerId = readManager().indexOf(answers.manager) + 1
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            manager_id: managerId,
            role_id: roleId
        }, function(err){
            if (err) throw err
            console.log("Added Employee!")
            start()
        });
    });
};

// Add department
function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ?", {
            department: res.department
        })
        console.log("Added Department")
        start();
    });
};

// Add role
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role SET?", {
            title: res.role
        })
        console.log("Added Role")
        start();
    });
};

// Update employee's role
function updateEmployee() {
    connection.query("SELECT employee.first_name, role.title FROM employee INNER JOIN role on role.id = employee.role_id ", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                // Choice data from MySQL query
                choices: function () {
                    var employeeArr = []
                    for (var i = 0; i < res.length; i++) {
                        employeeArr.push(res[i].first_name)
                    }
                    return employeeArr
                }
            },
            {
                type: "list",
                name: "role",
                message: "Which role do you want to assign the selected employee?",
                // Choice data from MySQL query
                choices: function () {
                    var roleArr = []
                    for (var i = 0; i < res.length; i++) {
                        roleArr.push(res[i].title)
                    }
                    return roleArr
                }
            }
        ]).then(function(answer){
            var roleId = readRoles().indexOf(answer.role) + 1
            connection.query("UPDATE employee SET ? WHERE ? ", 
            [
                {
                    role_id: roleId
                },
                {
                    first_name: answer.employee
                }
            ], 
            function(err, res){
                if(err) throw err
                console.log("Updated Role!")
                start();
            });
        });
    });
};
