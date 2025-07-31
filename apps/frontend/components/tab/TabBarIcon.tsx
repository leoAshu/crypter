import cn from 'clsx';
import { Image, Text, View } from 'react-native';

const TabBarIcon = (props: TabBarIconProps) => (
  <View className='tab-icon-wrapper'>
    <Image source={props.icon} className={cn('tab-icon', props.iconStyle)} resizeMode='contain' />
    <Text className={cn('tab-icon-label', props.focused ? 'text-primary' : 'text-neutral-400')}>{props.title}</Text>
  </View>
);

export default TabBarIcon;
