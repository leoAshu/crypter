import { icons } from '@/assets';
import { PrimaryButton, RequirementOption } from '@/components';
import { Strings } from '@/constants';
import { useRequirements } from '@/hooks';
import { RequirementStatus } from '@/models';
import { Image, Text, useColorScheme, View } from 'react-native';

const Requirements = () => {
  const isDark = useColorScheme() === 'dark';

  const { requirements, requirementsMet, setRequirements } = useRequirements();

  const onVerify = (reqId: string) => {
    setRequirements((prev) =>
      prev.map((req) => (req.id === reqId ? { ...req, status: RequirementStatus.Pending } : req)),
    );
    setTimeout(() => {
      setRequirements((prev) =>
        prev.map((req) => (req.id === reqId ? { ...req, status: RequirementStatus.Verified } : req)),
      );
    }, 2500);
  };

  return (
    <>
      <View className='content-wrapper mt-6'>
        <View className='gap-y-4'>
          {requirements.map((item) => (
            <RequirementOption
              key={item.id}
              label={item.label}
              status={item.status}
              onPress={() => onVerify(item.id)}
            />
          ))}
        </View>

        <View className='mt-6 gap-y-4 rounded-md border-[0.5px] border-dashed border-warning-100 bg-warning-100/10 px-3 py-4'>
          <View className='flex-row items-center gap-x-3'>
            <Image source={isDark ? icons.dark.danger : icons.light.danger} className='size-4' resizeMode='contain' />
            <Text className='font-clashDisplay text-sm text-title dark:text-title-dark'>
              {Strings.requirements.ATTENTION_LABEL}
            </Text>
          </View>

          <Text className='font-satoshi text-sm text-body dark:text-body-dark'>
            {Strings.requirements.ATTENTION_TEXT}
          </Text>
        </View>
      </View>

      <View className='absolute bottom-24 left-0 right-0 px-4'>
        <PrimaryButton title={Strings.requirements.CTA_LABEL} disabled={!requirementsMet} />
      </View>
    </>
  );
};

export default Requirements;
