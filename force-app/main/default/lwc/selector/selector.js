import { LightningElement } from 'lwc';

export default class Selector extends LightningElement {
  selectedProductId;

  // 10. Handle emitted event from child 'list' component,
  // extract the data from event and change 'selectedProductId' so it will update 'detail' component
  handleProductSelected(evt) {
    this.selectedProductId = evt.detail;
  }
}
