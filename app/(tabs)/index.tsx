import { Images } from '@/assets';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@/contexts/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  
  const handleTryPremium = () => {
    router.push('/premium');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleStartGame = () => {
    console.log('Start Game pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.premiumButton, { backgroundColor: colors.premiumBackground, borderColor: colors.premium }]} onPress={handleTryPremium}>
          <Image
            source={Images.crown}
            style={[styles.crownIcon, { tintColor: colors.premium }]}
            resizeMode="contain"
          />
          <Text style={[styles.premiumText, { color: colors.premium }]}>Try Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
          <View style={styles.notificationIcon}>
            <Image
              source={Images.Bell}
              style={[styles.bellIcon, { tintColor: colors.textSecondary }]}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, { color: colors.textSecondary }]}>As-salamu alaykum,</Text>
          <Text style={[styles.nameText, { color: colors.primary }]}>Ahmad!</Text>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          <View style={styles.imageContainer}>
            <Image
              source={Images.gameHistory}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>No Game History Yet</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>
              Start your first conversation game and build memorable connections.
            </Text>
          </View>
        </View>

        {/* Start Game Button */}
        <TouchableOpacity style={[styles.startGameButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]} onPress={handleStartGame}>
          <View style={styles.buttonIconContainer}>
            <Image
              source={Images.playNow}
              style={styles.playIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.startGameText}>Let's Start Your First Game</Text>
        </TouchableOpacity>

        {/* Bottom Text */}
        <Text style={[styles.bottomText, { color: colors.textMuted }]}>
          Discover deep topics and fun chats in every round!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: Platform.OS === 'ios' ? verticalScale(5) : verticalScale(45),
    paddingBottom: verticalScale(16),
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(11),
    borderWidth: 1,
  },
  crownIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(6),
  },
  bellIcon: {
    width: scale(20),
    height: scale(20),
  },
  premiumText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    fontFamily: 'PlusJakartaSansSemiBold',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -scale(2),
    right: -scale(2),
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  greetingContainer: {
    marginBottom: verticalScale(10),
  },
  greetingText: {
    fontSize: moderateScale(23),
    fontWeight: '500',
    marginBottom: verticalScale(1),
    fontFamily: 'PlusJakartaSansMedium',
  },
  nameText: {
    fontSize: moderateScale(23),
    fontFamily: 'PlusJakartaSansBold',
  },
  mainCard: {
    backgroundColor: 'transparent',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    marginBottom: verticalScale(5),
  },
  cardImage: {
    width: '100%',
    height: verticalScale(200),
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(20),
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: verticalScale(6),
    textAlign: 'center',
    fontFamily: 'PlusJakartaSansSemiBold',
  },
  cardSubtitle: {
    fontSize: moderateScale(11),
    textAlign: 'center',
    lineHeight: moderateScale(18),
    fontFamily: 'PlusJakartaSansSemiBold',
  },
  startGameButton: {
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonIconContainer: {
    marginRight: scale(6),
  },
  playIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#FFFFFF',
  },
  startGameText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: 'PlusJakartaSansSemiBold',
  },
  bottomText: {
    fontSize: moderateScale(11),
    textAlign: 'center',
    lineHeight: moderateScale(18),
    fontFamily: 'PlusJakartaSansSemiBold',
  },
});

export default HomeScreen;