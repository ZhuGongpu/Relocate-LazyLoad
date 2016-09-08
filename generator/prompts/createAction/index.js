/**
 * Prompt questions to create an action
 * Created by ZhuGongpu on 16/8/26.
 */
const fs = require("../../utils/fs-promise");
const path = require("path");
const config = require("../../config/filename");
const createEmptyActionFile = require("../../handlers/createEmptyActionFile/index");
const inquirer = require("inquirer");
const selectContainerPrompt = require("../selectContainer");

const createActionPrompt = (directory) => {
    return inquirer.prompt([{
        type: "input",
        name: "actionName",
        message: "Enter the action name:",
        validate: (actionName) => {
            return actionName.length > 0 || "Action name is empty."
        }
    }, {
        type: "confirm",
        name: "isThreePaced",
        message: "Is this a three-paced action?",
        default: (answers) => /request/i.test(answers.actionName)
    }, {
        type: "input",
        name: "params",
        message: "Enter the params:",
        when: (answers) => !answers.isThreePaced
    }, {
        type: "input",
        name: "params",
        message: "Enter the params of the thunk:",
        when: (answers) => answers.isThreePaced
    }]).then(answers => {
        answers.directory = directory;
        return answers;
    })
};

function prompt() {
    return selectContainerPrompt().then(directory => {
        return createActionPrompt(directory)
    })
}

module.exports = prompt;