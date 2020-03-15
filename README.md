# Employee Tracker

## Description
This application is a Content Management System interface, which is built for non-developers to view and interact with information stored in databases. The Employee Tracker was built with node, inquirer, and MySQL to manage a company's employees. 

## Demo
1. Navigate into employeeTracker file in terminal
2. run 'npm install' to install dependencies (express, mysql, console.table) needed for this application
3. Run 'node employeeTracker.js' in terminal, a message saying 'connected as ____' will be displayed. This means the application is running in your terminal.


![gif](assets/siteDemo.gif)

## Technologies Used

* [Javscript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): used to create responsive, interactive elements on the page
* [Node.js](https://developer.mozilla.org/en-US/docs/Web/API/Node): Javascript runtime, allows users to run Javascript on the server
* [Express](https://expressjs.com/): Web framwork for Node.js
* [SQL](https://www.mysql.com/): Standard language for storing, manipulating, and retrieving data in databases
* [MySQL](https://www.mysql.com/): Open-source relational database management system
* [Console.table](https://www.npmjs.com/package/console.table): Prints objects as a table in console

## Code snippet

```
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

```
This portion of the script file displays the function for the user to add an employee into the database. The first two questions in the prompt are inputs, but asking for the employee's role and manager requires a list of existing roles and managers from the database to be shown. In order to do that, seperate functions had to be written to make a query and read all the role and manager names from the role and employee table respectively. In those two functions, all the names were pushed into an array, which could then be displayed as a list in the prompt. After all the questions are answered, the index of (+1) the role and manager picked were set into the employee table using the query, since the employee table requires a 'role id' and a 'manager id'. The initial prompts are run at the end of the function so users can call for other functions.

## Authors

**Rachel Yeung**
* [Portfolio](https://rachelyeung.herokuapp.com/)
* [Github](https://github.com/xrachhel)
* [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)

