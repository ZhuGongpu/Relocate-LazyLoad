/**
 * Main entry
 * Created by ZhuGongpu on 16/8/25.
 */

const inquirer = require("inquirer");
const LogUtils = require("./utils/log");
const generatorList = require("./genrators");
const argv = require('minimist')(process.argv.slice(2));

const generator = new RegExp(argv._.join("(\\s|_)*"), 'i');
var filteredGeneratorList = generatorList.filter(item => generator.test(item.name));

if (filteredGeneratorList.length == 0) {
    LogUtils.Error("Generator Not Found!");
    filteredGeneratorList = generatorList;
}
else if (filteredGeneratorList.length == 1) {
    filteredGeneratorList[0].value()
} else {
    inquirer.prompt({
        type: "list",
        name: "generator",
        message: "Please choose a generator:",
        choices: filteredGeneratorList,
    }).then(answer => {
        return answer.generator();
    });
}