import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../../services/firebase';
import { AuthContext } from '../../providers/AuthProvider';
import Button from './Button';
import 'firebase/firestore';
// import { getAuth, linkWithCredential } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();
const CLIENT_ID =
  '9764f0fa31a230a5d8f4c923cee2a7066d8ada4676faf300422fa49482ef1127';
const CLIENT_SECRET =
  '5be10d9917e2b75802b6ab89fe196004fc9e4f63ba5a0706773c3484ab75d3e4';

// for Expo Prod Web
// const redirectUri = 'https://marriage-backend.vercel.app/api/auth';

// for Expo Web
const redirectUri = 'exp://192.168.1.141:19000/auth/';

// for Mobile DeepLink
// const redirectUri = makeRedirectUri({
//   native: 'com.marriagebudgeting://',
// });

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.coinbase.com/oauth/authorize',
  tokenEndpoint: 'https://api.coinbase.com/oauth/token',
  revocationEndpoint: 'https://api.coinbase.com/oauth/revoke',
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not here in the application.
// For educational purposes only:

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

function useAutoExchange(code?: string): State {
  const [state, setState] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    { token: null, exchangeError: null },
  );
  const isMounted = useMounted();

  React.useEffect(() => {
    if (!code) {
      setState({ token: null, exchangeError: null });
      return;
    }
    exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        code,
        redirectUri,
      },
      discovery,
    )
      .then(token => {
        if (isMounted.current) {
          Alert.alert('DATA FROM COINBASE:', JSON.stringify(token));
          setState({ token, exchangeError: null });
        }
      })
      .catch(exchangeError => {
        if (isMounted.current) {
          console.log('NO DATA FROM COINBASE: ', exchangeError, isMounted);
          setState({ exchangeError, token: null });
        }
      });
  }, [code, isMounted]);

  return state;
}

export default function CoinAuth() {
  const { user } = useContext(AuthContext);
  const [coinData, setCoinData] = useState();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['wallet:accounts:read'],
      redirectUri,
    },
    discovery,
  );
  const {
    // The token will be auto exchanged after auth completes.
    token,
    exchangeError,
  } = useAutoExchange(
    response?.type === 'success' ? response.params.code : 'null',
  );

  React.useEffect(() => {
    if (token) {
      try {
        console.log('TOKEN DATA:', token);
        fetch('https://api.coinbase.com/v2/accounts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }).then(async result => {
          const balances = await result.json();
          // Alert.alert('DATA:', balances.data[]);
          const balanceData = [];
          console.log('ADDING ACCOUNT: ');
          balances.data.forEach((item, index) => {
            if (item) {
              console.log('Item: ', item.id, 'at index', index);
              balanceData.push({ [item.balance.currency]: item });
            }
          });
          function storeAccounts() {
            console.log('ACCOUNT DATA: ', balanceData);
            const db = firebase.firestore();
            db.collection(`Users`)
              .doc(`${user?.uid}`)
              .set({ accounts: { Coinbase: balanceData } }, { merge: true });
            Alert.alert('Coinbase Accounts Linked!');
          }
          storeAccounts();
          setCoinData(balanceData);
        });
      } catch {
        console.log('No data');
      }
    }
  }, [token, user]);
  return (
    <>
      {/* {coinData?.length > 0 && (
        <Button
          disabled={!request}
          label="Logout of Coinbase"
          onPress={() => {
            promptAsync();
          }}
        />
      )} */}
      {coinData?.length > 0 ? (
        <Button label="Logout of Coinbase" />
      ) : (
        <Button
          disabled={!request}
          label="Login to Coinbase"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </>
  );
}

type State = {
  token: TokenResponse | null;
  exchangeError: Error | null;
};
