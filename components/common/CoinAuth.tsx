import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button } from 'react-native';

// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithCustomToken } from 'firebase/auth';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();
const CLIENT_ID =
  '6e0c4de527fcb700a9b2da87f58b0f372c705a5d6f5ffc0b1b3761a8f60749af';
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.coinbase.com/oauth/authorize',
  tokenEndpoint: 'https://www.coinbase.com/oauth/authorize',
};
// for snack Web
const redirectUri = 'https://marriageapp-bf2a0.firebaseapp.com';
// for Mobile
// const redirectUri = makeRedirectUri({
//   scheme: 'marriage'
// });

// add firebase config
// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.apiKey,
//   authDomain: Constants.manifest.extra.authDomain,
//   projectId: Constants.manifest.extra.projectId,
//   storageBucket: Constants.manifest.extra.storageBucket,
//   messagingSenderId: Constants.manifest.extra.messagingSenderId,
//   appId: Constants.manifest.extra.appId,
//   databaseURL: Constants.manifest.extra.databaseURL,
// };

// initialize firebase
// initializeApp(firebaseConfig);

export default function CoinAuth() {
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
      // initialize auth
      // const auth = getAuth();
      // signInWithCustomToken(auth, token)
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //     // ...
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // ...
      //   });
      console.log('My Token:', token.accessToken);
    }
  }, [token]);

  return (
    <Button
      disabled={!request}
      title="Login to Coinbase"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}

type State = {
  token: TokenResponse | null;
  exchangeError: Error | null;
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not here in the application.
// For educational purposes only:
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
        clientSecret:
          '383127e0f873db7ec54826c922b3b15c9c56ffcb9da271bc607a4395711f408e',
        code,
        redirectUri,
      },
      discovery,
    )
      .then(token => {
        if (isMounted.current) {
          setState({ token, exchangeError: null });
        }
      })
      .catch(exchangeError => {
        if (isMounted.current) {
          setState({ exchangeError, token: null });
        }
      });
  }, [code, isMounted]);

  return state;
}

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
