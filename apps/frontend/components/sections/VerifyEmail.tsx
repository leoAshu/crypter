import { Strings } from '@/constants';
import { useKyc } from '@/hooks';
import { FormInputField } from '../form';

const VerifyEmail = () => {
  const { kyc } = useKyc();

  return (
    <FormInputField
      label={Strings.info.EMAIL_LABEL}
      placeholder={Strings.info.EMAIL_HINT}
      value={kyc?.email}
      disabled
    />
  );
};

export default VerifyEmail;
