import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import WelcomeOnboarding from '@/components/WelcomeOnboarding';
import { colors } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleOnboardingComplete = (userData: any) => {
    console.log('Onboarding completed with data:', userData);
    setIsOnboardingComplete(true);
    
    // Store user data (in a real app, this would be saved to storage/API)
    // For now, we'll just navigate to home
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <WelcomeOnboarding onComplete={handleOnboardingComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
  },
});
