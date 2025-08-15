import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
// Import your images from assets
import { Images } from '../assets';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingData {
    id: number;
    title: string;
    subtitle: string;
    image: any; // Replace with your actual image imports
    isLastSlide: boolean;
}

const onboardingData: OnboardingData[] = [
    {
        id: 1,
        title: 'Turn Questions Into\nBarakah',
        subtitle: 'Faith-rooted prompts spark honest, loving\nconversations—just seconds a day.',
        image: Images.introFirst,
        isLastSlide: false,
    },
    {
        id: 2,
        title: 'Tap Play, flip a card,\nconnect.',
        subtitle: 'Hit the Play button on your home screen—we shuffle\nyour chosen decks. Flip the card and explore the\nanswer together.',
        image: Images.introSecond,
        isLastSlide: false,
    },
    {
        id: 3,
        title: 'Play online by inviting\nyour potential spouse\nin one tap.',
        subtitle: 'Send a link or share a code so your reflections stay\nsynced and you both grow together.',
        image: Images.introThree,
        isLastSlide: true,
    },
];

const OnboardingScreens: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const dotAnimations = useRef(onboardingData.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Initialize first dot as active
        animateDots(0);
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideWidth = screenWidth;
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
        setCurrentIndex(newIndex);
        animateDots(newIndex);
    };

    const animateDots = (activeIndex: number) => {
        dotAnimations.forEach((animation, index) => {
            Animated.timing(animation, {
                toValue: index === activeIndex ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
    };

    const handleContinue = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            scrollViewRef.current?.scrollTo({
                x: nextIndex * screenWidth,
                animated: true,
            });
            setCurrentIndex(nextIndex);
            animateDots(nextIndex);
        }
    };

    const handleGetStarted = () => {
        router.replace('/(tabs)');
    };


    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {onboardingData.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: dotAnimations[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['#E5E7EB', '#6e5fdb'],
                                }),
                                width: dotAnimations[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [scale(8), scale(24)],
                                }),
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderSlide = (item: OnboardingData) => {
        return (
            <View key={item.id} style={styles.slideContainer}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} resizeMode="cover" />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* Slides */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                style={styles.scrollView}
                decelerationRate="fast"
                snapToInterval={screenWidth}
                snapToAlignment="center"
            >
                {onboardingData.map(renderSlide)}
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                {renderDots()}

                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={onboardingData[currentIndex].isLastSlide ? handleGetStarted : handleContinue}
                >
                    <Text style={styles.continueText}>
                        {onboardingData[currentIndex].isLastSlide ? 'Get Started' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    scrollView: {
        flex: 1,
    },
    slideContainer: {
        width: screenWidth,
        flex: 1,
    },
    imageContainer: {
        width: screenWidth,
        height: verticalScale(380),
        position: 'absolute',
        top: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        paddingBottom: verticalScale(120),
        paddingHorizontal: scale(30),
        marginTop: verticalScale(400),
    },
    title: {
        fontSize: moderateScale(28),
        // 
        color: '#111827',
        textAlign: 'center',
        lineHeight: moderateScale(34),
        marginBottom: verticalScale(16),
        fontFamily: 'PlusJakartaSansBold',
    },
    subtitle: {
        fontSize: moderateScale(12),
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: moderateScale(20),
        fontWeight: '400',
        fontFamily: 'PlusJakartaSansRegular',
    },
    bottomSection: {
        position: 'absolute',
        bottom: verticalScale(34),
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: scale(30),
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(32),
        gap: scale(8),
    },
    dot: {
        height: scale(8),
        borderRadius: scale(4),
    },
    continueButton: {
        backgroundColor: '#6e5fdb',
        borderRadius: moderateScale(12),
        paddingVertical: verticalScale(14),
        paddingHorizontal: scale(24),
        width: '100%',
        alignItems: 'center',
    },
    continueText: {
        color: '#FFFFFF',
        fontSize: moderateScale(15),
        fontWeight: '600',
        letterSpacing: 0.5,
        fontFamily: 'PlusJakartaSansSemiBold',
    },
    homeIndicator: {
        position: 'absolute',
        bottom: verticalScale(8),
        left: screenWidth / 2 - scale(67),
        width: scale(134),
        height: verticalScale(5),
        backgroundColor: '#000000',
        borderRadius: verticalScale(2.5),
    },
});

export default OnboardingScreens;