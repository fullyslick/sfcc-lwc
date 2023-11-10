import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {
  // Check parent list.html, this where 'product' property is passed
  // With @api decorator you make it available to the tile component
  // https://developer.salesforce.com/docs/platform/lwc/guide/create-components-data-binding.html
  @api product;

  // 2. Handle click event
  // Event bubbling in LWC and how to configure it
  // https://developer.salesforce.com/blogs/2021/08/how-events-bubble-in-lightning-web-components
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
