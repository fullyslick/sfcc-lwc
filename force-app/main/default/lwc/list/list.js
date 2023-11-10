import { LightningElement } from 'lwc';
import { bikes } from 'c/data';

export default class List extends LightningElement {
  bikes = bikes;

  // 6. Handle tile click from child
  handleTileClick(evt) {
    // 7. Create new custom event
    // This component wants to emit a productselected event to its parent
    const event = new CustomEvent('productselected', {
      detail: evt.detail // 8. Extract the data from child's 'tileclick' event
    });
    // 8. Fire the event from c-list, now check selector.html
    this.dispatchEvent(event);
  }
}
