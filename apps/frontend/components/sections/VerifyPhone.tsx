import { Strings } from '@/constants';
import { useKyc } from '@/hooks';
import { formatPhoneNumber } from '@/utils';
import { FormInputField } from '../form';

const VerifyPhone = () => {
  const { kyc } = useKyc();

  return (
    <FormInputField
      label={Strings.info.PHONE_LABEL}
      placeholder={Strings.info.PHONE_HINT}
      value={formatPhoneNumber(kyc?.phone ?? '')}
      keyboardType='phone-pad'
      disabled
    />
  );
};

export default VerifyPhone;
