import { createElement } from 'lwc';
import WireCPR from 'c/wireCPR';
import { CurrentPageReference } from 'lightning/navigation';

// Mock realistic data
const mockCurrentPageReference = require('./data/CurrentPageReference.json');

describe('c-wire-c-p-r', () => {
  // Resets the DOM at the end of the test.
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('renders the current page reference in <pre> tag', () => {
    // Create element from component and added to jsdom
    const element = createElement('c-wire-c-p-r', {
      is: WireCPR
    });

    document.body.appendChild(element);

    // Select element from jsdom - <pre> tag has just been appended to jsdom above
    const preElement = element.shadowRoot.querySelector('pre');

    // Test if <pre> element is rendered
    expect(preElement).not.toBeNull();

    // Emit data from @wire. Populate the mock data.
    // CurrentPageReference should hold data, and we populate the data using emit()
    CurrentPageReference.emit(mockCurrentPageReference);

    // Initially the Component do not have data, that is why after data is populated and component re-rendered,
    // we can execute the test. That is why async test is required and usage of Promise
    return Promise.resolve().then(() => {
      // Promise that expects the mock data to be updated into the preElement
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });
});
