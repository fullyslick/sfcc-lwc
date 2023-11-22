import { createElement } from 'lwc';
import WireApex from 'c/wireApex';

// This imports the Apex class that is used to get data from Salesforce
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

// Dummy data with a list of contacts
const mockGetAccountList = require('./data/getAccountList.json');

// An empty list of records to verify the component does something reasonable
// when there is no data to display
const mockGetAccountListNoRecords = require('./data/getAccountListNoRecords.json');

// Mock getAccountList Apex wire adapter.
// The Apex class getAccountList adapter does not exist.
// But in order to perform test we create it here.
jest.mock(
  '@salesforce/apex/AccountController.getAccountList', // this replace import of class with a callback
  () => {
    // Add simulation of Apex adapter
    const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe('c-wire-apex', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // Prevent data saved on mocks from leaking between tests
    // This is needed because we have two mock files for two different tests.
    // The first test is looking for the Apex call to deliver six accounts.
    // The second test is asserting what would happen if there are no accounts found.
    // Last is the test to assert what would happen if the Apex had an error.
    jest.clearAllMocks();
  });

  describe('getAccountList @wire data', () => {
    // Create element from WireApe component and render it on jsdom
    it('renders six records', () => {
      const element = createElement('c-wire-apex', {
        is: WireApex
      });
      document.body.appendChild(element);

      // Emit data from @wire. This populate mock data using Apex adapter.
      getAccountList.emit(mockGetAccountList);

      // Initially the Component do not have data, that is why after data is populated and component re-renders,
      // we can execute the test. That is why async test is required and usage of Promise
      return Promise.resolve().then(() => {
        // Select elements for validation
        const accountElements = element.shadowRoot.querySelectorAll('p');
        // Check if rendered elements are the same as the number of entries in the data
        expect(accountElements.length).toBe(mockGetAccountList.length);

        // Check if the text in first rendered Account is the same as in the mock data
        expect(accountElements[0].textContent).toBe(mockGetAccountList[0].Name);
      });
    });

    it('renders no items when no records are returned', () => {
      // Create element from WireApe component and render it on jsdom
      const element = createElement('c-wire-apex', {
        is: WireApex
      });
      document.body.appendChild(element);

      // Emit data from @wire. This populate mock data using Apex adapter.
      getAccountList.emit(mockGetAccountListNoRecords);

      // Initially the Component do not have data, that is why after data is populated and component re-renders,
      // we can execute the test. That is why async test is required and usage of Promise
      return Promise.resolve().then(() => {
        // Select elements for validation
        const accountElements = element.shadowRoot.querySelectorAll('p');

        // Check if the number of DOM elements holding account data = number of account data in the mock = 0
        expect(accountElements.length).toBe(mockGetAccountListNoRecords.length);
      });
    });
  });

  describe('getAccountList @wire error', () => {
    // Create element from WireApe component and render it on jsdom
    it('shows error panel element', () => {
      const element = createElement('c-wire-apex', {
        is: WireApex
      });
      document.body.appendChild(element);

      // Emit error from @wire. This simulate error in getting data.
      getAccountList.error();

      // Initially the Component do not have data, that is why after data is populated and component re-renders,
      // we can execute the test. That is why async test is required and usage of Promise
      // In this case instead of data we get an error due to Emit above
      return Promise.resolve().then(() => {
        const errorElement = element.shadowRoot.querySelector('p');
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent).toBe('No accounts found.');
      });
    });
  });
});
