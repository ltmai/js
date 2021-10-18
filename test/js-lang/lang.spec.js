let expect = chai.expect;
let assert = chai.assert;

describe('JS language features', () => {
    it('typeof(x) returns type as string', function () {
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

describe('ES6-destructuring', () => {
    let FIRST = 'first';
    let SECOND = 'second';
    let THIRD = 'third';
    let FOURTH = 'fourth';
    let FIFTH = 'fifth';

    it('Access items in array', () => {
        let [first, second, third, , fifth] = [ FIRST, SECOND, THIRD, FOURTH, FIFTH ];
        assert.equal(FIRST, first);
        assert.equal(SECOND, second);
        assert.equal(THIRD, third);
        // skip the fourth
        assert.equal(FIFTH, fifth);
    });
    it('Access items in nested pattern (object)', () => {
        const TWO_IN_GERMAN = 'Zwei means Two in German';
        let [one, [{two}, three]] = [ 1, [{two:TWO_IN_GERMAN}, 3]];

        assert.equal(1, one);
        assert.equal(TWO_IN_GERMAN, two);
        assert.equal(3, three);
    });
    it('Access items in nested pattern (array)', () => {
        let [one, [[two], three]] = [ 1, [[2], 3]];

        assert.equal(1, one);
        assert.equal(2, two);
        assert.equal(3, three);
    });
    it('Capture trailing items with rest pattern', () => {
        let [head, ...tail] = [1, 2, 3, 4, 5];

        assert.equal(1, head);
        assert.sameOrderedMembers(tail, [2, 3, 4, 5]);
    });
    it('Destructure an object', () => {
        let { name, age } = { name: "Charlie", id : 1 };

        assert.equal("Charlie", name);
        assert.isUndefined(age);
    });
    it('Destructuring without direct declaration requires parentheses', () => {
        let foo;
        // Without parentheses Javascript recognizes any statement starting
        // with { as a block statement, not an object.
        ({ foo } = { foo: "lorem", bar : "ipsum" });

        assert.equal("lorem", foo);
    });
    it('Destructuring null value gives a TypeError', () => {
        assert.throws(()=>{
            let { v } = null;

        }, TypeError, /Cannot destructure property \'v\' of \'null\' as it is null./)
    });
    it('Default value when property is not defined', () => {
        const defaultValue = "default message";
        let [message = defaultValue] = [];
        let [missing = true] = [];
        let [x = 3] = [];

        assert.equal(defaultValue, message);
        assert.isOk(missing);
        assert.equal(3, x);
    });
    it('Application: function named parameter definitions', () => {
        // accepts a single object with multiple properties 
        // as a parameter instead of forcing their order. 
        function myFunction({ first, second, third}) {
            return [first, second, third];
        }

        let obj = {
            first  : FIRST, 
            second : SECOND, 
            third  : THIRD, 
            other  : 1
        };  

        assert.sameOrderedMembers([FIRST, SECOND, THIRD], myFunction(obj)) ;
    });
    it('Application: provide default values for configuration object parameters', () => {
        // Giving default values for config object avoids repeating
        // let foo = config.foo || defaultFoo
        const PRODUCTION_DATE=Date.now();
        const DEFAULT_FUEL="diesel";
        const DEFAULT_POWER=300;
        const DEFAULT_UNIT="PS";

        function buildEngine({
          model,
          cylinders,
          fuel = DEFAULT_FUEL,
          power = DEFAULT_POWER,
          unit = DEFAULT_UNIT 
        }) {
         return {
                model,
                cylinders,
                fuel,
                date : PRODUCTION_DATE,
                power,
                unit
            }
        }

        let engine = buildEngine({ model:"A43", cylinders: 12, power:500 });

        assert.equal("A43", engine.model);
        assert.equal(12, engine.cylinders);
        assert.equal(500, engine.power);
        assert.equal(DEFAULT_FUEL, engine.fuel);
        assert.equal(DEFAULT_UNIT, engine.unit);
        assert.equal(PRODUCTION_DATE, engine.date);
    });
    it('', () => {
    });
    it('', () => {
    });
    it('', () => {
    });
    it('', () => {
    });
    it('', () => {
    });
    it('', () => {
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