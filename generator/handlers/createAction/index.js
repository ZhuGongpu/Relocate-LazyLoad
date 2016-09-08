/**
 * Create a plain action.
 * Created by ZhuGongpu on 16/8/26.
 */
const fs = require("../../utils/fs-promise");
const path = require("path");
const config = require("../../config/filename");
const LogUtils = require("../../utils/log");
const HandlebarsUtils = require("../../utils/handlebars");
const createEmptyActionFile = require("../createEmptyActionFile/index");

const pattern = /($)/g;

function handler(directory, actionName, params, isThreePaced) {
    const filepath = path.join(directory, config.actionFilename);

    return fs.fileExists(filepath).then((fileExists => {
        if (!fileExists) {
            return createEmptyActionFile(directory)
        }
    })).then(() => {
        return fs.readFile(filepath)
    }).then((fileContent) => {
        const content = HandlebarsUtils.renderTemplateFile(
            path.join(__dirname, !isThreePaced ? "./templates/action_plain.hbs" : "./templates/action_three_paced_thunk.hbs"),
            {actionName, params}
        );
        return fileContent.replace(pattern, content);
    }).then(content => {
        return fs.writeFile(filepath, content)
    }).then(() => {
        LogUtils.Success(`[MODIFY]: ${filepath}`);
        return Promise.resolve();
    });
}

module.exports = handler;