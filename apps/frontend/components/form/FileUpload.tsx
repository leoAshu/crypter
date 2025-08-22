import { icons } from '@/assets';
import { ComponentStrings } from '@/constants';
import { Image, Text, useColorScheme, View } from 'react-native';

const FileUpload = (props: FileUploadProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='gap-y-2'>
      {props.label && <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>}

      <View className='items-center gap-y-3 rounded-xl border border-stroke px-6 py-4 dark:border-stroke-dark'>
        <View className='rounded-full bg-card-dark/85 p-4 dark:bg-card/85'>
          <Image source={icons.upload} className='size-6' tintColor={isDark ? '#21212E' : '#F1F1F1'} />
        </View>

        <View className='items-center gap-y-2'>
          <Text className='font-satoshi text-primary'>{ComponentStrings.FileUpload.UPLOAD_DOC_LABEL}</Text>
          <Text className='font-satoshi text-sm text-label dark:text-label-dark'>
            {ComponentStrings.FileUpload.UPLOAD_DOC_HINT}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FileUpload;
