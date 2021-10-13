let expect = chai.expect;
let assert = chai.assert;

describe('JS language features', () => {
    it('JS data types', function () {
        expect(typeof undefined).equals("undefined");
        expect(typeof 0).equals("number");
        expect(typeof 10n).equals("bigint");
        expect(typeof true).equals("boolean");
        expect(typeof "foo").equals("string");
        expect(typeof Symbol("id")).equals("symbol");
        expect(typeof Math).equals("object");
        expect(typeof null).equals("object");
        expect(typeof alert).equals("function");
    });
    it('Convert from string to array with Array.from(str)', () => {
        // Array.from() creates a new Array instance from arrayLike, an array-like or iterable object.
        assert.sameOrderedMembers(['a', 'b', 'c', 'd', 'e'], Array.from('abcde'), "Arrays are not the same");
    });
    it('Convert from string to array with spread syntax [...str]', function () {
        // Spread syntax allows an iterable such as an array expression or string to be expanded in places 
        // where zero or more arguments (for function calls) or elements (for array literals) are expected, 
        // or an object expression to be expanded in places where zero or more key-value pairs (for object 
        // literals) are expected.
        assert.sameOrderedMembers(['a', 'b', 'c', 'd', 'e'], [...'abcde'], "Arrays are not the same");
    });
});


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


describe('Array', () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    it('Array.from({ length: n }) creates array of given length that filled with undefined', () => {
        const array = Array.from({ length: 3 });

        assert.sameOrderedMembers([undefined, undefined, undefined], array, "Arrays are not the same");
    });
    it('Array.from({ length:n }, mapFn) creates array of given length with initialized values', () => {
        // The mapping function takes current values and index as input and create a new value
        const mapFn = (value, index) => index;
        const array = Array.from({ length: 3 }, mapFn);

        assert.sameOrderedMembers([0, 1, 2], array, "Arrays are not the same");
    });
    it('Array.every(predicate) tests all elements against a predicate', () => {
        const isEven = e => e % 2 == 0;

        expect([2, 4, 6, 8, 10].every(isEven)).to.be.true;
        expect([2, 4, 6, 8, 9].every(isEven)).to.be.false;
    });
    it('Array.fill() fills elements with given value', () => {
        const arrayOfThreeElements = Array.from({ length: 3 });      // [undefined, undefined, undefined]
        const arrayOfSixes = Array.from({ length: 3 }, (v, i) => 6); // [6, 6, 6]
        const arraysFilledWithSix = arrayOfThreeElements.fill(6);    // [6, 6, 6]

        assert.sameOrderedMembers(arrayOfSixes, arraysFilledWithSix, "Arrays are not the same");
    });
    it('Array.map(element=>{...}) creates a new array poplated with results of mapping every element', function () {
        assert.sameOrderedMembers([2, 4, 6], [1, 2, 3].map(x => x * 2));
    });
    it('Array.map((element,index)=>{...}) creates a new array', () => {
        const characters = [
            { name: 'Charlie', job: 'Janitor' },
            { name: 'Mac', job: 'Bouncer' },
            { name: 'Dee', job: 'Aspring actress' }
        ]

        assert.sameOrderedMembers([
            "1. Charlie is a Janitor",
            "2. Mac is a Bouncer",
            "3. Dee is a Aspring actress"],
            characters.map((person, index) => `${index + 1}. ${person.name} is a ${person.job}`)
        )
    });
});