import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Activity, AlertTriangle, Heart, Brain, Zap, Calendar, Baby, Target } from 'lucide-react-native';
import ReproductiveSymptomsTracker from '@/components/ReproductiveSymptomsTracker';
import PredictionEngine from '@/components/PredictionEngine';
import PeriodCalendar from '@/components/PeriodCalendar';
import FertilityPredictor from '@/components/FertilityPredictor';
import PregnancyTracker from '@/components/PregnancyTracker';
import FertileWindowCalendar from '@/components/FertileWindowCalendar';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Symptom {
  id: string;
  name: string;
  category: 'cycle' | 'hormone' | 'physical' | 'emotional' | 'energy';
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
}

export default function TrackScreen() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [trackingMode, setTrackingMode] = useState<'symptoms' | 'calendar' | 'fertility' | 'pregnancy' | 'fertile-window'>('symptoms');

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

  const handleDatePress = (date: Date, day: any) => {
    console.log('Date pressed:', date, day);
  };

  const handleAddPeriod = (date: Date) => {
    console.log('Add period:', date);
  };

  const handleAddSymptom = (date: Date, symptom: string) => {
    console.log('Add symptom:', date, symptom);
  };

  const handleViewInsights = () => {
    console.log('View insights');
  };

  const handleLogData = (date: string, dataType: string, value: any) => {
    console.log('Log data:', date, dataType, value);
  };

  const handleViewMilestones = () => {
    console.log('View milestones');
  };

  const handleViewAppointments = () => {
    console.log('View appointments');
  };

  // Sample data for demonstration
  const cycleHistory = [
    {
      startDate: '2024-01-01',
      endDate: '2024-01-28',
      length: 28,
      ovulationDay: 14,
      lutealPhaseLength: 14,
      symptoms: [],
      basalBodyTemperature: [],
      cervicalMucus: [],
      periodFlow: [],
      lhTests: []
    }
  ];

  const currentCycleData = {
    startDate: '2024-01-29',
    endDate: '2024-02-25',
    length: 28,
    ovulationDay: 14,
    lutealPhaseLength: 14,
    symptoms: [],
    basalBodyTemperature: [],
    cervicalMucus: [],
    periodFlow: [],
    lhTests: []
  };

  const pregnancyData = {
    conceptionDate: '2024-01-15',
    dueDate: '2024-10-22',
    currentWeek: 12,
    currentDay: 3,
    trimester: 1 as const,
    weightGain: [],
    symptoms: [],
    appointments: [],
    milestones: [],
    babySize: [],
    photos: []
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reproductive Health Flow</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tracking Mode Selector */}
      <View style={styles.modeSelector}>
        <TouchableOpacity 
          style={[styles.modeButton, trackingMode === 'symptoms' && styles.activeModeButton]}
          onPress={() => setTrackingMode('symptoms')}
        >
          <Activity size={20} color={trackingMode === 'symptoms' ? colors.nude.background : colors.nude.text} />
          <Text style={[styles.modeButtonText, trackingMode === 'symptoms' && styles.activeModeButtonText]}>
            Symptoms
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, trackingMode === 'calendar' && styles.activeModeButton]}
          onPress={() => setTrackingMode('calendar')}
        >
          <Calendar size={20} color={trackingMode === 'calendar' ? colors.nude.background : colors.nude.text} />
          <Text style={[styles.modeButtonText, trackingMode === 'calendar' && styles.activeModeButtonText]}>
            Calendar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, trackingMode === 'fertility' && styles.activeModeButton]}
          onPress={() => setTrackingMode('fertility')}
        >
          <Target size={20} color={trackingMode === 'fertility' ? colors.nude.background : colors.nude.text} />
          <Text style={[styles.modeButtonText, trackingMode === 'fertility' && styles.activeModeButtonText]}>
            Fertility
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, trackingMode === 'fertile-window' && styles.activeModeButton]}
          onPress={() => setTrackingMode('fertile-window')}
        >
          <Target size={20} color={trackingMode === 'fertile-window' ? colors.nude.background : colors.nude.text} />
          <Text style={[styles.modeButtonText, trackingMode === 'fertile-window' && styles.activeModeButtonText]}>
            Fertile Window
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.modeButton, trackingMode === 'pregnancy' && styles.activeModeButton]}
          onPress={() => setTrackingMode('pregnancy')}
        >
          <Baby size={20} color={trackingMode === 'pregnancy' ? colors.nude.background : colors.nude.text} />
          <Text style={[styles.modeButtonText, trackingMode === 'pregnancy' && styles.activeModeButtonText]}>
            Pregnancy
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected mode */}
      {trackingMode === 'symptoms' && !showPrediction && (
        <ReproductiveSymptomsTracker
          onSymptomsChange={handleSymptomsChange}
          onPredict={handlePredict}
        />
      )}

      {trackingMode === 'symptoms' && showPrediction && (
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

      {trackingMode === 'calendar' && (
        <PeriodCalendar
          onDatePress={handleDatePress}
          onAddPeriod={handleAddPeriod}
          onAddSymptom={handleAddSymptom}
          onViewInsights={handleViewInsights}
        />
      )}

      {trackingMode === 'fertility' && (
        <FertilityPredictor
          cycleHistory={cycleHistory}
          currentCycleData={currentCycleData}
          onLogData={handleLogData}
          onViewInsights={handleViewInsights}
        />
      )}

      {trackingMode === 'fertile-window' && (
        <FertileWindowCalendar
          cycleHistory={cycleHistory}
          currentCycleData={currentCycleData}
          onLogData={handleLogData}
          onViewInsights={handleViewInsights}
        />
      )}

      {trackingMode === 'pregnancy' && (
        <PregnancyTracker
          pregnancyData={pregnancyData}
          onLogData={handleLogData}
          onViewMilestones={handleViewMilestones}
          onViewAppointments={handleViewAppointments}
        />
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
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.xs,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  activeModeButton: {
    backgroundColor: colors.nude.text,
  },
  modeButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  activeModeButtonText: {
    color: colors.nude.background,
  },
});