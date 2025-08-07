import cn from 'clsx';
import { Image, Platform, Text, View } from 'react-native';

const TabBarIcon = (props: TabBarIconProps) => {
  const isIOS = Platform.OS === 'ios';
  return (
    <View className={cn('tab-icon-wrapper', isIOS ? 'mt-12' : 'mt-10')}>
      <Image source={props.icon} className={cn('tab-icon', props.iconStyle)} resizeMode='contain' />
      <Text className={cn('tab-icon-label', props.focused ? 'tab-icon-label-active' : 'tab-icon-label-inactive')}>
        {props.title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
