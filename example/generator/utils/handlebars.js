/**
 * Handlebars utils
 * Created by ZhuGongpu on 16/8/25.
 */
const handlebars = require('handlebars');
const changeCase = require("change-case");
const FileUtils = require("./file");

function addHelper(name, helper) {
    handlebars.registerHelper(name, helper);
}

//add change-case helpers
addHelper("camelCase", changeCase.camel);
addHelper("snakeCase", changeCase.snake);
addHelper("dashCase", changeCase.param);
addHelper("kabobCase", changeCase.param);
addHelper("dotCase", changeCase.dot);
addHelper("pathCase", changeCase.path);
addHelper("properCase", changeCase.pascal);
addHelper("pascalCase", changeCase.pascal);
addHelper("lowerCase", changeCase.lower);
addHelper("sentenceCase", changeCase.sentence);
addHelper("constantCase", changeCase.constant);
addHelper("titleCase", changeCase.title);

function addPartial(name, partial) {
    handlebars.registerPartial(name, partial);
}

function renderString(template, data) {
    return handlebars.compile(template)(data);
}

function renderTemplateFile(templateFilePath, data) {
    return renderString(FileUtils.readFileSync(templateFilePath).toString(), data);
}

module.exports = {
    addHelper, addPartial, renderString, renderTemplateFile
};