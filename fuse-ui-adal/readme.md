# ADAL for getting ARM token

## Get Started

```bash
npm install @fuselab/ui-adal
```

or

```bash
lerna add @fuselab/ui-adal
```

## Provision app in Azure active directory

1. Login to https://portal.azure.com
1. Go to "Azure Active Directory", select "app registrations", click on "New application registration"

   ![AzureAD App Registrations](./assets/azure_ad_app_reg.jpg)

1. Create a new native app registration

   ![New native app](./assets/azure_ad_new_app_reg.jpg)

   for RedirectUri fill in your dev-server localhost address (you will add redirect uris for your other environment later)

1. Add additional RedirectUri for different environments

   ![add redirect uri](./assets/azure_ad_edit_redirect_uri.jpg)

1. Request access to ARM API

   ![add access to ARM](./assets/azure_ad_access_arm.jpg)

   and set scope to delegated

   ![ARM permission](./assets/azure_ad_access_scope.jpg)

1. Verify/update app manifest

   ![App Manifest](./assets/azure_ad_app_manifest.jpg)

   * make sure that <kbd>oauth2AllowImplicitFlow</kbd> is set to <kbd>true</kbd>
   * make sure that resourceId <kbd>797f4846-ba00-4fd7-ba43-dac1f8f63013</kbd> (for ARM) is present
