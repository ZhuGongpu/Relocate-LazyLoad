/**
 * File Utils
 * Created by ZhuGongpu on 16/8/25.
 */
var fs = require('fs');

/**
 * list every file in dir and its sub-dirs
 */
const walk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory())
            results = results.concat(walk(file));
        else
            results.push(file)
    });

    return results
};

/**
 * list all subdirectories in folder
 * @param dir
 * @return {Array}
 */
const subdirectory = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results.push(file);
            results = results.concat(subdirectory(file));
        }
    });

    return results
};

/**
 *
 * @param path
 * @return whether the path exists
 */
const exists = (path) => {
    return fs.existsSync(path);
};

function readFileSync(path) {
    return fs.readFileSync(path);
}

module.exports = {
    walk, exists, subdirectory, readFileSync
};