const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
  ...jestConfig,
  modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
  // This is telling Jest where to find the mockup for lightning-button
  // typically it is located in node-modules/@salesforce/sfdx-lwc-jest
  moduleNameMapper: {
    '^lightning/button$':
      '<rootDir>/force-app/test/jest-mocks/lightning/button',
    // Add the mock, so Jest can find it
    '^thunder/hammerButton$':
      '<rootDir>/force-app/test/jest-mocks/thunder/hammerButton'
  }
};
