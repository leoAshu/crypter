import { Strings } from '@/constants';
import { useAuth } from '@/hooks';
import { formatPhoneNumber } from '@/utils';
import { FormInputField } from '../form';

const VerifyPhone = () => {
  const { user } = useAuth();

  return (
    <FormInputField
      label={Strings.info.PHONE_LABEL}
      placeholder={Strings.info.PHONE_HINT}
      value={formatPhoneNumber(user?.user_metadata.phone)}
      keyboardType='phone-pad'
      disabled
    />
  );
};

export default VerifyPhone;
