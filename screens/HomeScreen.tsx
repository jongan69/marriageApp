import React from 'react';
import { Text } from 'native-base';
import { t } from '../utils';
import Screen from '../components/common/Screen';

export default function HomeScreen({ navigation }) {
  return (
    <Screen title={t('home.title')}>
      <Card>
        <Text>Welcome Home, log spending below</Text>
      </Card>
      <Card>
        <Text>List of transactional data</Text>
      </Card>
    </Screen>
  );
}
