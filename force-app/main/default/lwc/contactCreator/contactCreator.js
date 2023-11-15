import { LightningElement } from 'lwc';

// createRecord the function that is used to create a record in SFCC
import { createRecord } from 'lightning/uiRecordApi';

// The Contact object scheme, we will need its name
import CONTACT_OBJECT from '@salesforce/schema/Contact';

// Contact fields schema
import ACCOUNT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import ACCOUNT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreator extends LightningElement {
  email;
  firstName;
  lastName;

  handleFirstNameChange(event) {
    this.firstName = event.target.value;
  }

  handleLastNameChange(event) {
    this.lastName = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();

    // We need to pass to createRecord the apiName specific for the Contacts data,
    // and pair of the fields we will update with their values from our form
    const recordInput = {
      apiName: CONTACT_OBJECT.objectApiName,
      fields: {
        [ACCOUNT_FIRST_NAME_FIELD.fieldApiName]: this.firstName,
        [ACCOUNT_LAST_NAME_FIELD.fieldApiName]: this.lastName,
        [ACCOUNT_EMAIL_FIELD.fieldApiName]: this.email
      }
    };

    // createRecord - returns a promise
    // use the resolved promise data to display info for the successful submission
    createRecord(recordInput)
      .then((account) => {
        // code to execute if create operation is successful
        const toastEvent = new ShowToastEvent({
          title: 'Contact created',
          message: 'Record ID: ' + account.id,
          variant: 'success'
        });

        // Notify parent component by dispatching event.
        // The parent should have event listener to react to this dispatch and display a toast UI
        this.dispatchEvent(toastEvent);
      })
      .catch((error) => {
        // code to execute if create operation fails
        const toastEvent = new ShowToastEvent({
          title: 'Failed to create contact',
          message: error.body.message,
          variant: 'error'
        });

        // Notify parent component by dispatching event.
        // The parent should have event listener to react to this dispatch and display a toast UI
        this.dispatchEvent(toastEvent);
      });
  }
}
