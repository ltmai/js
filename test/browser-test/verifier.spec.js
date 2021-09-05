import { rule_min_length, verify } from "./verifier.js";

let expect = chai.expect;

describe('Password verifier', function () {
    it('when no rules, then pass', function () {
        const result = verify('any input', []);

        expect(result).to.be.true;
    });

    it('when one rule fails, then fails', function () {
        const result = verify('any input', [
            (input) => true,
            (input) => false
        ]);

        expect(result).to.be.false;
    });

    it ('password of 7 characters, fails', function() {
        const result = verify('1234567', [
            rule_min_length            
        ]);

        expect(result).to.be.false;
    });
}); 