"use strict";
exports.__esModule = true;
var fs = require("fs");
/**
 *
 *
 * @param {string} name
 * @returns
 */
function Database(name) {
    var items = [];
    var dbFolder = './db';
    var eventsDbPath = dbFolder + "/" + name + ".json";
    var dir_permission = '0700';
    var file_permission = '0600';
    var encoding = 'binary';
    if (!fs.existsSync(dbFolder)) {
        fs.mkdirSync(dbFolder, dir_permission);
    }
    if (!fs.existsSync(eventsDbPath)) {
        fs.writeFileSync(eventsDbPath, new Buffer(JSON.stringify([])), { mode: file_permission });
    }
    /**
     * Adds an Identiable to the database
     *
     * @param {Identifiable} item
     */
    var add = function (item) {
        var contents = read();
        contents.push(item);
        write(contents);
    };
    /**
     *  Reads all of the Identifiables from the database
     *
     * @returns
     */
    var read = function () {
        var content = fs.readFileSync(eventsDbPath, encoding);
        var items = JSON.parse(content);
        return items;
    };
    /**
     * Writes the Identifiables to the database
     *
     * @param {Identifiable[]} data
     */
    var write = function (data) {
        var buffer = new Buffer(JSON.stringify(data));
        fs.writeFileSync(eventsDbPath, buffer, { mode: file_permission });
    };
    /**
     * Checks if this Identifiable exists in the database
     *
     * @param {string} id
     * @returns {Boolean}
     */
    var exists = function (id) {
        var items = read().filter(function (item, index, array) {
            if (item.id === id) {
                return array[index];
            }
        });
        return items.length === 1;
    };
    return {
        add: add,
        read: read,
        exists: exists
    };
}
exports["default"] = Database;
