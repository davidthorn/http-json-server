import * as fs from 'fs'

export interface Identifiable {
    id: string
}

/**
 *
 *
 * @param {string} name
 * @returns
 */
function Database(name: string) {

    let items = []
    const dbFolder = './db'
    const eventsDbPath = `${dbFolder}/${name}.json`

    const dir_permission = '0700'

    const file_permission = '0600'
    const encoding = 'binary'

    if(!fs.existsSync(dbFolder)) {
        fs.mkdirSync(dbFolder , dir_permission)
    }

    if(!fs.existsSync(eventsDbPath)) {
        fs.writeFileSync(eventsDbPath , new Buffer(JSON.stringify([])) ,  { mode: file_permission })
    }

     /**
      * Adds an Identiable to the database
      *
      * @param {Identifiable} item
      */
     const add = (item: Identifiable) => {
        let contents = read()   
        contents.push(item)
        write(contents)
    }

    /**
     *  Reads all of the Identifiables from the database
     *
     * @returns
     */
    const read = (): Identifiable[] => {
        const content = fs.readFileSync(eventsDbPath , encoding) 
        let items = JSON.parse(content)
        return items
    }

    /**
     * Writes the Identifiables to the database
     *
     * @param {Identifiable[]} data
     */
    const write = (data: Identifiable[] ) => {
        const buffer = new Buffer(JSON.stringify(data))
        fs.writeFileSync(eventsDbPath, buffer ,{ mode: file_permission})
    }

    /**
     * Checks if this Identifiable exists in the database
     *
     * @param {string} id
     * @returns {Boolean}
     */
    const exists = (id: string): Boolean =>  {
        
         const items = read().filter((item, index, array) => {
            if(item.id === id) {
                return array[index]
            }
         })
        
        return items.length === 1
    }

    return {
        add,
        read,
        exists 
    }

}

export default Database

