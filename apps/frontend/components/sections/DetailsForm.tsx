import { useProfile } from '@/hooks';
import { PayMethodCategory } from '@/models';
import { View } from 'react-native';
import { InputField } from '../form';

const DetailsForm = (props: DetailsFormProps) => {
  const { profile } = useProfile();

  const isBank = props.category === PayMethodCategory.Bank;
  const isPhone = props.category === PayMethodCategory.Phone;
  const isUPI = props.category === PayMethodCategory.UPI;

  return (
    <View className='gap-y-2'>
      <InputField label='Name' value={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`} disabled />

      {isBank && (
        <InputField
          label='Bank Name'
          disabled={props.isLoading}
          value={props.formData?.bankName}
          onChangeText={(val) => props.onChange?.('bankName', val)}
        />
      )}

      {isBank && (
        <InputField
          label='Branch Name'
          disabled={props.isLoading}
          value={props.formData?.branchName}
          onChangeText={(val) => props.onChange?.('branchName', val)}
        />
      )}

      {isBank && (
        <InputField
          label='Account Type'
          disabled={props.isLoading}
          value={props.formData?.accountType}
          onChangeText={(val) => props.onChange?.('accountType', val)}
        />
      )}

      {isBank && (
        <InputField
          label='Account Number'
          disabled={props.isLoading}
          value={props.formData?.accountNo}
          onChangeText={(val) => props.onChange?.('accountNo', val)}
        />
      )}

      {isPhone && (
        <InputField
          label='Phone Number'
          keyboardType='phone-pad'
          disabled={props.isLoading}
          value={props.formData?.phone}
          onChangeText={(val) => props.onChange?.('phone', val)}
        />
      )}

      {isUPI && (
        <InputField
          label='UPI ID'
          disabled={props.isLoading}
          value={props.formData?.upiId}
          onChangeText={(val) => props.onChange?.('upiId', val)}
        />
      )}
    </View>
  );
};

export default DetailsForm;
