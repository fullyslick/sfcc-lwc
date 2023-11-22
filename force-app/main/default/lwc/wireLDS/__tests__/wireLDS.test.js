import { createElement } from 'lwc';
import WireLDS from 'c/wireLDS';
import { getRecord } from 'lightning/uiRecordApi';

// Mock realistic data
const mockGetRecord = require('./data/getRecord.json');

describe('c-wire-l-d-s', () => {
  // Resets the DOM at the end of the test.
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe('getRecord @wire data', () => {
    // Create element from component and added to jsdom
    it('renders contact details', () => {
      const element = createElement('c-wire-l-d-s', {
        is: WireLDS
      });
      document.body.appendChild(element);

      // Emit data from @wire. This populate mock data using Lightning Data Service,
      // that typically is used to access data from Salesforce
      getRecord.emit(mockGetRecord);

      // Initially the Component do not have data, that is why after data is populated and component re-renders,
      // we can execute the test. That is why async test is required and usage of Promise
      return Promise.resolve().then(() => {
        // Select elements for validation
        const nameElement = element.shadowRoot.querySelector('p.accountName');
        expect(nameElement.textContent).toBe(
          'Account Name: ' + mockGetRecord.fields.Name.value
        );

        const industryElement =
          element.shadowRoot.querySelector('p.accountIndustry');
        expect(industryElement.textContent).toBe(
          'Industry: ' + mockGetRecord.fields.Industry.value
        );

        const phoneElement = element.shadowRoot.querySelector('p.accountPhone');
        expect(phoneElement.textContent).toBe(
          'Phone: ' + mockGetRecord.fields.Phone.value
        );

        const ownerElement = element.shadowRoot.querySelector('p.accountOwner');
        expect(ownerElement.textContent).toBe(
          'Owner: ' + mockGetRecord.fields.Owner.displayValue
        );
      });
    });
  });

  // Test the case, when there is error in fetching data from Salesforce
  describe('getRecord @wire error', () => {
    // Create element from component and added to jsdom
    it('shows error message', () => {
      const element = createElement('c-wire-l-d-s', {
        is: WireLDS
      });
      document.body.appendChild(element);

      // Emit error from @wire
      getRecord.error();

      // Initially the Component do not have data, that is why after data is populated and component re-renders,
      // we can execute the test. That is why async test is required and usage of Promise
      // In this case instead of data we get an error due to Emit above
      return Promise.resolve().then(() => {
        const errorElement = element.shadowRoot.querySelector('p');
        // Test if DOM element that holds that error is rendered
        expect(errorElement).not.toBeNull();

        // Check if text displayed when error is encountered is rendered
        expect(errorElement.textContent).toBe('No account found.');
      });
    });
  });
});
