import { sum } from '../sum';

// run the test with  command:  npm run test:unit -- force-app/main/default/lwc/unitTest/__tests__/sum
// describe - test suite that accepts (the description of the unit, callback function that holds one or more tests)
describe('sum()', () => {
  // 'it' is an alias for 'test', that accepts (description of what we are expecting, callback function that builds up the test and holds the expectation for the test)
  it('should add 1 and 2 returning 3', () => {
    expect(sum(1, 2)).toBe(3); // toBe is a Jest matcher https://jestjs.io/docs/expect
  });
});
