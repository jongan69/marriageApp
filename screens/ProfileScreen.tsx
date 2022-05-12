import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Card, Heading, ScrollView, VStack } from 'native-base';
import { AuthContext, AuthService } from '../providers/AuthProvider';
import firebase from '../services/firebase';
import { t } from '../utils';
import Screen from '../components/common/Screen';
import CoinAuth from '../components/common/CoinAuth';
import BankAuth from '../components/common/BankAuth';
import WalletConnectButton from '../components/common/WalletConnect';
import Button from '../components/common/Button';
import 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 15,
    marginTop: 5,
    backgroundColor: 'green',
  },
});

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();
  const [cb, setCb] = useState(false);
  const [wc, setWc] = useState(false);
  const [accounts, setAccounts] = useState();
  const [cbAccounts, setCbAccounts] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const Accountdatas = await db
        .collection(`Users`)
        .doc(`${user?.uid}`)
        .get();
      console.log('Account Datas', Accountdatas.data().accounts);
      const CBresult = Accountdatas.data().accounts.hasOwnProperty('Coinbase');
      const WCresult =
        Accountdatas.data().accounts.hasOwnProperty('WalletConnect');
      setCb(CBresult);
      setWc(WCresult);
      setAccounts(Accountdatas.data().accounts);
      setCbAccounts(Accountdatas.data().accounts.Coinbase);
    }
    fetchData();
    setLoading(false);
  }, [db, user]);

  return (
    <Screen title={t('profile.title')}>
      <Heading size="lg">
        {t('profile.greeting', { name: user!.displayName || 'User' })}
      </Heading>

      {loading && <ActivityIndicator size="large" />}

      {!loading && (
        <>
          <SafeAreaView style={styles.container}>
            {accounts !== null ? (
              <>
                <Text> Connected Accounts: </Text>
                <FlatList
                  data={cbAccounts}
                  renderItem={item => (
                    <>
                    <Text style={styles.item}>{JSON.stringify(Object.entries(cbAccounts[item.index])[0][1].name)} : {JSON.stringify(Object.entries(cbAccounts[item.index])[0][0])}</Text>
                    </>
                  )}
                  keyExtractor={(item,index) => index}
                />
              </>
            ) : (
              <Text> no linked accounts </Text>
            )}
          </SafeAreaView>
        </>
      )}

      <VStack flex={1} justifyContent="center">
        {!cb && <CoinAuth />}
        <BankAuth />
        <WalletConnectButton />
        <Button
          onPress={() => AuthService.signOut()}
          label={t('profile.logout')}
        />
      </VStack>
    </Screen>
  );
}
