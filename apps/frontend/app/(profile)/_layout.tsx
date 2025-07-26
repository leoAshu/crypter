import { images } from '@/assets';
import { router, Stack } from 'expo-router';
import { Image, Pressable, useColorScheme, View } from 'react-native';

const ProfileLayout = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <Stack
      screenOptions={({ route }) => {
        let isIndex = route.name === 'index';
        return {
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: isDark ? '#FFFFFF' : '#23262F',
            fontFamily: 'poppins',
            fontSize: 18,
            fontWeight: '600',
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <View className='rounded-full p-2'>
                <Image
                  className='size-6'
                  source={images.arrowLeft}
                  tintColor={isDark ? '#FFFFFF' : '#23262F'}
                  resizeMode='contain'
                />
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <>
              {isIndex && (
                <Pressable onPress={() => router.push('/updateProfile')}>
                  <View className='rounded-full p-2'>
                    <Image
                      className='size-5'
                      source={images.edit}
                      tintColor={isDark ? '#FFFFFF' : '#23262F'}
                      resizeMode='contain'
                    />
                  </View>
                </Pressable>
              )}
            </>
          ),
        };
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name='updateProfile'
        options={{
          title: 'Edit',
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
