import { LightningElement, api, wire } from 'lwc';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class WireGetRecord extends LightningElement {
  // You need to place this on a record page, ideally 'Account' page, to get the account data
  // Seems like there is parent component on record pages that pass 'recordId' to this component
  // This way we access it here
  @api recordId;

  // Props on this component that we can use to store info obtained from SFCC
  data;
  error;

  // When using @wire decorator on a function,
  // the function will be invoked whenever the LDS adapter detects update of data.
  // The decorated function will have access to obtained data or error
  @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
  wiredAccount({ data, error }) {
    console.log('Execute logic each time a new value is provisioned');
    // Make data available to this component
    if (data) {
      this.data = data;
      this.error = undefined;
      // Or make error info available to this component
    } else if (error) {
      this.error = error;
      this.data = undefined;
    }
  }

  get name() {
    return getFieldValue(this.data, ACCOUNT_NAME_FIELD);
  }
}
