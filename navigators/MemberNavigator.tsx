import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button } from 'react-native';
import BottomTabBar from '../components/common/BottomTabBar';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BudgetScreen from '../screens/BudgetScreen';
import CaptureScreen from '../screens/CaptureScreen';

const { Navigator, Screen } = createBottomTabNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Upload or Capture Receipt</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default function MemberNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Budget" component={BudgetScreen} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Capture" component={CaptureScreen} />
      <Screen
        name="Modal"
        component={ModalScreen}
        screenOptions={{ presentation: 'modal' }}
      />
    </Navigator>
  );
}
