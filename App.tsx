import './global';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Platform } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import AppNavigator from './navigators/AppNavigator';
import theme from './theme';

LogBox.ignoreAllLogs();
const SCHEME_FROM_APP_JSON = 'marriage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <>
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === 'web'
            ? window.location.origin
            : `${SCHEME_FROM_APP_JSON}://`
        }
        storageOptions={{
          asyncStorage: AsyncStorage,
        }}
      >
        <NativeBaseProvider theme={theme}>
          <AppNavigator />
        </NativeBaseProvider>
      </WalletConnectProvider>
    </>
  );
}
