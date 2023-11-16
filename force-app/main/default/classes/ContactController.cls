public with sharing class ContactController {
  // Results will be cached
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts() {
    // method to perform a read operation and retrieve existing contacts
    return [
      SELECT FirstName, LastName, Email
      FROM Contact
      WITH SECURITY_ENFORCED
      ORDER BY Name
    ];
  }
}
