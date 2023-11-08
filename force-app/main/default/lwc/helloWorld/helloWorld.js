import { LightningElement, api } from 'lwc';

export default class HelloWorld extends LightningElement {
  // One of the usages of a decorator is to expose properties from parent to child
  // https://developer.salesforce.com/docs/platform/lwc/guide/reactivity-public.html
  @api productName;

  greeting = 'Aleksandar';

  changeHandler(event) {
    this.greeting = event.target.value;
  }
}
