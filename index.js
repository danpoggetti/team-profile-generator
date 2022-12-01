const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")
const { AsyncLocalStorage } = require("async_hooks")
const { isTypedArray } = require("util/types")

const Manager = rquire("./lib/Manager")
const Engineer = rquire("./lib/Engineer")
const Intern = rquire("./lib/Intern")

const teamMembers = [];

function appMenu() {
    function createManager() {
        console.log("Please create your team!")
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the name of the team manager?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the ID of the team manager?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number that is greater than zero!";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the email of the team manager?",
                validate: answer => {
                    const pass = answer.match(
                        /\$+@\$+\.\$+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the office number of the team manager?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero!";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.ManagerID, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }
}