import { extendTheme } from 'native-base';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const colors = {
  primary: {
    50: '#355070',
    100: '#6D597A',
    200: '#B56576',
    300: '#E56B6F',
    400: '#EAAC8B',
    500: '#A80421',
    600: '#A80421',
    700: '#A80421',
    800: '#A80421',
    900: '#A80421',
  },
};

const theme = extendTheme({ colors, config });

export default theme;
