import React from 'react';
import { Card, Text } from 'native-base';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';

export default function HomeScreen({ navigation }) {
  return (
    <Screen title={t('home.title')}>
      <Card>
        <Text>Welcome Home, log spending below</Text>
      </Card>
      <Button label="Add a receipt" onPress={() => navigation.navigate('Modal')} />
      <Card>
        <Text>List of transactional data</Text>
      </Card>
    </Screen>
  );
}
