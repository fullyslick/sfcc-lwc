import { LightningElement, wire } from 'lwc';

// adapterId and adapter-modules for getRecord and getFieldValue from lightning/uiRecordApi
// These are functions that are provided to @wire decorator,
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// imports the current User Id using the @salesforce module
import Id from '@salesforce/user/Id';

// the @salesforce schema for User.Name.
// This helps you extract the username specifically from a record with data
import NAME_FIELD from '@salesforce/schema/User.Name';

const fields = [NAME_FIELD];
export default class Selector extends LightningElement {
  selectedProductId;

  handleProductSelected(evt) {
    this.selectedProductId = evt.detail;
  }

  // Make the user id available as reactive property so it can be rendered on UI
  userId = Id;

  // Calls decorator with the getRecord function that will extract the data for field = username
  // After that data is assigned to reactive property so it can be rendered on UI
  @wire(getRecord, { recordId: '$userId', fields })
  user;

  // The data for username is an object
  // This getter allows when accessing {name} in html,
  // to extract the value of 'username' field
  get name() {
    return getFieldValue(this.user.data, NAME_FIELD);
  }
}
