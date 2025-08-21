import { AppBar, PrimaryButton, VerifyEmail, VerifyIdentity, VerifyPhone } from '@/components';
import { Strings } from '@/constants';
import { RequirementType } from '@/models';
import { capitalizeWords } from '@/utils';
import cn from 'clsx';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Info = () => {
  const navigation = useNavigation();
  const { reqId } = useLocalSearchParams<{ reqId: string }>();

  const formStyle = Platform.select({
    android: 'pb-52',
    ios: 'pb-72',
  });

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
          <PrimaryButton title={Strings.info.CTA_LABEL} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Info;
