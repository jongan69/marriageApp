import React, { useContext } from 'react';
import { Button, Card, Heading, VStack } from 'native-base';
import { AuthContext, AuthService } from '../providers/AuthProvider';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import CoinAuth from '../components/common/CoinAuth';
import WalletConnectButton from '../components/common/WalletConnect';

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

      <VStack flex={1} justifyContent="center">
        <Button onPress={() => AuthService.signOut()}>
          {t('profile.logout')}
        </Button>
      </VStack>
    </Screen>
  );
}
