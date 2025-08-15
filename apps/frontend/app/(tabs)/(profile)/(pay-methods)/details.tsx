import { DetailsForm, PrimaryButton } from '@/components';
import { AlertStrings } from '@/constants';
import { usePayMethod, useProfile } from '@/hooks';
import { PayMethodCategory } from '@/models';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Details = () => {
  const [formData, setFormData] = useState<Partial<PayMethod>>({
    bankName: '',
    branchName: '',
    accountType: '',
    ifsc: '',
    accountNo: '',
    phone: '',
    upiId: '',
  });

  const { profile } = useProfile();
  const { isLoading, addNewPayMethod, generatePayMethodId } = usePayMethod();
  const { payMethodTypeId, payMethodTypeName, payMethodTypeCategory } = useLocalSearchParams();

  const updateForm = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const submitForm = async () => {
    const detail: PayMethod = {
      id: generatePayMethodId({
        ...formData,
        userId: profile?.id ?? '',
        payMethodTypeId: payMethodTypeId as string,
      }),
      userId: profile?.id ?? '',
      payMethodTypeId: payMethodTypeId as string,
      isActive: true,
      ...formData,
    };

    try {
      await addNewPayMethod(detail);
      router.navigate('/(tabs)/(profile)/(pay-methods)');
    } catch (error: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, 'Pay Method already exists');
    }
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View className='content-wrapper mt-4 px-6'>
            <Text className='font-clashDisplay-medium text-lg text-title dark:text-title-dark'>
              {payMethodTypeName}
            </Text>

            <DetailsForm
              formData={formData}
              isLoading={isLoading}
              category={payMethodTypeCategory as PayMethodCategory}
              onChange={updateForm}
            />

            <View className='mt-4'>
              <PrimaryButton title='Add' isLoading={isLoading} disabled={isLoading} onPress={submitForm} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Details;
