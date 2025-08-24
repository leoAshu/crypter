import { icons } from '@/assets';
import { AppBar, NotificationModal, PrimaryButton, VerifyEmail, VerifyIdentity, VerifyPhone } from '@/components';
import { Strings } from '@/constants';
import { useKyc } from '@/hooks';
import { RequirementStatus, RequirementType } from '@/models';
import { capitalizeWords } from '@/utils';
import cn from 'clsx';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { JSX, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Info = () => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const { isLoading, updateKyc } = useKyc();
  const { reqId } = useLocalSearchParams<{ reqId: string }>();

  const [modalVisible, setModalVisible] = useState(false);

  const formStyle = Platform.select({
    android: 'pb-52',
    ios: 'pb-72',
  });

  const handlePress = async () => {
    if (reqId === RequirementType.Email || reqId === RequirementType.Phone)
      return router.push({ pathname: '/verify/otp', params: { reqId } });

    await updateKyc('identityStatus', RequirementStatus.Pending);
    setModalVisible(true);
  };

  useLayoutEffect(() => {
    const appBarTitle = `${capitalizeWords(reqId)} Verification`;
    navigation.setOptions({
      header: () => <AppBar title={appBarTitle} />,
    });
  }, []);

  const componentsMap: Record<RequirementType, JSX.Element> = {
    [RequirementType.Email]: <VerifyEmail />,
    [RequirementType.Phone]: <VerifyPhone />,
    [RequirementType.Identity]: <VerifyIdentity />,
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} className='mt-4'>
          <View className={cn('content-wrapper', formStyle)}>{componentsMap[reqId as RequirementType]}</View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className={cn('absolute-bottom-form-cta', Platform.select({ android: 'pb-48', ios: 'pb-56' }))}>
        <PrimaryButton title={Strings.info.CTA_LABEL} isLoading={isLoading} onPress={handlePress} />
      </View>

      <NotificationModal
        visible={modalVisible}
        icon={isDark ? icons.dark.clockHalo : icons.light.clockHalo}
        title={Strings.verifyIdentity.TITLE_DOC_SUBMIT}
        label={Strings.verifyIdentity.DOC_SUBMIT}
        onClose={router.back}
      />
    </SafeAreaView>
  );
};

export default Info;
