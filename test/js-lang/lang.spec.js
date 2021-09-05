
let expect = chai.expect;
let assert = chai.assert;

describe('JS language features', function () {
    it('JS data types', function () {
        expect(typeof undefined   ).equals("undefined");
        expect(typeof 0           ).equals("number");
        expect(typeof 10n         ).equals("bigint");
        expect(typeof true        ).equals("boolean");
        expect(typeof "foo"       ).equals("string");
        expect(typeof Symbol("id")).equals("symbol");
        expect(typeof Math        ).equals("object");
        expect(typeof null        ).equals("object");
        expect(typeof alert       ).equals("function");
    });
    it('Convert from string to array with Array.from()', function() {
        // Array.from() creates a new Array instance from arrayLike, an array-like or iterable object.
        assert.sameOrderedMembers(['a', 'b', 'c', 'd', 'e'], Array.from('abcde'), "Arrays are not the same");        
    });
    it('Convert from string to array with spread syntax [...str]', function() {
        // Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments 
        // (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where 
        // zero or more key-value pairs (for object literals) are expected.
        assert.sameOrderedMembers(['a', 'b', 'c', 'd', 'e'], [...'abcde'], "Arrays are not the same");        
    });
}); 

describe('Array', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    it('Array.from() create array of given length that filled with undefined', function() {
        const array = Array.from({length: 3 });

        assert.sameOrderedMembers([undefined, undefined, undefined], array, "Arrays are not the same");
    });
    it('Array.from() create array of given length with initialized values', function() {
        // The mapping function takes current values and index as input and create a new value
        const mapFn = (value, index) => index;
        const array = Array.from({length: 3}, mapFn);

        assert.sameOrderedMembers([0, 1, 2], array, "Arrays are not the same");
    });
    it('Array.every() tests all elements against a predicate', function() {
        const isEven = e => e % 2 == 0;
        
        expect([2,4,6,8,10].every(isEven)).to.be.true;
        expect([2,4,6,8,9].every(isEven)).to.be.false;
    });
    it('Array.fill() fills elements with given value', function() {
        const arrayOfTenElements = Array.from({length: 10});
        const arrayOfSixes = Array.from({length: 10}, (v, i) => 6);
        const arraysFilledWithSix = arrayOfTenElements.fill(6);

        assert.sameOrderedMembers(arrayOfSixes, arraysFilledWithSix, "Arrays are not the same");
    });
    it('', function() {
    });
});