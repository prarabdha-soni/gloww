import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar, Plus, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { trackSymptom, getRecentSymptoms, updateGlowwScore, getHealthInsights } from '@/services/database-rn';

interface SymptomTrackerProps {
  userId: string;
  onScoreUpdate?: (newScore: number) => void;
}

export default function SymptomTracker({ userId, onScoreUpdate }: SymptomTrackerProps) {
  const [recentSymptoms, setRecentSymptoms] = useState<any[]>([]);
  const [healthInsights, setHealthInsights] = useState<any[]>([]);
  const [showAddSymptom, setShowAddSymptom] = useState(false);

  useEffect(() => {
    loadRecentSymptoms();
    loadHealthInsights();
  }, [userId]);

  const loadRecentSymptoms = async () => {
    try {
      const symptoms = await getRecentSymptoms(userId, 30);
      setRecentSymptoms(symptoms);
    } catch (error) {
      console.error('Error loading recent symptoms:', error);
    }
  };

  const loadHealthInsights = async () => {
    try {
      const insights = await getHealthInsights(userId);
      setHealthInsights(insights);
    } catch (error) {
      console.error('Error loading health insights:', error);
    }
  };

  const handleAddSymptom = async (symptomType: string, severity: number) => {
    try {
      await trackSymptom(userId, {
        type: symptomType,
        severity,
        date: new Date().toISOString(),
        notes: `Added via symptom tracker`
      });

      // Reload data
      await loadRecentSymptoms();
      await loadHealthInsights();

      // Update score and notify parent
      const newScore = await updateGlowwScore(userId);
      if (onScoreUpdate) {
        onScoreUpdate(newScore);
      }

      Alert.alert(
        'Symptom Tracked',
        `Your Gloww Score has been updated based on your ${symptomType} symptom.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error adding symptom:', error);
      Alert.alert('Error', 'Failed to track symptom. Please try again.');
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return colors.semantic.error;
    if (severity >= 3) return colors.semantic.warning;
    if (severity >= 2) return colors.nude.roseGold;
    return colors.semantic.balanced;
  };

  const getSeverityText = (severity: number) => {
    if (severity >= 4) return 'Severe';
    if (severity >= 3) return 'Moderate';
    if (severity >= 2) return 'Mild';
    return 'Low';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return <AlertTriangle size={20} color={colors.semantic.error} />;
      case 'positive':
        return <CheckCircle size={20} color={colors.semantic.balanced} />;
      case 'recommendation':
        return <TrendingUp size={20} color={colors.nude.roseGold} />;
      default:
        return <AlertTriangle size={20} color={colors.nude.text} />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
      case 'alert':
        return colors.semantic.error + '20';
      case 'positive':
        return colors.semantic.balanced + '20';
      case 'recommendation':
        return colors.nude.roseGold + '20';
      default:
        return colors.nude.peach;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Symptom Tracker</Text>
        <Text style={styles.subtitle}>Track your symptoms to get personalized insights</Text>
      </View>

      {/* Quick Add Symptoms */}
      <View style={styles.quickAddSection}>
        <Text style={styles.sectionTitle}>Quick Add Symptoms</Text>
        <View style={styles.quickAddGrid}>
          {[
            { type: 'Irregular periods', severity: 3 },
            { type: 'Painful cramps', severity: 3 },
            { type: 'Heavy bleeding', severity: 4 },
            { type: 'Mood swings', severity: 2 },
            { type: 'Fatigue', severity: 2 },
            { type: 'Weight gain', severity: 3 }
          ].map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickAddButton}
              onPress={() => handleAddSymptom(symptom.type, symptom.severity)}
            >
              <Text style={styles.quickAddText}>{symptom.type}</Text>
              <Text style={[styles.severityText, { color: getSeverityColor(symptom.severity) }]}>
                {getSeverityText(symptom.severity)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Symptoms */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Symptoms (Last 30 Days)</Text>
        {recentSymptoms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No symptoms tracked yet</Text>
            <Text style={styles.emptySubtext}>Add symptoms to get personalized insights</Text>
          </View>
        ) : (
          recentSymptoms.slice(0, 5).map((symptom, index) => (
            <View key={index} style={styles.symptomCard}>
              <View style={styles.symptomInfo}>
                <Text style={styles.symptomType}>{symptom.type}</Text>
                <Text style={styles.symptomDate}>
                  {new Date(symptom.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.severityBadge}>
                <Text style={[styles.severityText, { color: getSeverityColor(symptom.severity) }]}>
                  {getSeverityText(symptom.severity)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Health Insights */}
      {healthInsights.length > 0 && (
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Health Insights</Text>
          {healthInsights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { backgroundColor: getInsightColor(insight.type) }]}>
              <View style={styles.insightHeader}>
                {getInsightIcon(insight.type)}
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <Text style={styles.insightMessage}>{insight.message}</Text>
              <Text style={styles.insightPriority}>
                Priority: {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Add Custom Symptom */}
      <TouchableOpacity
        style={styles.addCustomButton}
        onPress={() => setShowAddSymptom(!showAddSymptom)}
      >
        <Plus size={20} color={colors.nude.background} />
        <Text style={styles.addCustomText}>Add Custom Symptom</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  quickAddSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  quickAddButton: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: '45%',
    borderWidth: 1,
    borderColor: colors.nude.border,
  },
  quickAddText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  severityText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
  },
  recentSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  emptyState: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
  symptomCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  symptomInfo: {
    flex: 1,
  },
  symptomType: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  symptomDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  severityBadge: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  insightsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  insightCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  insightTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  insightMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  insightPriority: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  addCustomButton: {
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
  addCustomText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
});
