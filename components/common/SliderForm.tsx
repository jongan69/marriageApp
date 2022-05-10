import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { getStorage, ref, set } from 'firebase/storage';
import Button from './Button';
import { AuthContext } from '../../providers/AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A80421',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },

  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

const SliderForm = () => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [currency, setCurrency] = useState(null);

  function storeBudget() {
    const db = getStorage();
    set(ref(db, `users/${user?.uid}/Budgets`), {
      name,
      value,
      description,
      currency,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}> Create a Budget </Text>
      <View>
        <TextInput
          placeholder="Budget Name"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={name}
          onValueChange={value => setName(value)}
        />

        <TextInput
          placeholder="Budget Description"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onValueChange={value => setDescription(value)}
        />

        <TextInput
          placeholder="Budget Currency"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={currency}
          onValueChange={value => setCurrency(value)}
        />

        <Text style={{ marginTop: 16, color: '#fff', fontSize: 15 }}>
          How much?
        </Text>

        <Slider
          style={{ marginTop: 20 }}
          step={1}
          minimumValue={0}
          maximumValue={1000000}
          value={value}
          onValueChange={slideValue => setValue(slideValue)}
          minimumTrackTintColor="#H9d3d3"
          maximumTrackTintColor="#FFF"
          thumbTintColor="#000"
        />
        <Text
          style={{
            fontSize: 30,
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ${value}
        </Text>
        <Button
          label="Confirm"
          onPress={() => storeBudget(user, name, value, description, currency)}
        />
      </View>
    </View>
  );
};

export default SliderForm;
