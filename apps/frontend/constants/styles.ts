import { Platform } from 'react-native';

const screenContentWrapperStyle = Platform.select({
  ios: 'mt-20',
  android: 'mt-20',
});

const adsListStyle = Platform.select({
  ios: 'mb-20',
  android: 'mb-24',
});

export { adsListStyle, screenContentWrapperStyle };
