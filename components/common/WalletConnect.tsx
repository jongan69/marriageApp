import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { AuthContext } from '../../providers/AuthProvider';
import firebase from '../../services/firebase';
import 'firebase/firestore';

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

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;
};

function Button({ onPress, label }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function WalletConnectButton() {
  const { user } = useContext(AuthContext);
  const connector = useWalletConnect();

  async function storeAccounts() {
    console.log('ACCOUNT DATA: ', connector.accounts[0]);
    const db = firebase.firestore();
    db.collection(`Users`)
      .doc(`${user?.uid}`)
      .set(
        { accounts: { WalletConnect: connector.accounts[0] } },
        { merge: true },
      );
  }

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    // navigation.navigate('Welcome')
    return connector.killSession();
  }, [connector]);

  if (connector.accounts[0]) {
    storeAccounts(connector.accounts[0]);
    Alert.alert('Wallet Linked!');
  }

  return (
    <>
      {!connector.connected ? (
        <>
          <Button onPress={connectWallet} label="Connect a Web3 wallet" />
        </>
      ) : (
        <>
          <Text
            style={{
              color: 'darkgreen',
              borderLeftWidth: 0.3,
              borderColor: 'black',
            }}
          >
            Linked {shortenAddress(connector.accounts[0])}
          </Text>
          <Button onPress={killSession} label="Disconnect Web3 Wallet" />
        </>
      )}
    </>
  );
}
