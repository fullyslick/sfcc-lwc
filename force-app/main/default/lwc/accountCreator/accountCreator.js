import { LightningElement } from 'lwc';

// Full documentation on lightning-record-form usage:
// https://developer.salesforce.com/docs/component-library/bundle/lightning-record-form/documentation

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Account object reference so we can access and update data from account record.
// Salesforce verifies that the object and fields exist,
// prevents them from being deleted, and ensures that they are included in change sets and packages that reference the component.
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

// Schema expected from SFCC. Better use these than providing custom ones.
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class AccountCreator extends LightningElement {
  // expose Account Object to HTML
  objectApiName = ACCOUNT_OBJECT;

  // Expose Fields to HTML
  fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];

  // Handle successful data submission
  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: 'Account created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success'
    });

    // Notify parent component by dispatching event.
    // The parent should have event listener to react to this dispatch.
    this.dispatchEvent(toastEvent);
  }
}
