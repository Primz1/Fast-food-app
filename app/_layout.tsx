import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

import './globals.css';
import * as Sentry from '@sentry/react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://cec263a402aa0635efec107bc074eaea@o4509554323685376.ingest.us.sentry.io/4509679626813440',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});


export default Sentry.wrap(function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

useEffect(() => {
  if (error) throw error;
  if (fontsLoaded) {
    // Hide the splash screen after the fonts have loaded and the
    // UI is ready to be displayed
    (async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // Handle any errors that might occur during the splash screen hiding process
        console.warn('Error hiding splash screen:', e);
      }
    })();
  }
}, [fontsLoaded, error]);


    return <Stack screenOptions={{ headerShown: false }} />;

});
