import { AppBar, FormInputField, PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { useAuth, useProfile } from '@/hooks';
import { RequirementType } from '@/models';
import { capitalizeWords, formatPhoneNumber } from '@/utils';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { View } from 'react-native';

const Info = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigation = useNavigation();
  const { reqId } = useLocalSearchParams<{ reqId: string }>();

  const verifyEmail = reqId === RequirementType.Email;
  const verifyPhone = reqId === RequirementType.Phone;
  const verifyIdentity = reqId === RequirementType.Identity;

  useLayoutEffect(() => {
    const appBarTitle = `${capitalizeWords(reqId)} Verification`;
    navigation.setOptions({
      header: () => <AppBar title={appBarTitle} />,
    });
  }, []);

  return (
    <>
      <View className='content-wrapper mt-6'>
        <View className='gap-y-4'>
          {verifyEmail && (
            <FormInputField
              label={Strings.info.EMAIL_LABEL}
              placeholder={Strings.info.EMAIL_HINT}
              value={user.email}
              disabled
            />
          )}

          {verifyPhone && (
            <FormInputField
              label={Strings.info.PHONE_LABEL}
              placeholder={Strings.info.PHONE_HINT}
              value={formatPhoneNumber(user?.user_metadata.phone)}
              keyboardType='phone-pad'
              disabled
            />
          )}

          {verifyIdentity && (
            <FormInputField
              label={Strings.info.NAME_LABEL}
              placeholder={Strings.info.NAME_HINT}
              value={user.email}
              disabled
            />
          )}

          {verifyIdentity && (
            <FormInputField label={Strings.info.COUNTRY_LABEL} placeholder={Strings.info.COUNTRY_HINT} value={''} />
          )}

          {verifyIdentity && (
            <FormInputField label={Strings.info.ADDRESS_LABEL} placeholder={Strings.info.ADDRESS_HINT} value={''} />
          )}
        </View>
      </View>

      <View className='absolute bottom-24 left-0 right-0 px-4'>
        <PrimaryButton title={Strings.info.CTA_LABEL} />
      </View>
    </>
  );
};

export default Info;
