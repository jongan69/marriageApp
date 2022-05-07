import React from 'react';
import { Card, Text } from 'native-base';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A80421',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    margin: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

function Button({ onPress, label }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <Screen title={t('home.title')}>
      <Card>
        <Text>Welcome Home, log spending below</Text>
      </Card>
      <Button label="Add a receipt" />
      <Card>
        <Text>List of transactional data</Text>
      </Card>
    </Screen>
  );
}
