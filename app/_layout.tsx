import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlusJakartaSansExtraLight: require('../assets/fonts/PlusJakartaSans-ExtraLight.otf'),
    PlusJakartaSansLight: require('../assets/fonts/PlusJakartaSans-Light.otf'),
    PlusJakartaSansRegular: require('../assets/fonts/PlusJakartaSans-Regular.otf'),
    PlusJakartaSansMedium: require('../assets/fonts/PlusJakartaSans-Medium.otf'),
    PlusJakartaSansSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.otf'),
    PlusJakartaSansBold: require('../assets/fonts/PlusJakartaSans-Bold.otf'),
    PlusJakartaSansExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.otf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="premium" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}