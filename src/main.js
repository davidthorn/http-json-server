"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
let start = Date.now();
const shouldfake = true;
const filesToWrite = 1000;
let peoplefilesWritten = 0;
let townsfilesWritten = 0;
console.log(`Writing a total of ${filesToWrite} to 2 databases`);
console.log('Start', start);
const server_1 = __importDefault(require("./server"));
const faker = __importStar(require("faker"));
const completed = async () => {
    const peopleItems = await peopleDb.read();
    const townsItems = await townsDb.read();
    if (((peoplefilesWritten + townsfilesWritten) + (filesToWrite * 2)) > (peopleItems.length + townsItems.length))
        return;
    console.log(`Read items from people: ${peopleItems.length}`);
    console.log(`Read items from towns: ${townsItems.length}`);
    var end = Date.now();
    console.log('Start', start);
    console.log('End', end);
    console.log(`Time taken ${(end - start) / 1000} seconds`);
};
const peopleDb = server_1.default('people', completed);
const townsDb = server_1.default('towns', completed);
const exists = peopleDb.exists('12234');
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class Town {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const run = async () => {
    const peopleItems = await peopleDb.read();
    const townsItems = await townsDb.read();
    peoplefilesWritten += peopleItems.length;
    townsfilesWritten += townsItems.length;
    if (shouldfake) {
        for (let x = 0; x < filesToWrite; x++) {
            peopleDb.add(new Person(faker.random.uuid(), `${faker.name.firstName()} ${faker.name.lastName()}`));
            townsDb.add(new Town(faker.random.uuid(), `${faker.address.city()}`));
        }
    }
    let _exists = await exists;
    if (_exists === false) {
        await peopleDb.add(new Person("12234", `David Thorn`));
    }
};
run();
