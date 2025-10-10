import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import PremiumServices from '@/components/PremiumServices';

export default function PremiumScreen() {
  const router = useRouter();
  
  const handleBookService = (service: any) => {
    console.log('Book service:', service.name);
    // Handle booking service
  };

  const handleSubscribe = (plan: any) => {
    console.log('Subscribe to plan:', plan.name);
    // Handle subscription
  };

  const handleViewDetails = (service: any) => {
    console.log('View service details:', service.name);
    // Handle viewing service details
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
        <Text style={styles.headerTitle}>Premium Services</Text>
        <View style={{ width: 24 }} />
      </View>

      <PremiumServices 
        onBookService={handleBookService}
        onSubscribe={handleSubscribe}
        onViewDetails={handleViewDetails}
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
