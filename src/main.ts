let start = Date.now()
const shouldfake = true
const filesToWrite = 1000
let peoplefilesWritten = 0
let townsfilesWritten = 0

console.log(`Writing a total of ${filesToWrite} to 2 databases`)

console.log( 'Start',start )
import Database, { Identifiable } from './server'
import * as faker from 'faker'

const completed = async () => {
   
    const peopleItems =  await peopleDb.read()
    const townsItems =  await townsDb.read()
    if(((peoplefilesWritten + townsfilesWritten) + (filesToWrite * 2)) > (peopleItems.length + townsItems.length)) return

    console.log(`Read items from people: ${peopleItems.length}`)
    console.log(`Read items from towns: ${townsItems.length}`)
    
    var end = Date.now();
    console.log('Start', start);
    console.log('End', end);
    console.log(`Time taken ${(end - start) / 1000} seconds`, );
}

const peopleDb = Database('people', completed)

const townsDb = Database('towns', completed)

const exists = peopleDb.exists('12234')

class Person implements Identifiable {
    id: string
    name: string
    constructor(id: string , name: string) {
        this.id = id
        this.name = name
    }
}

class Town implements Identifiable {
    id: string
    name: string
    constructor(id: string , name: string) {
        this.id = id
        this.name = name
    }
}

const run = async (): Promise<void> => {
    
    const peopleItems =  await peopleDb.read()
    const townsItems =  await townsDb.read()

    peoplefilesWritten += peopleItems.length
    townsfilesWritten += townsItems.length

    if(shouldfake) {
        for(let x = 0; x < filesToWrite; x++ ){
            peopleDb.add(new Person(faker.random.uuid() , `${faker.name.firstName()} ${faker.name.lastName()}`))
            townsDb.add(new Town(faker.random.uuid() , `${faker.address.city()}`))
        }
    }
    
    let _exists = await exists
    
    if(_exists === false) {
    
        await peopleDb.add(new Person(
            "12234" ,
            `David Thorn` 
        ))
        
    }

    
}
run()

