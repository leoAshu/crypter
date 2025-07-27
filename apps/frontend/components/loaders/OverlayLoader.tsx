import { BlurView } from 'expo-blur';
import { ActivityIndicator, useColorScheme } from 'react-native';

const OverlayLoader = (props: OverlayLoaderProps) => {
  const isDark = useColorScheme() === 'dark';

  if (!props.visible) return null;

  return (
    <BlurView
      intensity={75}
      tint={isDark ? 'dark' : 'light'}
      className='absolute inset-0 z-50 items-center justify-center'
    >
      <ActivityIndicator size='large' className='color-on-surface dark:color-on-surface-dark' />
    </BlurView>
  );
};

export default OverlayLoader;
