/**
 * Create an empty action file (if not exists) from template and add an action prefix constant.
 * Created by ZhuGongpu on 16/8/26.
 */

const path = require("path");
const fs = require("../../utils/fs-promise");
const LogUtils = require("../../utils/log");
const HandlebarsUtils = require("../../utils/handlebars");
const createNewFile = require("../createNewFile");
const filenameConfig = require("../../config/filename");
const sourceRootConfig = require("../../config/sourceRoot");

//Find EOF
const pattern = /($)/g;

const handler = function (directory) {
    const filepath = path.join(directory, filenameConfig.actionFilename);
    const actionPrefix = directory.replace(sourceRootConfig.containerRoot, 'app');

    return createNewFile(filepath).then(() => {
        return fs.readFile(filepath);
    }).then(fileContent => {
        const content = HandlebarsUtils.renderTemplateFile(
            path.join(__dirname, "./template/action_empty.hbs"), {actionPrefix});

        if (new RegExp(content).test(fileContent)) {
            return fileContent;
        } else { // only if ACTION_PREFIX is not defined
            return fileContent.replace(pattern, content);
        }
    }).then((content) => {
        return fs.writeFile(filepath, content);
    }).then(() => {
        LogUtils.Success(`[MODIFY]: ${filepath}`);
    });
};

module.exports = handler;