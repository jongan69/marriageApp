const request: LinkTokenCreateRequest = {
  user: {
    client_user_id: 'user-id',
  },
  client_name: 'Plaid Test App',
  products: ['auth', 'transactions'],
  country_codes: ['US'],
  language: 'en',
  webhook: 'https://sample-web-hook.com',
  redirect_uri: 'https://domainname.com/oauth-page.html',
  account_filters: {
    depository: {
      account_subtypes: [
        'DepositoryAccountSubtype.Checking, DepositoryAccountSubtype.Savings',
      ],
    },
  },
};
try {
  const response = await plaidClient.linkTokenCreate(request);
  const linkToken = response.data.link_token;
} catch (error) {
  // handle error
}
