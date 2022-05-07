import React, { useContext } from 'react';
import { Card, Heading, VStack } from 'native-base';
import { AuthContext, AuthService } from '../providers/AuthProvider';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import CoinAuth from '../components/common/CoinAuth';
import WalletConnectButton from '../components/common/WalletConnect';
import Button from '../components/common/Button';

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  return (
    <Screen title={t('profile.title')}>
      <Heading size="lg">
        {t('profile.greeting', { name: user!.displayName || 'Joe' })}
      </Heading>

      <Card>
        <CoinAuth />
      </Card>

      <Card>
        <WalletConnectButton />
      </Card>

      <Card>
        <Button label="Plaid Bank Link" />
      </Card>

      <VStack flex={1} justifyContent="center">
        <Button
          onPress={() => AuthService.signOut()}
          label={t('profile.logout')}
        />
      </VStack>
    </Screen>
  );
}
