import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeOnboarding from '@/components/WelcomeOnboarding';
import OnboardingComplete from '@/components/OnboardingComplete';
import { colors } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = async (userData: any) => {
    console.log('Onboarding completed with data:', userData);
    setUserData(userData);
    setIsOnboardingComplete(true);
    
    try {
      // Store user data in AsyncStorage for local access
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isOnboardingComplete', 'true');
      await AsyncStorage.setItem('userId', userData.userId);
    } catch (error) {
      console.error('Error saving user data locally:', error);
    }
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  if (isOnboardingComplete && userData) {
    return (
      <View style={styles.container}>
        <OnboardingComplete 
          userName={userData.name || 'Beautiful'}
          glowwScore={userData.glowwScore || 0}
          onContinue={handleContinue}
        />
      </View>
    );
  }

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
