import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomTabBar from '../components/common/BottomTabBar';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BudgetScreen from '../screens/BudgetScreen';
import CaptureScreen from '../screens/CaptureScreen';
import BudgetBuilder from '../screens/BudgetBuilder';

const { Navigator, Screen } = createBottomTabNavigator();

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 50 }}>
        Upload or Capture Receipt
      </Text>
      <Button onPress={pickImage} title="Upload" />
      <Button onPress={() => navigation.navigate('Capture')} title="Capture" />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default function MemberNavigator({ user }) {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Budget" component={BudgetScreen} user={user} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Capture" component={CaptureScreen} />
      <Screen
        name="Modal"
        component={ModalScreen}
        screenOptions={{ presentation: 'modal' }}
      />
      <Screen
        name="BudgetBuilder"
        component={BudgetBuilder}
        screenOptions={{ presentation: 'modal' }}
      />
    </Navigator>
  );
}
