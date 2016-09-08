/**
 * Log Utils
 * Created by ZhuGongpu on 16/8/25.
 */
const chalk = require("chalk");

const Log = (text) => console.log(text);

const Error = (error) => console.error(chalk.red(error));

const Success = (success) => Log(chalk.green(success));

module.exports = {
    Log, Error, Success
};