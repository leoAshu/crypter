import { Strings } from '@/constants';
import { useCountry, useKyc } from '@/hooks';
import { formatPhoneNumber } from '@/utils';
import { PhoneInputField } from '../form';

const VerifyPhone = () => {
  const { kyc } = useKyc();
  const { currentCountry } = useCountry();

  return (
    <PhoneInputField
      label={Strings.info.PHONE_LABEL}
      number={formatPhoneNumber(kyc?.phone ?? '')}
      countryId={currentCountry?.id}
      disabled
    />
  );
};

export default VerifyPhone;
