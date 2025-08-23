import { icons } from '@/assets';
import { PrimaryButton, RequirementOption } from '@/components';
import { Strings, ToastStrings } from '@/constants';
import { useKyc } from '@/hooks';
import { KycStatus } from '@/models';
import { router } from 'expo-router';
import { Image, Text, useColorScheme, View } from 'react-native';
import Toast from 'react-native-toast-message';

const Requirements = () => {
  const isDark = useColorScheme() === 'dark';

  const { isLoading, requirements, requirementsMet, updateKyc } = useKyc();

  const sendApplication = async () => {
    await updateKyc('kycStatus', KycStatus.Pending);
    Toast.show({
      type: 'success',
      text1: ToastStrings.Info.KYC_SUBMIT_TITLE,
      text2: ToastStrings.Info.KYC_SUBMIT,
      position: 'bottom',
      bottomOffset: 112,
      autoHide: false,
      onHide: () => {
        router.back();
        router.back();
      },
    });
  };

  return (
    <>
      <View className='content-wrapper mt-6'>
        <View className='gap-y-4'>
          {requirements.map((item) => (
            <RequirementOption
              key={item.id}
              label={item.label}
              status={item.status}
              onPress={() => router.push({ pathname: '/verify/[reqId]', params: { reqId: item.id } })}
            />
          ))}
        </View>

        <View className='mt-6 gap-y-4 rounded-md border-[0.5px] border-dashed border-warning-500 bg-warning-500/10 px-3 py-4 dark:border-warning-100 dark:bg-warning-100/10'>
          <View className='flex-row items-center gap-x-2'>
            <Image source={isDark ? icons.dark.danger : icons.light.danger} className='size-4' resizeMode='contain' />
            <Text className='font-clashDisplay text-sm text-title dark:text-title-dark'>
              {Strings.requirements.ATTENTION_LABEL}
            </Text>
          </View>

          <Text className='font-satoshi text-sm text-body dark:text-body-dark'>
            {Strings.requirements.ATTENTION_TEXT}
          </Text>
        </View>
      </View>

      <View className='absolute bottom-24 left-0 right-0 px-4'>
        <PrimaryButton
          title={Strings.requirements.CTA_LABEL}
          isLoading={isLoading}
          disabled={!requirementsMet}
          onPress={sendApplication}
        />
      </View>
    </>
  );
};

export default Requirements;
