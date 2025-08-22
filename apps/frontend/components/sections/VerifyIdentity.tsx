import { Strings } from '@/constants';
import { useCountry, useProfile } from '@/hooks';
import { useState } from 'react';
import { Dropdown } from '../filters';
import { FormInputField } from '../form';
import FileUpload from '../form/FileUpload';

const VerifyIdentity = () => {
  const { profile } = useProfile();
  const { countryNameFilterItems } = useCountry();

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState<FilterItem | undefined>();

  return (
    <>
      <FormInputField
        label={Strings.info.NAME_LABEL}
        placeholder={Strings.info.NAME_HINT}
        value={profile?.name}
        disabled
      />

      <FileUpload label={Strings.info.UPLOAD_ID_LABEL} />

      <Dropdown
        value={country}
        title={Strings.info.COUNTRY_LABEL}
        items={countryNameFilterItems}
        onSelect={(item) => setCountry(item)}
      />

      <FormInputField
        label={Strings.info.ADDRESS_LABEL}
        placeholder={Strings.info.ADDRESS_HINT}
        value={address}
        onChangeText={(val) => setAddress(val)}
      />

      <FileUpload label={Strings.info.UPLOAD_ADDRESS_LABEL} />
    </>
  );
};

export default VerifyIdentity;
