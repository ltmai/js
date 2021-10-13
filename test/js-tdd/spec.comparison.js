import { objectsEqual, arraysEqual } from "./src/comparison.js";

let expect = chai.expect;
let assert = chai.assert;

/**
 * Comparing objects
 */
describe('Objects comparison', () => {
    it('object equals itself', () => {
        const leo = { name : 'Leo', age : 33, skills : { dribble : 10, tactics : 10 } };

        expect(objectsEqual(leo, leo)).to.be.true;
    });

    it ('objects with different order of properties equal', () => {
        const person1 = { name: 'John', age: 33, info: { married: true, hobbies: ['sport', 'art'] } };
        const person2 = { age: 33, name: 'John', info: { hobbies: ['sport', 'art'], married: true } };

        expect(objectsEqual(person1, person2)).to.be.true;
    });

    it ('unequal objects are not equal', () => {
        const person1 = { age: 33, name: 'John', info: { hobbies: ['sport', 'art'], married: true } };
        const person2 = { name: 'John', age: 33 };

        expect(objectsEqual(person1, person2)).to.be.false;
    });

    it ('null objects are not equal', () => {
        const person = { name: 'John', age: 33 };

        expect(objectsEqual(person, null)).to.be.false;
        expect(objectsEqual(null, person)).to.be.false;
    });

    it ('objects of different types are not equal', () => {
        const person = { name: 'John', age: 33 };
        let number = 1;
        let string = "string";

        expect(objectsEqual(person, number)).to.be.false;
        expect(objectsEqual(person, string)).to.be.false;
    });

    it ('undefined objects are not not equal', () => {
        const person = { name: 'John', age: 33 };
        
        expect(objectsEqual(person, undefined)).to.be.false;
        expect(objectsEqual(undefined, person)).to.be.false;
    });
    
    it ('compare with primitives', () => {
        const person = { name: 'John', age: 33 };
        const s1 = "abc";

        expect(objectsEqual(person, 1)).to.be.false;
        expect(objectsEqual(person, "string")).to.be.false;
        expect(objectsEqual(person, ()=>{} )).to.be.false;
        expect(objectsEqual(s1, "abc")).to.be.true;
    });
});

/**
 * Comparing arrays
 */
describe('Arrays of objects comparison', () => {
    it('null and array are not equal', () => {
        expect(arraysEqual(null, [])).to.be.false;
        expect(arraysEqual(null, ['first', { second : 2} ])).to.be.false;
    });
    
    it('undefined and array are not equal', () => {
        expect(arraysEqual(undefined, [])).to.be.false;
    });

    it('array equals itself', () => {
        const item1 = { brand : "apple", type : "laptop" }; 
        const item2 = { type : "laptop", brand : "apple" }; 

        expect(arraysEqual([item1, item2], [item1, item2])).to.be.true;
    });

    it('unequal arrays are not equal', () => {
        const item1 = { brand : "apple", type : "laptop" }; 
        const item2 = { type : "tablet", brand : "apple" }; 

        expect(arraysEqual([item1, item2], [item2, item1])).to.be.false;
        expect(arraysEqual([item1, item2], [item1])).to.be.false;
    });

    it('empty arrays are equal', () => {
        expect(arraysEqual([], [])).to.be.true;
    });
});