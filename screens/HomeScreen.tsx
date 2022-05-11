import React from 'react';
import { Card, Text } from 'native-base';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import getList from '../hooks/getNFTs';

export default function HomeScreen({ navigation }) {
  const connector = useWalletConnect();
  return (
    <Screen title={t('home.title')}>
      <Card>
        <Text>Welcome Home, log spending below</Text>

        {connector.connected && (
          <Card>
            <Text>WEB3 DATA </Text>
            <Text>Wallet: {connector.accounts[0]}</Text>
            {connector.chainId !== 1 ? (
              <Text>Not Eth Mainnet</Text>
            ) : (
              <>
                <Text>NFT VALUE </Text>
                <Text>Chain: {connector.chainId}</Text>
              </>
            )}
          </Card>
        )}
      </Card>

      <Button
        label="Add a receipt"
        onPress={() => navigation.navigate('Modal')}
      />

      <Card>
        <Text>List of transactional data</Text>
      </Card>
    </Screen>
  );
}
