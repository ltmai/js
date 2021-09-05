# TDD in Javascript with chai and mocha


[Chai](https://www.chaijs.com/) is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

[Mocha](https://www.mochajs.org/) is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. 

1. Setup Mocha in index.html as follows

```html
  <body>
    <div id="mocha"></div>

    <script src="lib/chai-4.2.0.js"></script><!--https://unpkg.com/chai/chai.js-->
    <script src="lib/mocha-7.1.1.js"></script><!--https://unpkg.com/mocha/mocha.js-->
    <script class="mocha-init">
      mocha.setup('bdd');
    </script>
    <!--test scripts begin-->
    <script type="module" src="tdd.test.js"></script>
    <!-- <script type="module" src="tdd.test.js"></script> -->
    <!--test scripts end-->
    <script class="mocha-exec" type="module">
      mocha.growl();
      mocha.checkLeaks();
      mocha.run();
    </script>
  </body>
```

2. Write test cases (tdd.test.js) as follows:

```js

let expect = chai.expect;
let assert = chai.assert;

describe('Test suite description', () => {
    it('Test case description', () => {
        assert(1 + 1 === 2, `result is not equal to expected value`);
    });
}
```