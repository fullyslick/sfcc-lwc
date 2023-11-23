import { createElement } from 'lwc';

import LightningButton from 'lightning/button';

describe('c-unit-test', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('displays overode button element, by checking for <pre> tag', () => {
    // Creates an instance of the component and assigns it to the constant element
    const element = createElement('lightning-button', {
      is: LightningButton
    });

    document.body.appendChild(element);

    const pre = element.shadowRoot.querySelector('pre');

    // Asserting the text is correct
    expect(pre).not.toBeNull();
  });
});
