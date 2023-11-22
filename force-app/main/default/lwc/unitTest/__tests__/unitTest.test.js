import { createElement } from 'lwc';

import UnitTest from 'c/unitTest';

describe('c-unit-test', () => {
  // afterEach() method resets the DOM at the end of the test.
  // Jest isn't running a browser when tests run. Jest uses jsdom to provide an environment that behaves much like a browser's DOM or document.
  // Each test file gets a single instance of jsdom, and changes aren't reset between tests inside the file.
  // It's a best practice to clean up between tests so that a test's output doesn't affect any other test.
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('displays unit status with default unitNumber', () => {
    // Creates an instance of the component and assigns it to the constant element
    const element = createElement('c-unit-test', {
      is: UnitTest
    });

    // This is the first requirement that we are testing for, that unitNumber is set to 5 first.
    expect(element.unitNumber).toBe(5);

    // Attaches the Lightning web component to the DOM and renders it,
    // which also means the lifecycle hooks connectedCallback() and renderedCallback() are called
    document.body.appendChild(element);

    // Verify displayed greeting
    // shadowRoot =  It's a test-only API that lets you peek across the shadow boundary to inspect a component's shadow tree
    const div = element.shadowRoot.querySelector('div');

    // Asserting the text is correct
    expect(div.textContent).toBe('Unit 5 alive!');
  });
});
