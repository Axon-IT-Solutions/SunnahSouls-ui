import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@/contexts/ThemeContext';

interface PlanFeature {
  text: string;
}

interface SubscriptionPlan {
  id: string;
  badge?: string;
  badgeColor: string;
  title: string;
  price: string;
  priceSubtext: string;
  features: PlanFeature[];
  buttonText: string;
  buttonColor: string;
}

const PremiumScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  
  const handleBack = () => {
    router.back();
  };

  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
  };

  const handleSkip = () => {
    router.back();
  };

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'lifetime',
      badge: 'Most Popular',
      badgeColor: '#C4B5FD',
      title: 'Decks Forever',
      price: '$7.99',
      priceSubtext: 'one-off',
      features: [
        { text: 'Lifetime access to all current decks' },
        { text: 'One-time purchase, no subscription' },
        { text: 'Perfect for casual users or one-time use' },
        { text: 'Simple: pay once, own forever' },
      ],
      buttonText: 'Unlock Decks',
      buttonColor: colors.primary,
    },
    {
      id: 'monthly',
      badge: '7-day free trial',
      badgeColor: '#cbe0dd',
      title: 'Sunnah Souls Pro',
      price: '$12.99',
      priceSubtext: '/mo',
      features: [
        { text: 'Access to all current & future decks' },
        { text: 'Try before you pay: 7-day free trial' },
        { text: 'Cancel anytime' },
      ],
      buttonText: 'Start Free Trial',
      buttonColor: colors.primary,
    },
    {
      id: 'annually',
      badge: 'Best Value',
      badgeColor: '#f3bfd5',
      title: 'Sunnah Souls Pro',
      price: '$7.99',
      priceSubtext: '/mo, billed $95.88',
      features: [
        { text: 'Save over $60/year' },
        { text: 'Locked-in price for 12 months' },
        { text: 'No monthly billing hassle' },
      ],
      buttonText: 'Start Free Trial',
      buttonColor: colors.primary,
    },
  ];

  const renderFeature = (feature: PlanFeature, index: number) => (
    <View key={index} style={styles.featureContainer}>
      <Image
        source={require('../assets/images/CheckCircle.png')}
        style={styles.checkIcon}
        resizeMode="contain"
      />
      <Text style={[styles.featureText, { color: colors.textSecondary }]}>{feature.text}</Text>
    </View>
  );

  const renderPlan = (plan: SubscriptionPlan) => (
    <View key={plan.id} style={[styles.planCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Badge */}
      <View style={styles.badgeContainer}>
        <Text style={[styles.planType, { color: colors.textTertiary }]}>{plan.id === 'lifetime' ? 'Lifetime Deck Unlock' : plan.id === 'monthly' ? 'Monthly' : 'Annually'}</Text>
        {plan.badge && (
          <View style={[styles.badge, { backgroundColor: plan.badgeColor }]}>
            <Text style={[styles.badgeText, {
              color: plan.id === 'lifetime' ? '#705fdb' :
                plan.id === 'monthly' ? '#34a754' :
                  plan.id === 'annually' ? '#fb042b' : '#374151'
            }]}>{plan.badge}</Text>
          </View>
        )}
      </View>

      {/* Title and Price */}
      <View style={styles.titlePriceContainer}>
        <Text style={[styles.planTitle, { color: colors.text }]}>{plan.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>{plan.price}</Text>
          <Text style={[styles.priceSubtext, { color: colors.textTertiary }]}>{plan.priceSubtext}</Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {plan.features.map(renderFeature)}
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: plan.buttonColor }]}
        onPress={() => handlePlanSelect(plan.id)}
      >
        <Text style={styles.actionButtonText}>{plan.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.backgroundSecondary }]} onPress={handleBack}>
          <Text style={[styles.backIcon, { color: colors.textSecondary }]}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Plans */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Level up your</Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>conversations.</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textTertiary }]}>Choose the access that fits your journey.</Text>
        </View>

        {subscriptionPlans.map(renderPlan)}

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.primary }]}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(45),
    position: 'absolute',
    top: -15,
    left: 5
  },
  backButton: {
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(16),
  },
  backIcon: {
    fontSize: moderateScale(22),
    fontWeight: '300',
    paddingBottom: 6
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: scale(25),
    paddingBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(25),
    textAlign: 'center',
    lineHeight: moderateScale(32),
    fontFamily: 'PlusJakartaSansBold',
  },
  headerSubtitle: {
    fontSize: moderateScale(13),
    textAlign: 'center',
    marginTop: verticalScale(10),
    lineHeight: moderateScale(18),
    fontFamily: 'PlusJakartaSansBold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  planCard: {
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: verticalScale(8),
  },
  planType: {
    fontSize: moderateScale(12),
    fontFamily: 'PlusJakartaSansBold',
  },
  badge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(15),
  },
  badgeText: {
    fontSize: moderateScale(10),
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'PlusJakartaSansMedium',
  },
  titlePriceContainer: {
    marginBottom: verticalScale(12),
  },
  planTitle: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(4),
    fontFamily: 'PlusJakartaSansBold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: moderateScale(22),
    marginRight: scale(4),
    fontFamily: 'PlusJakartaSansExtraBold',
  },
  priceSubtext: {
    fontSize: moderateScale(13),
    fontWeight: '400',
    fontFamily: 'PlusJakartaSansRegular',
  },
  featuresContainer: {
    marginBottom: verticalScale(5),
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(8),
  },
  checkIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(7),
    marginTop: verticalScale(1),
  },
  featureText: {
    flex: 1,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: '400',
    fontFamily: 'PlusJakartaSansRegular',
  },
  actionButton: {
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    shadowColor: '#6e5fdb',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),

    fontFamily: 'PlusJakartaSansBold',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    marginTop: verticalScale(0),
  },
  skipText: {
    fontSize: moderateScale(16),
    fontFamily: 'PlusJakartaSansBold',
    textDecorationLine: 'underline'
  },
});

export default PremiumScreen;