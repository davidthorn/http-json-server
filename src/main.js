"use strict";
exports.__esModule = true;
var start = Date.now();
var shouldfake = true;
var filesToWrite = 8000;
console.log("Writing a total of " + filesToWrite + " to 2 databases");
console.log('Start', start);
var server_1 = require("./server");
var faker = require("faker");
var peopleDb = server_1["default"]('people');
var townsDb = server_1["default"]('towns');
var exists = peopleDb.exists('12234');
console.log(exists);
var Person = /** @class */ (function () {
    function Person(id, name) {
        this.id = id;
        this.name = name;
    }
    return Person;
}());
var Town = /** @class */ (function () {
    function Town(id, name) {
        this.id = id;
        this.name = name;
    }
    return Town;
}());
if (shouldfake) {
    for (var x = 0; x < filesToWrite; x++) {
        peopleDb.add(new Person(faker.random.uuid(), faker.name.firstName() + " " + faker.name.lastName()));
        townsDb.add(new Town(faker.random.uuid(), "" + faker.address.city()));
    }
}
if (exists === false) {
    peopleDb.add(new Person("12234", "David Thorn"));
}
console.log("Read items from people: " + peopleDb.read().length);
console.log("Read items from towns: " + townsDb.read().length);
var end = Date.now();
console.log('Start', start);
console.log('End', end);
console.log("Time taken " + (end - start) / 1000 + " seconds");
