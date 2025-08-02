import cn from 'clsx';
import { Image, Text, View } from 'react-native';

const TabBarIcon = (props: TabBarIconProps) => (
  <View className='tab-icon-wrapper'>
    <Image source={props.icon} className={cn('tab-icon', props.iconStyle)} resizeMode='contain' />
    <Text className={cn('tab-icon-label', props.focused ? 'tab-icon-label-active' : 'tab-icon-label-inactive')}>
      {props.title}
    </Text>
  </View>
);

export default TabBarIcon;
