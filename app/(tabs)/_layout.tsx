import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { Images } from '@/assets';

// Custom Tab Bar Icons
const HomeIcon = ({ focused }: { focused: boolean }) => (
  <Image
    source={Images.home}
    style={{
      width: scale(24),
      height: scale(24),
      position: 'absolute',
      bottom: verticalScale(12),
      tintColor: focused ? '#6e5fdb' : '#9CA3AF',
    }}
    resizeMode="contain"
  />
);

const PlayNowIcon = ({ focused }: { focused: boolean }) => (
  <View style={{
    width: scale(60),
    height: scale(60),
    borderRadius: scale(38),
    backgroundColor: focused ? '#6e5fdb' : '#6e5fdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(28),
    position: 'absolute',
    bottom: verticalScale(-10),
    borderWidth: 5,
    borderColor: '#ccc2fb',
    shadowColor: '#6e5fdb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }}>
    <Image
      source={Images.playNow}
      style={{
        width: scale(24),
        height: scale(24),
        tintColor: '#FFFFFF',
      }}
      resizeMode="contain"
    />
  </View>
);

const ProfileIcon = ({ focused }: { focused: boolean }) => (
  <Image
    source={Images.user}
    style={{
      width: scale(24),
      height: scale(24),
      position: 'absolute',
      bottom: verticalScale(12),
      tintColor: focused ? '#6e5fdb' : '#9CA3AF',
    }}
    resizeMode="contain"
  />
);

const BellIcon = ({ focused }: { focused: boolean }) => (
  <Image
    source={Images.Bell}
    style={{
      width: scale(24),
      height: scale(24),
      tintColor: focused ? '#6e5fdb' : '#9CA3AF',
    }}
    resizeMode="contain"
  />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6e5fdb',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? verticalScale(88) : verticalScale(68),
          paddingBottom: Platform.OS === 'ios' ? verticalScale(24) : verticalScale(8),
          paddingTop: verticalScale(8),
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 26,
          },
          shadowOpacity: 3,
          shadowRadius: 20,
          elevation: 20,
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontWeight: '500',
          marginTop: verticalScale(2),
          fontFamily: 'PlusJakartaSansMedium',
        },
        tabBarItemStyle: {
          paddingVertical: verticalScale(4),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: moderateScale(11),
            fontWeight: '500',
            color: '#6e5fdb',
            marginTop: verticalScale(-8),
            fontFamily: 'PlusJakartaSansMedium',
          },
        }}
      />
      <Tabs.Screen
        name="playnow"
        options={{
          title: 'Play Now',
          tabBarIcon: ({ focused }) => <PlayNowIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: moderateScale(11),
            fontWeight: '500',
            color: '#6e5fdb',
            marginTop: verticalScale(-8),
            fontFamily: 'PlusJakartaSansMedium',
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => <BellIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: moderateScale(11),
            fontWeight: '500',
            color: '#6e5fdb',
            marginTop: verticalScale(-8),
            fontFamily: 'PlusJakartaSansMedium',
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: moderateScale(11),
            fontWeight: '500',
            color: '#6e5fdb',
            marginTop: verticalScale(-8),
            fontFamily: 'PlusJakartaSansMedium',
          },
        }}
      />
    </Tabs>
  );
}