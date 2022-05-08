import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Alert } from 'react-native';
import { getAuth, linkWithCredential } from 'firebase/auth';
import Button from './Button';

WebBrowser.maybeCompleteAuthSession();
const CLIENT_ID =
  '6e0c4de527fcb700a9b2da87f58b0f372c705a5d6f5ffc0b1b3761a8f60749af';
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.coinbase.com/oauth/authorize',
  tokenEndpoint: 'https://api.coinbase.com/oauth/token',
};
// for snack Web
const redirectUri = 'https://marriage-backend.vercel.app/api/auth';
// for Mobile
// const redirectUri = makeRedirectUri({
//   scheme: 'marriagebudgeting',
// });
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
          console.log('DATA FROM COINBASE:', token);
          setState({ token, exchangeError: null });
        }
      })
      .catch(exchangeError => {
        if (isMounted.current) {
          console.log('NO DATA FROM COINBASE');
          setState({ exchangeError, token: null });
        }
      });
  }, [code, isMounted]);

  return state;
}

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
      console.log('TOKEN DATA:', token);
      // const auth = getAuth();
      // linkWithCredential(auth.currentUser, token)
      //   .then(usercred => {
      //     const { user } = usercred;
      //     console.log('Anonymous account successfully upgraded', user);
      //   })
      //   .catch(error => {
      //     console.log('Error upgrading anonymous account', error);
      //   });
    }
  }, [token]);

  return (
    <Button
      disabled={!request}
      label="Login to Coinbase"
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

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
