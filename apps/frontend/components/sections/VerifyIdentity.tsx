import { Strings } from '@/constants';
import { useFilter, useKyc } from '@/hooks';
import { Dropdown } from '../filters';
import { SecondaryInputField } from '../form';
import FileUpload from '../form/FileUpload';

const VerifyIdentity = () => {
  const { kyc, updateKyc } = useKyc();
  const { countryNameFilterItems, getFilterItemById } = useFilter();

  const country = getFilterItemById(countryNameFilterItems, kyc?.countryId ?? '');

  return (
    <>
      <SecondaryInputField
        label={Strings.info.NAME_LABEL}
        placeholder={Strings.info.NAME_HINT}
        value={kyc?.name}
        disabled
      />

      <FileUpload label={Strings.info.UPLOAD_ID_LABEL} />

      <Dropdown
        value={country}
        disabled={false}
        title={Strings.info.COUNTRY_LABEL}
        items={countryNameFilterItems}
        placeholder={Strings.info.COUNTRY_HINT}
        onSelect={(item) => updateKyc('countryId', item.id)}
      />

      <SecondaryInputField
        label={Strings.info.ADDRESS_LABEL}
        placeholder={Strings.info.ADDRESS_HINT}
        value={kyc?.address}
        onChangeText={(val) => updateKyc('address', val)}
      />

      <FileUpload label={Strings.info.UPLOAD_ADDRESS_LABEL} />
    </>
  );
};

export default VerifyIdentity;
