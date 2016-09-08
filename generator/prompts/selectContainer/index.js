/**
 * Select a container by name.
 * Created by ZhuGongpu on 16/8/26.
 */
const inquirer = require("inquirer");
const file = require("../../utils/file");
const config = require("../../config/sourceRoot");

const projectFiles = file.subdirectory(config.containerRoot);

function fileMatchComponent(componentName, filepath) {
    return new RegExp(componentName, 'i').test(filepath);//ignore case
}

function prompt() {
    return inquirer.prompt([{
        type: "input",
        name: "componentName",
        message: "Enter the container name:",
        validate: (componentName) => {
            if (!componentName || componentName.length == 0) {
                return "Container name is empty."
            }
            return projectFiles.some((item) => fileMatchComponent(componentName, item))
                || "Container not found.";
        }
    }, {
        type: "list",
        name: "directory",
        message: "Choose one of the candidates:",
        choices: (answer) => projectFiles.filter(item => fileMatchComponent(answer.componentName, item)),
        when: (answers) => {
            const pathCandidates = projectFiles.filter(item => fileMatchComponent(answers.componentName, item));

            if (pathCandidates.length > 1) {
                return true;
            } else {
                answers.directory = pathCandidates[0];
                return false;
            }
        }
    }]).then(answers => answers.directory)
}

module.exports = prompt;