import { LightningElement } from 'lwc';
export default class App extends LightningElement {
  name = 'Electra X4';
  description = 'A sweet bike built for comfort.';
  category = 'Mountain';
  material = 'Steel';
  price = '$2,700';
  pictureUrl =
    'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';
  ready = false;

  // connectedCallback - Lifecycle hook called when component is added to the DOM
  // Here is the list of all lifecycle hooks:
  // https://developer.salesforce.com/docs/platform/lwc/guide/reference-lifecycle-hooks.html
  /* eslint-disable @lwc/lwc/no-async-operation */
  connectedCallback() {
    setTimeout(() => {
      this.ready = true;
    }, 3000);
  }
}
