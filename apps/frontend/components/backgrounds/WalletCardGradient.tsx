import { LinearGradient } from 'expo-linear-gradient';

const WalletCardGradient = () => {
  return (
    <LinearGradient
      colors={[
        'rgba(84, 230, 182,0.28)',
        'rgba(84, 230, 182,0.25)',
        'rgba(84, 230, 182,0.20)',
        'rgba(84, 230, 182,0.17)',
        'rgba(84, 230, 182,0.15)',
        'rgba(84, 230, 182,0.13)',
        'transparent',
      ]}
      locations={[0, 0.08, 0.16, 0.25, 0.35, 0.55, 1]}
      start={{ x: 0.75, y: 0.75 }}
      end={{ x: 0, y: 0 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default WalletCardGradient;
