import { isPermutation } from './checkPermutation.js';

let expect = chai.expect;

describe('Check permutation', function () {
    it('input is null or empty, then not permutation', function () {
        const result1 = isPermutation(null, "any string");
        const result2 = isPermutation("any string", null);

        expect(result1).to.be.false;
        expect(result2).to.be.false;
    });
    it('inputs are equal, then permutation', function() {
        const word = "any string";
        const result = isPermutation(word, word);

        expect(result).to.be.true;
    });
    it('string of different length are not permutations of each other', function() {
        const input_length = 100;
        const word1 = 'a'.repeat(input_length);
        const word2 = 'a'.repeat(input_length + 1);
        const result = isPermutation(word1, word2);

        expect(result).to.be.false;        
    });
    it('abcde and edcab are permutation', function() {
        const word1 = 'abcde';
        const word2 = 'decba';
        const result = isPermutation(word1, word2);

        expect(result).to.be.true;
    });
}); 