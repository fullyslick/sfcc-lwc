import { LightningElement, api } from 'lwc';

// Mock the button just for the unit test. It actually do not exist
export default class HammerButton extends LightningElement {
  @api label;
  // any other implementation you may want to expose here
}
