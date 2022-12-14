const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")

const Manager = require("./lib/Manager.js")
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/pageTemplate");

const teamMembers = [];
const idArray = [];

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
                        /\S+@\S+\.\S+/
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
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }


    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of member do you want to add?",
                choices: ["Engineer", "Intern", "I actually do not want to add more members."]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                    case "Intern":
                        createIntern();
                        break;
                        default:
                            buildTeam();
            }
        });
    }

    function createEngineer() {
        console.log("Please enter engineer information")
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the name of the Engineer?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is the ID of the Engineer?",
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
                name: "engineerEmail",
                message: "What is the email of the Engineer?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Github for the Engineer?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function createIntern() {
        console.log("Please enter intern information.")
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the name of the Intern?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "internID",
                message: "What is the ID of the Intern?",
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
                name: "internEmail",
                message: "What is the email of the intern?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does the Intern attend?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();


}

appMenu();