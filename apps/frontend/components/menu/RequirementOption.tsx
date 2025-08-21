import { icons } from '@/assets';
import { RequirementStatus } from '@/models';
import cn from 'clsx';
import { Image, Text, useColorScheme, View } from 'react-native';
import { PrimaryButton } from '../buttons';
import { DividerX } from '../dividers';

const RequirementOption = (props: RequirementOptionProps) => {
  const isDark = useColorScheme() === 'dark';
  const pending = props.status === RequirementStatus.Pending;
  const verified = props.status === RequirementStatus.Verified;
  const ctaTitle = pending ? 'Pending' : 'Verify';
  const tickIcon = !verified
    ? isDark
      ? icons.dark.tick
      : icons.light.tick
    : isDark
      ? icons.dark.tickSuccess
      : icons.light.tickSuccess;

  return (
    <View className='gap-y-2'>
      <View className='flex-row items-center justify-between py-3'>
        <View className='flex-1 flex-row items-center gap-x-4 py-2'>
          <Image source={tickIcon} className='size-6' resizeMode='contain' />
          <Text className='font-satoshi text-body dark:text-body-dark'>{props.label}</Text>
        </View>

        {(!verified || pending) && (
          <PrimaryButton
            title={ctaTitle}
            containerStyle={cn('py-2.5 rounded-lg', !verified && !pending && 'px-[26px]')}
            disabled={pending}
            onPress={props.onPress}
          />
        )}
      </View>

      <DividerX />
    </View>
  );
};

export default RequirementOption;
