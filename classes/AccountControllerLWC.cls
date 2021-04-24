public with sharing class AccountControllerLWC  {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsData() {
        return [SELECT Id, Name, Phone, Website FROM Account LIMIT 10];
    }
}
