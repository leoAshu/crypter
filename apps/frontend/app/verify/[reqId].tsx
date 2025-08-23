import { AppBar, PrimaryButton, VerifyEmail, VerifyIdentity, VerifyPhone } from '@/components';
import { Strings, ToastStrings } from '@/constants';
import { useKyc } from '@/hooks';
import { RequirementStatus, RequirementType } from '@/models';
import { capitalizeWords } from '@/utils';
import cn from 'clsx';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Info = () => {
  const navigation = useNavigation();
  const { isLoading, updateKyc } = useKyc();
  const { reqId } = useLocalSearchParams<{ reqId: string }>();

  const formStyle = Platform.select({
    android: 'pb-52',
    ios: 'pb-72',
  });

  const handlePress = async () => {
    if (reqId === RequirementType.Email || reqId === RequirementType.Phone)
      return router.push({ pathname: '/verify/otp', params: { reqId } });

    await updateKyc('identityStatus', RequirementStatus.Pending);
    Toast.show({
      type: 'success',
      text1: ToastStrings.Info.VERIFICATION_SUBMIT_TITLE,
      text2: ToastStrings.Info.VERIFICATION_SUBMIT,
      position: 'bottom',
      bottomOffset: 112,
      autoHide: false,
      onHide: () => {
        router.back();
      },
    });
  };

  useLayoutEffect(() => {
    const appBarTitle = `${capitalizeWords(reqId)} Verification`;
    navigation.setOptions({
      header: () => <AppBar title={appBarTitle} />,
    });
  }, []);

  return (
    <>
      <SafeAreaView className='screen-wrapper' edges={['bottom']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false} className='mt-4'>
            <View className={cn('content-wrapper', formStyle)}>
              {reqId === RequirementType.Email && <VerifyEmail />}

              {reqId === RequirementType.Phone && <VerifyPhone />}

              {reqId === RequirementType.Identity && <VerifyIdentity />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View className={cn('absolute-bottom-form-cta', Platform.select({ android: 'pb-48', ios: 'pb-56' }))}>
          <PrimaryButton title={Strings.info.CTA_LABEL} isLoading={isLoading} onPress={handlePress} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Info;
