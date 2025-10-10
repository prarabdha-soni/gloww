import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import HealthcareProviderNetwork from '@/components/HealthcareProviderNetwork';

export default function DoctorsScreen() {
  const router = useRouter();
  
  const handleBookConsultation = (provider: any) => {
    console.log('Book consultation with:', provider.name);
    // Handle booking consultation
  };

  const handleViewProfile = (provider: any) => {
    console.log('View profile:', provider.name);
    // Handle viewing provider profile
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Healthcare Providers</Text>
        <View style={{ width: 24 }} />
      </View>

      <HealthcareProviderNetwork 
        onBookConsultation={handleBookConsultation}
        onViewProfile={handleViewProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.nude.background,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
});
