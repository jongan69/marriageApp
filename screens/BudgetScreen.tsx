import React from 'react';
import { Text, Heading } from 'native-base';
import { ScrollView } from 'react-native';
import { t } from '../utils';
import Screen from '../components/common/Screen';

export default function BudgetScreen() {
  return (
    <>
      <Screen title={"Budget"}>
        {/* <Heading size="lg">Budget Screen</Heading> */}
        <ScrollView>
          <Text> Budget Screen </Text>
          {/* <Screen title={t('home.title')}>
       
        <Text>{t('home.greeting')}</Text>
      </Screen> */}
        </ScrollView>
      </Screen>
    </>
  );
}
