const Employee = require("./Employee");

// lets create the engingeer class

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getgithub() {
        return this.github;
    }
}

module.exports = Engineer;