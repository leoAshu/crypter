import { Platform } from 'react-native';

const contentWrapperStyle = Platform.select({
  ios: 'mt-16',
  android: 'mt-20',
});

export { contentWrapperStyle };
