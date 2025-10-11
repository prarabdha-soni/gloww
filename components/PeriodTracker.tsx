import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar, Plus, Droplet, Heart, Target, Bell, TrendingUp, Clock } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { 
  savePeriodData, 
  getUserPeriods, 
  getLastPeriod, 
  getCycleStatistics, 
  predictNextPeriod,
  getDailyPrediction 
} from '@/services/database-rn';

interface PeriodTrackerProps {
  userId: string;
  onPeriodAdded?: () => void;
}

export default function PeriodTracker({ userId, onPeriodAdded }: PeriodTrackerProps) {
  const [periods, setPeriods] = useState<any[]>([]);
  const [lastPeriod, setLastPeriod] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [dailyNotification, setDailyNotification] = useState<any>(null);
  const [showAddPeriod, setShowAddPeriod] = useState(false);

  useEffect(() => {
    loadPeriodData();
  }, [userId]);

  const loadPeriodData = async () => {
    try {
      const [periodsData, lastPeriodData, statisticsData, predictionData, dailyData] = await Promise.all([
        getUserPeriods(userId),
        getLastPeriod(userId),
        getCycleStatistics(userId),
        predictNextPeriod(userId).catch(() => null),
        getDailyPrediction(userId).catch(() => null)
      ]);

      setPeriods(periodsData);
      setLastPeriod(lastPeriodData);
      setStatistics(statisticsData);
      setPrediction(predictionData);
      setDailyNotification(dailyData);
    } catch (error) {
      console.error('Error loading period data:', error);
    }
  };

  const handleAddPeriod = async () => {
    // For demo purposes, we'll add a sample period
    // In a real app, this would open a form
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      await savePeriodData({
        userId,
        startDate,
        endDate,
        duration: 5,
        flow: 'normal',
        symptoms: ['Cramps', 'Fatigue'],
        painLevel: 3,
        mood: 'neutral',
        notes: 'Added via period tracker'
      });

      Alert.alert(
        'Period Added',
        'Your period has been tracked successfully!',
        [{ text: 'OK' }]
      );

      await loadPeriodData();
      if (onPeriodAdded) onPeriodAdded();
    } catch (error) {
      console.error('Error adding period:', error);
      Alert.alert('Error', 'Failed to add period. Please try again.');
    }
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return colors.semantic.balanced;
      case 'normal': return colors.nude.roseGold;
      case 'heavy': return colors.semantic.warning;
      case 'very_heavy': return colors.semantic.error;
      default: return colors.nude.text;
    }
  };

  const getFlowIcon = (flow: string) => {
    switch (flow) {
      case 'light': return '💧';
      case 'normal': return '🩸';
      case 'heavy': return '🩸🩸';
      case 'very_heavy': return '🩸🩸🩸';
      default: return '🩸';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      case 'anxious': return '😰';
      case 'irritable': return '😠';
      default: return '😐';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual': return colors.reproductive.uterus;
      case 'follicular': return colors.reproductive.ovaries;
      case 'ovulation': return colors.reproductive.flow;
      case 'luteal': return colors.reproductive.thyroid;
      default: return colors.nude.text;
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'menstrual': return '🩸';
      case 'follicular': return '🌸';
      case 'ovulation': return '🌟';
      case 'luteal': return '🌙';
      default: return '🌸';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Daily Notification */}
      {dailyNotification && (
        <View style={styles.notificationCard}>
          <View style={styles.notificationHeader}>
            <Bell size={20} color={colors.nude.roseGold} />
            <Text style={styles.notificationTitle}>Today's Update</Text>
          </View>
          <Text style={styles.notificationMessage}>{dailyNotification.message}</Text>
          {dailyNotification.cyclePhase && (
            <View style={styles.phaseInfo}>
              <Text style={styles.phaseText}>
                {getPhaseIcon(dailyNotification.cyclePhase.phase)} {dailyNotification.cyclePhase.phase.charAt(0).toUpperCase() + dailyNotification.cyclePhase.phase.slice(1)} Phase
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Prediction Card */}
      {prediction && (
        <View style={styles.predictionCard}>
          <Text style={styles.predictionTitle}>Next Period Prediction</Text>
          <View style={styles.predictionContent}>
            <View style={styles.predictionItem}>
              <Calendar size={20} color={colors.reproductive.uterus} />
              <Text style={styles.predictionText}>
                {prediction.daysUntilPeriod === 0 ? 'Today' : 
                 prediction.daysUntilPeriod === 1 ? 'Tomorrow' : 
                 `In ${prediction.daysUntilPeriod} days`}
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Target size={20} color={colors.reproductive.ovaries} />
              <Text style={styles.predictionText}>
                Ovulation: {prediction.daysUntilOvulation === 0 ? 'Today' : 
                           prediction.daysUntilOvulation === 1 ? 'Tomorrow' : 
                           `In ${prediction.daysUntilOvulation} days`}
              </Text>
            </View>
            <View style={styles.confidenceBar}>
              <Text style={styles.confidenceText}>Confidence: {prediction.confidence}%</Text>
              <View style={styles.confidenceBarBackground}>
                <View style={[styles.confidenceBarFill, { width: `${prediction.confidence}%` }]} />
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Cycle Statistics */}
      {statistics && (
        <View style={styles.statisticsCard}>
          <Text style={styles.statisticsTitle}>Cycle Statistics</Text>
          <View style={styles.statisticsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{statistics.averageCycleLength}</Text>
              <Text style={styles.statLabel}>Avg Cycle Length</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{statistics.averageDuration}</Text>
              <Text style={styles.statLabel}>Avg Duration</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: statistics.isRegular ? colors.semantic.balanced : colors.semantic.warning }]}>
                {statistics.isRegular ? 'Regular' : 'Irregular'}
              </Text>
              <Text style={styles.statLabel}>Cycle Type</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{statistics.totalPeriods}</Text>
              <Text style={styles.statLabel}>Total Periods</Text>
            </View>
          </View>
        </View>
      )}

      {/* Current Cycle Phase */}
      {prediction?.cyclePhase && (
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseTitle}>
              {getPhaseIcon(prediction.cyclePhase.phase)} Current Phase: {prediction.cyclePhase.phase.charAt(0).toUpperCase() + prediction.cyclePhase.phase.slice(1)}
            </Text>
          </View>
          <Text style={styles.phaseDescription}>{prediction.cyclePhase.description}</Text>
          
          <View style={styles.phaseDetails}>
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>Common Symptoms:</Text>
              <View style={styles.symptomsList}>
                {prediction.cyclePhase.symptoms.map((symptom: string, index: number) => (
                  <Text key={index} style={styles.symptomItem}>• {symptom}</Text>
                ))}
              </View>
            </View>
            
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>Recommendations:</Text>
              <View style={styles.recommendationsList}>
                {prediction.cyclePhase.recommendations.map((rec: string, index: number) => (
                  <Text key={index} style={styles.recommendationItem}>• {rec}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Recent Periods */}
      <View style={styles.periodsSection}>
        <Text style={styles.sectionTitle}>Recent Periods</Text>
        {periods.length === 0 ? (
          <View style={styles.emptyState}>
            <Droplet size={48} color={colors.nude.textSecondary} />
            <Text style={styles.emptyText}>No periods tracked yet</Text>
            <Text style={styles.emptySubtext}>Start tracking to get personalized predictions</Text>
          </View>
        ) : (
          periods.slice(0, 5).map((period, index) => (
            <View key={index} style={styles.periodCard}>
              <View style={styles.periodHeader}>
                <Text style={styles.periodDate}>
                  {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.periodDuration}>{period.duration} days</Text>
              </View>
              
              <View style={styles.periodDetails}>
                <View style={styles.periodDetail}>
                  <Text style={styles.detailLabel}>Flow:</Text>
                  <Text style={[styles.detailValue, { color: getFlowColor(period.flow) }]}>
                    {getFlowIcon(period.flow)} {period.flow.charAt(0).toUpperCase() + period.flow.slice(1)}
                  </Text>
                </View>
                
                <View style={styles.periodDetail}>
                  <Text style={styles.detailLabel}>Pain Level:</Text>
                  <Text style={styles.detailValue}>
                    {'🔥'.repeat(period.painLevel)}{'⚪'.repeat(5 - period.painLevel)}
                  </Text>
                </View>
                
                <View style={styles.periodDetail}>
                  <Text style={styles.detailLabel}>Mood:</Text>
                  <Text style={styles.detailValue}>
                    {getMoodIcon(period.mood)} {period.mood.charAt(0).toUpperCase() + period.mood.slice(1)}
                  </Text>
                </View>
              </View>
              
              {period.symptoms.length > 0 && (
                <View style={styles.symptomsContainer}>
                  <Text style={styles.symptomsLabel}>Symptoms:</Text>
                  <View style={styles.symptomsTags}>
                    {period.symptoms.map((symptom: string, idx: number) => (
                      <View key={idx} style={styles.symptomTag}>
                        <Text style={styles.symptomTagText}>{symptom}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </View>

      {/* Add Period Button */}
      <TouchableOpacity style={styles.addPeriodButton} onPress={handleAddPeriod}>
        <Plus size={20} color={colors.nude.background} />
        <Text style={styles.addPeriodText}>Add Period</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
  },
  notificationCard: {
    backgroundColor: colors.nude.roseGold + '20',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.nude.roseGold,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  notificationTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  phaseInfo: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  phaseText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  predictionCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.lg,
    marginTop: 0,
  },
  predictionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  predictionContent: {
    gap: spacing.sm,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  predictionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  confidenceBar: {
    marginTop: spacing.sm,
  },
  confidenceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  confidenceBarBackground: {
    height: 4,
    backgroundColor: colors.nude.border,
    borderRadius: 2,
  },
  confidenceBarFill: {
    height: '100%',
    backgroundColor: colors.nude.roseGold,
    borderRadius: 2,
  },
  statisticsCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.lg,
    marginTop: 0,
  },
  statisticsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
  phaseCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.lg,
    marginTop: 0,
  },
  phaseHeader: {
    marginBottom: spacing.sm,
  },
  phaseTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  phaseDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  phaseDetails: {
    gap: spacing.md,
  },
  phaseSection: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  phaseSectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  symptomsList: {
    gap: spacing.xs,
  },
  symptomItem: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  recommendationsList: {
    gap: spacing.xs,
  },
  recommendationItem: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  periodsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
  periodCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  periodDate: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  periodDuration: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  periodDetails: {
    gap: spacing.xs,
  },
  periodDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  detailValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  symptomsContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.nude.border,
  },
  symptomsLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  symptomsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  symptomTag: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  symptomTagText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.text,
  },
  addPeriodButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  addPeriodText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
});
