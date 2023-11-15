import { LightningElement, api, wire } from 'lwc';

// getRecord wire adapter and the getFieldValue function.
// Use a wire adapter to read Salesforce data (records) and metadata (layout details, fields on an object, and so on
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class WireGetRecordProperty extends LightningElement {
  // You need to place this on a record page, ideally 'Account' page, to get the account data
  // Seems like there is parent component on record pages that pass 'recordId' to this component
  // This way we access it here
  @api recordId;

  // Call the adapter to get data from SFCC or cache and then the data is assigned to 'account' prop of this component
  // recordId: By using $ prefix, we make recordId reactive. Every time the value of recordId changes,
  // the wire adapter gets new data, either from the cache or from the server.
  // fields: the data we want to extract from the provided object
  @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
  account;

  // when accessing 'name' in html, retrieve the data we obtained from adapter,
  // and get the value we need - the account name
  get name() {
    return getFieldValue(this.account.data, ACCOUNT_NAME_FIELD);
  }
}
