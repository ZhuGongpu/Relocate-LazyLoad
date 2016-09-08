/**
 * Create a new empty file (if not exists) with author and date only.
 * Created by ZhuGongpu on 16/8/25.
 */

const path = require("path");
const HandlebarsUtils = require("../../utils/handlebars");
const LogUtils = require("../../utils/log");
const username = require("../../utils/user");
const date = require("../../utils/date").getCurrentDate();
const fs = require("../../utils/fs-promise");

/**
 * @param filepath
 * @return {Promise.<TResult>}
 */
const handler = function (filepath) {
    const directory = path.dirname(filepath);
    return fs.fileExists(directory)
        .then(directoryExists => {
            if (!directoryExists) {
                return fs.makeDir(directory);
            }
            return fs.fileExists(filepath)
        }).then((fileExists) => {
            if (fileExists == true) // if dir not exists, fileExists is filepath
                return Promise.resolve(filepath);

            const content = HandlebarsUtils.renderTemplateFile(
                path.join(__dirname, "./template/file_empty.hbs"), {
                    username, date
                }
            );
            return fs.writeFile(filepath, content)
                .then(() => {
                    LogUtils.Success(`[ADD]: ${filepath}`);
                    return filepath;
                });
        });
};

module.exports = handler;