import { LightningElement } from 'lwc';

// The Contact object scheme, we will need its name
import CONTACT_OBJECT from '@salesforce/schema/Contact';

// Contact fields schema
import ACCOUNT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import ACCOUNT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreator extends LightningElement {
  // expose Account Object to HTML
  objectApiName = CONTACT_OBJECT;

  // Expose Fields to HTML
  fields = [
    ACCOUNT_EMAIL_FIELD,
    ACCOUNT_FIRST_NAME_FIELD,
    ACCOUNT_LAST_NAME_FIELD
  ];

  // Handle successful data submission
  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: 'Contact created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success'
    });

    // Notify parent component by dispatching event.
    // The parent should have event listener to react to this dispatch.
    this.dispatchEvent(toastEvent);
  }
}
