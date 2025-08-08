import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

const VerticalGradient = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <LinearGradient
      colors={
        isDark ? ['rgba(0, 0, 0, 0)', 'rgba(37, 37, 37, 0.65)'] : ['rgba(60, 60, 60, 0)', 'rgba(60, 60, 60, 0.12)']
      }
      start={{ x: 0.25, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default VerticalGradient;
