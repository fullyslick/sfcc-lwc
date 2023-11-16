import { LightningElement, wire } from 'lwc';

import getContacts from '@salesforce/apex/ContactController.getContacts';

import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';

const COLUMNS = [
  {
    label: 'First Name',
    fieldName: CONTACT_FIRST_NAME_FIELD.fieldApiName,
    type: 'text'
  },
  {
    label: 'Last Name',
    fieldName: CONTACT_LAST_NAME_FIELD.fieldApiName,
    type: 'text'
  },
  {
    label: 'Email',
    fieldName: CONTACT_EMAIL_FIELD.fieldApiName,
    type: 'text'
  }
];

export default class ContactList extends LightningElement {
  columns = COLUMNS;

  @wire(getContacts)
  contacts;
}
