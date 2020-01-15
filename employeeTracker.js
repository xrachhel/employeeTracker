// Dependencies
var mysql = require("mysql")
var inquirer = require("inquirer")
var consoleTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "seedDB"
})
connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
});

inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
    }
]).then(function (res) {
    switch (res.action) {
        case "View All Employees":
            viewAll();
            break;
        case "View All Employees By Department":
            viewDept();
            break;
        case "View All Employees by Roles":
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
    }
})

function viewAll(){
    
}

function viewDept(){
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Which department's employees would you like to see?"
            // choices: asdfsfd

        }
    ])
}

function viewRole(){
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which role would you like to see employees from?",
            // choices: asldfkadsf
        }
    ])
}

function addEmployee(){
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
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            // choices: //AHHLKDFJLSD:KFJ:OISDHKFJIULKJSDBFLjk
        }
    ])
}

function addDept(){
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?"
        }
    ]).then(function(res){
        //asdfasdfasdf
        console.log("Added Department")
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?"
        }
    ]).then(function(res){
        //asdfsdf
        console.log("Added Role")
    })
}

function updateEmployee(){
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

// add dept: 
// what is the name of the depaartment (input)

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