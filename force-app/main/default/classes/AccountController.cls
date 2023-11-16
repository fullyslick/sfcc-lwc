public with sharing class AccountController {
  // Results will be cached
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    // method to perform a read operation and retrieve existing accounts
    return [
      SELECT Name, AnnualRevenue, Industry
      FROM Account
      WITH SECURITY_ENFORCED
      ORDER BY Name
    ];
  }
}
