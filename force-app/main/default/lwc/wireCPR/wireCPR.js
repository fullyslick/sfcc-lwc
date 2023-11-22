import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class WireCPR extends LightningElement {
  // Get data and assign it to pageRef
  @wire(CurrentPageReference) pageRef;

  get currentPageRef() {
    return this.pageRef ? JSON.stringify(this.pageRef, null, 2) : '';
  }
}
