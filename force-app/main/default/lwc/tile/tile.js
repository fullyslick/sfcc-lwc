import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {
  @api product;

  // 2. Handle click event
  tileClick() {
    // 3. Create new custom event and pass data to it
    const event = new CustomEvent('tileclick', {
      // detail contains only primitives
      detail: this.product.fields.Id.value
    });
    // 4. Fire the event from c-tile, now check list.html
    this.dispatchEvent(event);
  }
}
