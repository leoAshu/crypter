import { Strings } from '@/constants';
import { useAuth } from '@/hooks';
import { FormInputField } from '../form';

const VerifyEmail = () => {
  const { user } = useAuth();

  return (
    <FormInputField
      label={Strings.info.EMAIL_LABEL}
      placeholder={Strings.info.EMAIL_HINT}
      value={user.email}
      disabled
    />
  );
};

export default VerifyEmail;
