import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import PredictiveAnalytics from '@/components/PredictiveAnalytics';

export default function AnalyticsScreen() {
  const router = useRouter();
  
  // Sample user data - in real app, this would come from state/API
  const userData = {
    cycleLength: 28,
    lastPeriod: '2024-01-15',
    symptoms: [
      { id: 'irregular_periods', name: 'Irregular Periods', category: 'hormone' },
      { id: 'fatigue', name: 'Fatigue', category: 'thyroid' },
      { id: 'weight_gain', name: 'Weight Gain', category: 'pcos' }
    ],
    lifestyle: {
      stressLevel: 6,
      exerciseFrequency: 3,
      sleepHours: 7
    },
    testResults: [
      { test: 'Estrogen', value: 45, unit: 'pg/mL', date: '2024-01-10' },
      { test: 'Progesterone', value: 2.1, unit: 'ng/mL', date: '2024-01-10' }
    ]
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
        <Text style={styles.headerTitle}>Predictive Analytics</Text>
        <View style={{ width: 24 }} />
      </View>

      <PredictiveAnalytics userData={userData} />
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
