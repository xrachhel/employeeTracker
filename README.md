# Employee Tracker

## Description
This application is a Content Management System interface, which is built for non-developers to view and interact with information stored in databases. The Employee Tracker was built with node, inquirer, and MySQL to manage a company's employees. 


## Technologies Used

* [Javscript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): high level programming language
* [Node.js](https://developer.mozilla.org/en-US/docs/Web/API/Node): Javascript runtime, allows users to run Javascript on the server
* [Express](https://expressjs.com/): Web framwork for Node.js
* [MySQL](https://www.mysql.com/): Open-source relational database management system
* [Console.table](https://www.npmjs.com/package/console.table): Prints objects as a table in console


## Demo
1. Navigate into employeeTracker file in terminal
2. run 'npm install' to install dependencies (express, mysql, console.table) needed for this application
3. Run 'npm start' in terminal, a message saying 'connected as ____' will be displayed. This means the application is running in your terminal.


![gif](public/assets/siteDemo.gif)


## Code Snippet

```
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
        })

    })
}

```
This portion of the script file displays the API route for posting a new note using express. 'app.post' is used to handle POST requests (a 'body parser' is needed to handle POST requests- lines 1-2). The variable 'newNote' is given the value of 'req.body', which is an object containing text from the parsed request body. 'db.json', which is a json file containing all the notes, is read and this data is parsed in order for it to become a Javascript object. 'newNote' is then pushed into the JSON data array, and each post is given an ID so a note with a specific ID can then be deleted later on. 

## Authors

**Rachel Yeung**
* [Portfolio](https://xrachhel.github.io/updatedPortfolio/)
* [Github](https://github.com/xrachhel)
* [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)

