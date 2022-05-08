import React, { useState } from 'react';
import { Heading, Input, IInputProps, Icon, FormControl } from 'native-base';
import { ScrollView, StyleSheet, TextInput, View, Text } from 'react-native';
import { useField, useFormikContext } from 'formik';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import SliderForm from '../components/common/SliderForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default function BudgetBuilder(this: any) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(null);

  return (
    <>
      <Screen title="Budget">
        <Heading size="lg">New Budget</Heading>
        <ScrollView>
          <View style={styles.container}>
            <SliderForm />
          </View>
        </ScrollView>
        <Button label="Add Budget" />
      </Screen>
    </>
  );
}
