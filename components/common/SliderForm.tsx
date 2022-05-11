import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Button from './Button';
import { AuthContext } from '../../providers/AuthProvider';
import firebase from '../../services/firebase';
import 'firebase/firestore';

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
  const [budget, setBudget] = useState(0);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [currency, setCurrency] = useState();

  function storeBudget() {
    console.log('BUDGET DATA: ', user, name, budget, description, currency);
    const db = firebase.firestore();
    db.collection('budgets')
      .doc(user.uid)
      .set({
        name,
        budget,
        description,
        currency,
        creators: [user.email],
      });
    Alert.alert('Budget Created!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}> Create a Budget </Text>
      <View>
        <TextInput
          placeholder="Budget Name"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          onChangeText={setName}
          value={name}
          // onValueChange={value => setName(value)}
        />

        <TextInput
          placeholder="Budget Description"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          placeholder="Budget Currency"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={currency}
          onChangeText={setCurrency}
        />

        <Text style={{ marginTop: 16, color: '#fff', fontSize: 15 }}>
          How much?
        </Text>

        <Slider
          style={{ marginTop: 20 }}
          step={1}
          minimumValue={0}
          maximumValue={1000000}
          value={budget}
          onValueChange={slideValue => setBudget(slideValue)}
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
          ${budget}
        </Text>
        <Button label="Confirm" onPress={() => storeBudget()} />
      </View>
    </View>
  );
};

export default SliderForm;
