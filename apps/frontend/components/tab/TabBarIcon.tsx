import cn from 'clsx';
import { Image, View } from 'react-native';

const TabBarIcon = (props: TabBarIconProps) => (
  <View className='tab-icon'>
    <Image
      source={props.icon}
      className={cn('size-6', props.iconStyle)}
      resizeMode='contain'
      tintColor={props.focused ? '#0066FF' : '#B5B9C1'}
    />
  </View>
);

export default TabBarIcon;
