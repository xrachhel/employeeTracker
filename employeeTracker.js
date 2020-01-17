// Dependencies
var mysql = require("mysql")
var inquirer = require("inquirer")
var cTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
})
connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
    start()
});

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
        }
    })
}


function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
        if (err) throw err

        console.table(res)
        start()
    })

}

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
                // console.log(res)
            })
        })
    })

}

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
                console.table(roleArr)
                start()
                // console.log(res)
            })
        })
    })
    
}

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
            // choices: asdfdsf
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            // choices: //AHHLKDFJLSD:KFJ:OISDHKFJIULKJSDBFLjk
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName
        })

    })
}

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
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?"
        }
    ]).then(function (res) {
        //asdfsdf
        console.log("Added Role")
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            // choices: SLDKFJSD
        },
        {
            type: "list",
            name: "role",
            message: "Which role do you want to assign the selected employee?",
            // choices: aldksfjadf
        }
    ])
}

// function updateManager(){
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "manager",
//             message: "Which employee's manager do you want to update?",
//             // choices: aklsdjfhaljksdf
//         },
//         {
//             type: "list",
//             name: "employee",
//             message: "Which employee do you want to set as manager for the selected employee?",
//             // choices: kljdalhfsdf
//         }
//     ])
// }


// function removeEmployee(){
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "employee",
//             message: "Which employee do you want to remove?",
//             // choices: alksdfjasdf
//         }
//     ])
// }