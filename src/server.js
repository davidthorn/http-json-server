"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function contains(identiable, items) {
    return items.filter(i => {
        if (i.id === identiable.id) {
            return i;
        }
    }).length === 1;
}
/**
 *
 *
 * @param {string} name
 * @returns
 */
function Database(name, completion) {
    let writesPerCycle = 60;
    let totalInFile = 0;
    let items = [];
    let waitingToWrite = [];
    let lock = false;
    const dbFolder = './db';
    const eventsDbPath = `${dbFolder}/${name}.json`;
    const dir_permission = '0700';
    const file_permission = '0600';
    const encoding = 'binary';
    if (!fs.existsSync(dbFolder)) {
        fs.mkdirSync(dbFolder, dir_permission);
    }
    if (!fs.existsSync(eventsDbPath)) {
        fs.writeFileSync(eventsDbPath, new Buffer(""), { mode: file_permission });
    }
    /**
     * Adds an Identiable to the database
     *
     * @param {Identifiable} item
     */
    const add = (item) => {
        write([item]);
    };
    /**
     *  Reads all of the Identifiables from the database
     *
     * @returns
     */
    const read = async () => {
        if (lock) {
            return Promise.resolve(items);
        }
        const content = fs.readFileSync(eventsDbPath, encoding);
        let _items = JSON.parse(`[${content}]`);
        totalInFile = _items.length;
        items = _items; /// place in memory
        return Promise.resolve(items);
    };
    /**
     * Writes the Identifiables to the database
     *
     * @param {Identifiable[]} data
     */
    const write = (data) => {
        if (lock) {
            data.forEach(i => {
                if (!contains(i, waitingToWrite)) {
                    waitingToWrite.push(i);
                }
            });
            return;
        }
        lock = true;
        if (waitingToWrite.length >= writesPerCycle) {
            for (let v = writesPerCycle - 1; v >= 0; v--) {
                const last = waitingToWrite.pop();
                if (last === undefined)
                    return;
                data.push(last);
            }
        }
        if (items.length === 0) {
            const content = fs.readFileSync(eventsDbPath, encoding);
            items = JSON.parse(`[${content}]`);
            totalInFile = items.length;
        }
        data.forEach(i => {
            if (!contains(i, items) && !contains(i, waitingToWrite)) {
                const buffer = new Buffer(`${items.length === 0 ? '' : ','}${JSON.stringify(i)}`);
                fs.appendFile(eventsDbPath, buffer, { mode: file_permission }, (error) => {
                    data.forEach(i => {
                        if (!contains(i, items)) {
                            items.push(i);
                        }
                    });
                    totalInFile = items.length;
                    lock = false;
                    // const newFiles: Identifiable[] = []
                    // for (let v = waitingToWrite.length >= writesPerCycle ? 
                    //     writesPerCycle-1 : waitingToWrite.length - 1; v >= 0; v--) {
                    //     const last = waitingToWrite.pop()
                    //     if (last === undefined) {
                    //         write(newFiles)
                    //         return
                    //     }
                    //     newFiles.push(last)
                    // }
                    // console.log(`numer of new files to be written is: ${newFiles.length}`)
                    // if(newFiles.length === 0)  {
                    //     //completion()
                    //     return
                    // }
                    writesPerCycle += 10;
                    let newFiles = [];
                    for (let v = waitingToWrite.length - 1; v >= 0; v--) {
                        let i = waitingToWrite.pop();
                        if (i !== undefined) {
                            newFiles.push(i);
                        }
                    }
                    if (newFiles.length === 0) {
                        return completion();
                    }
                    write(newFiles);
                });
            }
        });
        // const buffer = new Buffer(JSON.stringify(waitingToWrite))
        // lock = true
        // wipeAwaitingFiles()
        // fs.appendFile(eventsDbPath, buffer, { mode: file_permission }, (error) => {
        //     if(error !== null) {    
        //         console.log('Error happened', error)
        //         return completion()
        //     }
        //     data.forEach(i => {
        //         if (!contains(i, items)) {
        //             items.push(i)
        //         }
        //     })
        //     totalInFile = items.length
        //     lock = false
        //     const newFiles: Identifiable[] = []
        //     for (let v = waitingToWrite.length >= writesPerCycle ? 
        //         writesPerCycle-1 : waitingToWrite.length - 1; v >= 0; v--) {
        //         const last = waitingToWrite.pop()
        //         if (last === undefined) {
        //             write(newFiles)
        //             return
        //         }
        //         newFiles.push(last)
        //     }
        //     if(newFiles.length === 0)  {
        //         completion()
        //         return
        //     }
        //     writesPerCycle += 10
        //     write(newFiles)
        // })
    };
    /**
     * Checks if this Identifiable exists in the database
     *
     * @param {string} id
     * @returns {Boolean}
     */
    const exists = async (id) => {
        const items = await read();
        items.filter((item, index, array) => {
            if (item.id === id) {
                return array[index];
            }
        });
        let s = items.length === 1;
        return Promise.resolve(s);
    };
    const wipeAwaitingFiles = () => {
        for (let v = waitingToWrite.length - 1; v >= 0; v--) {
            waitingToWrite.pop();
        }
    };
    return {
        add,
        read,
        exists
    };
}
exports.default = Database;
