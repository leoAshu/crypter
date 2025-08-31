import { useFilter } from '@/hooks';
import { formatPhoneNumber } from '@/utils';
import { Text, View } from 'react-native';
import { Dropdown } from '../filters';
import SecondaryInputField from './SecondaryInputField';

const PhoneInputField = (props: PhoneInputFieldProps) => {
  const { countryPhoneCodeFilterItems, getFilterItemById } = useFilter();
  const countryFilter = getFilterItemById(countryPhoneCodeFilterItems, props.countryId ?? '');
  const disabled = props.disabled ?? false;

  return (
    <View className='gap-y-2'>
      {props.label && <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>}
      <View className='flex-row items-end gap-x-2'>
        <Dropdown
          value={countryFilter}
          items={countryPhoneCodeFilterItems}
          showIcon={false}
          containerStyle='w-28'
          disabled={disabled || countryPhoneCodeFilterItems.length === 1}
          onSelect={props.onSelect}
        />

        <View className='flex-1 justify-start'>
          <SecondaryInputField
            label=''
            value={formatPhoneNumber(props.number ?? '')}
            disabled={disabled}
            onChangeText={props.onChange}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneInputField;
