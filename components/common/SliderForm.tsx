import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from './Button';

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
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(0);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [currency, setCurrency] = useState(null);

  // const auth = getAuth();
  // onAuthStateChanged(auth, user => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const { uid } = user;
  //     setUser(uid);
  //   }
  //   console.log('NOT SIGNED IN');
  // });

  // function storeBudget(user, name, description, value, currency) {
  //   const db = getDatabase();
  //   const reference = ref(db, `users/${user}`);
  //   set(reference, {
  //     budget: { name, description, value, currency },
  //   });
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}> Create a Budget </Text>
      <View>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={name}
          onValueChange={value => setName(value)}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#000"
          style={styles.inputStyle}
          value={description}
          onValueChange={value => setDescription(value)}
        />

        <TextInput
          placeholder="Currency"
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
          // onPress={() => storeBudget(uid, name, description, value, currency)}
        />
      </View>
    </View>
  );
};

export default SliderForm;
