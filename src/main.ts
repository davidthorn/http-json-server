let start = Date.now()
const shouldfake = true
const filesToWrite = 8000

console.log(`Writing a total of ${filesToWrite} to 2 databases`)

console.log( 'Start',start )
import Database, { Identifiable } from './server'
import * as faker from 'faker'

const peopleDb = Database('people')
const townsDb = Database('towns')

const exists = peopleDb.exists('12234')

console.log(exists)

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
if(shouldfake) {
    for(let x = 0; x < filesToWrite; x++ ){
        peopleDb.add(new Person(faker.random.uuid() , `${faker.name.firstName()} ${faker.name.lastName()}`))
        townsDb.add(new Town(faker.random.uuid() , `${faker.address.city()}`))
    }
}


if(exists === false) {

    peopleDb.add(new Person(
        "12234" ,
        `David Thorn` 
    ))
    
}

console.log(`Read items from people: ${peopleDb.read().length}`)
console.log(`Read items from towns: ${townsDb.read().length}`)

var end = Date.now();
console.log('Start', start);
console.log('End', end);
console.log(`Time taken ${(end - start) / 1000} seconds`, );