import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Activity, AlertTriangle, Heart, Brain, Zap } from 'lucide-react-native';
import ReproductiveSymptomsTracker from '@/components/ReproductiveSymptomsTracker';
import PredictionEngine from '@/components/PredictionEngine';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Symptom {
  id: string;
  name: string;
  category: 'cycle' | 'hormone' | 'physical' | 'emotional' | 'energy';
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
}

export default function TrackScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showPrediction, setShowPrediction] = useState(false);

  const handleSymptomsChange = (symptoms: Symptom[]) => {
    setSelectedSymptoms(symptoms);
  };

  const handlePredict = () => {
    setShowPrediction(true);
  };

  const handleConnectExpert = () => {
    // Navigate to expert consultation
    console.log('Connect with expert');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reproductive Health Flow</Text>
        <View style={{ width: 24 }} />
      </View>

      {!showPrediction ? (
        <ReproductiveSymptomsTracker
          onSymptomsChange={handleSymptomsChange}
          onPredict={handlePredict}
        />
      ) : (
        <View style={styles.predictionContainer}>
          <View style={styles.predictionHeader}>
            <TouchableOpacity 
              style={styles.backToSymptomsButton}
              onPress={() => setShowPrediction(false)}
            >
              <ChevronLeft size={20} color={colors.nude.text} />
              <Text style={styles.backToSymptomsText}>Back to Symptoms</Text>
            </TouchableOpacity>
          </View>
          
          <PredictionEngine
            symptoms={selectedSymptoms}
            onConnectExpert={handleConnectExpert}
          />
        </View>
      )}

      {!showPrediction && (
        <View style={styles.quickInsights}>
          <Text style={styles.insightsTitle}>Quick Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Activity size={20} color={colors.reproductive.uterus} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Cycle Tracking</Text>
              <Text style={styles.insightText}>
                Track your menstrual cycle patterns to identify irregularities
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Brain size={20} color={colors.reproductive.thyroid} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Hormone Balance</Text>
              <Text style={styles.insightText}>
                Monitor symptoms that may indicate hormonal imbalances
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <AlertTriangle size={20} color={colors.reproductive.stress} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Early Detection</Text>
              <Text style={styles.insightText}>
                Identify potential conditions like PCOS through symptom patterns
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
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
  predictionContainer: {
    flex: 1,
  },
  predictionHeader: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backToSymptomsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  backToSymptomsText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.xs,
  },
  quickInsights: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  insightsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  insightCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  insightText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
});