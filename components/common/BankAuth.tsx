import React from 'react';
import { Text } from 'react-native';
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';
import Button from './Button';

export default function BankAuth() {
  return (
    <PlaidLink
      tokenConfig={{
        token: '#GENERATED_LINK_TOKEN#',
      }}
      onSuccess={(success: LinkSuccess) => {
        console.log(success);
      }}
      onExit={(exit: LinkExit) => {
        console.log(exit);
      }}
    >
      <Button label="Link Bank" />
    </PlaidLink>
  );
}
