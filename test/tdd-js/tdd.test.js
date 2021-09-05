import { isPermutation } from './src/permuration.js';
import { objectsEqual, arraysEqual } from "./src/comparison.js";

let expect = chai.expect;
let assert = chai.assert;

/**
 * Template literals
 */
describe('Template literals', () => {

    it('Template literal can be nested when put inside ${}', () => {
        const isLargeScreen = () => false;
        const item = { isCollapsed : true }

        const result = `header ${ isLargeScreen() ? '' : `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
        const expected = 'header icon-expander'; 

        assert(result === expected, `"${result}" is not equal to expected result "${expected}"`);
    });

    it('Tagged template literal uses function to evaluate literals', () => {
        /**
         * highlight keys by putting them in "<span class="highlight"></span>". 
         * Template literals is always of the form: a string (can be empty) 
         * followed by a key (maybe except the last string element). 
         * 
         * tag`${name} is the ${order} tallest person in town` would return:
         * ['', ' is the ', 'tallest person in town'], ['Peter', 'second'].
         * Note that the first string is empty.
         * 
         * @param {*} strings 
         * @param  {...any} keys 
         */
        const highlight = (strings, ...keys) => {
            let result = [];
            strings.forEach((string, index) => {
                result.push( `${string}${keys[index] ? `<span class="highlight">${keys[index]}</span>` : ''}` ); 
            });
            return result.join('');
        }

        const name = 'Buck', age=12;
        const  result = highlight`The dog ${name} is ${age} years old`;
        const  expected = `The dog <span class="highlight">Buck</span> is <span class="highlight">12</span> years old`;

        assert(result === expected, `"${result}" is not equal to expected result "${expected}"`);
    });
});

/**
 * Check permutation
 */
describe('Check permutation', () => {

    it('input is null or empty, then not permutation', () => {
        const result1 = isPermutation(null, "any string");
        const result2 = isPermutation("any string", null);

        expect(result1).to.be.false;
        expect(result2).to.be.false;
    });
    
    it('string is also its permutation', () => {
        const word = "any string";
        const result = isPermutation(word, word);

        expect(result).to.be.true;
    });
    
    it('string of different length are not permutations of each other', () => {
        const input_length = 100;
        const word1 = 'a'.repeat(input_length);
        const word2 = 'a'.repeat(input_length + 1);
        const result = isPermutation(word1, word2);

        expect(result).to.be.false;        
    });
    
    it('abcde and edcab are permutations of each other', () =>  {
        const word1 = 'abcde';
        const word2 = 'decba';
        const result = isPermutation(word1, word2);

        expect(result).to.be.true;
    });
}); 

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