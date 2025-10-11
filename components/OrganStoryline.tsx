import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Heart, Flower, Leaf, Waves, TrendingUp, Sparkles } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OrganStorylineProps {
  organHealth: {
    uterus: { status: string; progress: number };
    ovaries: { status: string; progress: number };
    thyroid: { status: string; progress: number };
    stress: { status: string; progress: number };
  };
  onOrganPress: (organ: string) => void;
}

const organData = {
  uterus: {
    name: 'Uterus',
    emoji: '🌹',
    color: colors.reproductive.uterus,
    healingStages: [
      { progress: 0, stage: 'Resting', message: 'Taking time to heal', color: colors.semantic.error },
      { progress: 25, stage: 'Awakening', message: 'Gently coming back to life', color: colors.semantic.warning },
      { progress: 50, stage: 'Strengthening', message: 'Building resilience', color: colors.semantic.healing },
      { progress: 75, stage: 'Thriving', message: 'Flourishing beautifully', color: colors.semantic.balanced },
      { progress: 90, stage: 'Radiant', message: 'Glowing with health', color: colors.nude.roseGold },
    ]
  },
  ovaries: {
    name: 'Ovaries',
    emoji: '🌸',
    color: colors.reproductive.ovaries,
    healingStages: [
      { progress: 0, stage: 'Dormant', message: 'Quietly resting', color: colors.semantic.error },
      { progress: 25, stage: 'Stirring', message: 'Beginning to awaken', color: colors.semantic.warning },
      { progress: 50, stage: 'Balancing', message: 'Finding harmony', color: colors.semantic.healing },
      { progress: 75, stage: 'Flourishing', message: 'Blooming with vitality', color: colors.semantic.balanced },
      { progress: 90, stage: 'Radiant', message: 'Shining with energy', color: colors.nude.roseGold },
    ]
  },
  thyroid: {
    name: 'Thyroid',
    emoji: '🌿',
    color: colors.reproductive.thyroid,
    healingStages: [
      { progress: 0, stage: 'Sluggish', message: 'Moving slowly', color: colors.semantic.error },
      { progress: 25, stage: 'Waking', message: 'Gaining momentum', color: colors.semantic.warning },
      { progress: 50, stage: 'Activating', message: 'Building energy', color: colors.semantic.healing },
      { progress: 75, stage: 'Vibrant', message: 'Full of life', color: colors.semantic.balanced },
      { progress: 90, stage: 'Dynamic', message: 'Powering your body', color: colors.nude.roseGold },
    ]
  },
  stress: {
    name: 'Stress',
    emoji: '🌊',
    color: colors.reproductive.stress,
    healingStages: [
      { progress: 0, stage: 'Overwhelming', message: 'Feeling heavy', color: colors.semantic.error },
      { progress: 25, stage: 'Settling', message: 'Finding calm', color: colors.semantic.warning },
      { progress: 50, stage: 'Balancing', message: 'Creating peace', color: colors.semantic.healing },
      { progress: 75, stage: 'Flowing', message: 'Moving smoothly', color: colors.semantic.balanced },
      { progress: 90, stage: 'Serene', message: 'Deeply peaceful', color: colors.nude.roseGold },
    ]
  }
};

export default function OrganStoryline({ organHealth, onOrganPress }: OrganStorylineProps) {
  const [animations] = useState({
    uterus: new Animated.Value(1),
    ovaries: new Animated.Value(1),
    thyroid: new Animated.Value(1),
    stress: new Animated.Value(1),
  });

  useEffect(() => {
    // Animate progress changes
    Object.keys(organHealth).forEach((organ) => {
      Animated.spring(animations[organ as keyof typeof animations], {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(animations[organ as keyof typeof animations], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    });
  }, [organHealth, animations]);

  const getHealingStage = (organ: string, progress: number) => {
    const organInfo = organData[organ as keyof typeof organData];
    const stages = organInfo.healingStages;
    
    for (let i = stages.length - 1; i >= 0; i--) {
      if (progress >= stages[i].progress) {
        return stages[i];
      }
    }
    return stages[0];
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return colors.nude.roseGold;
    if (progress >= 75) return colors.semantic.balanced;
    if (progress >= 50) return colors.semantic.healing;
    if (progress >= 25) return colors.semantic.warning;
    return colors.semantic.error;
  };

  const renderOrganCard = (organKey: string) => {
    const organ = organData[organKey as keyof typeof organData];
    const health = organHealth[organKey as keyof typeof organHealth];
    const stage = getHealingStage(organKey, health.progress);
    const progressColor = getProgressColor(health.progress);

    return (
      <Animated.View
        key={organKey}
        style={[
          styles.organCard,
          { transform: [{ scale: animations[organKey as keyof typeof animations] }] }
        ]}
      >
        <TouchableOpacity
          style={styles.organContent}
          onPress={() => onOrganPress(organKey)}
        >
          <View style={styles.organHeader}>
            <View style={[styles.organIcon, { backgroundColor: organ.color + '20' }]}>
              <Text style={styles.organEmoji}>{organ.emoji}</Text>
            </View>
            <View style={styles.organInfo}>
              <Text style={styles.organName}>{organ.name}</Text>
              <Text style={[styles.organStage, { color: stage.color }]}>
                {stage.stage}
              </Text>
            </View>
            <View style={styles.organProgress}>
              <Text style={styles.progressText}>{health.progress}%</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${health.progress}%`,
                    backgroundColor: progressColor,
                  }
                ]}
              />
            </View>
          </View>

          <View style={styles.healingMessage}>
            <Text style={styles.healingText}>{stage.message}</Text>
            {health.progress >= 75 && (
              <View style={styles.celebrationIcon}>
                <Sparkles size={16} color={colors.nude.roseGold} />
              </View>
            )}
          </View>

          <View style={styles.healingInsights}>
            <View style={styles.insightItem}>
              <TrendingUp size={14} color={colors.semantic.healing} />
              <Text style={styles.insightText}>
                {health.progress >= 75 ? 'Thriving' : 
                 health.progress >= 50 ? 'Improving' : 
                 health.progress >= 25 ? 'Healing' : 'Resting'}
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Heart size={14} color={colors.reproductive.uterus} />
              <Text style={styles.insightText}>
                {health.progress >= 90 ? 'Radiant health' :
                 health.progress >= 75 ? 'Strong & balanced' :
                 health.progress >= 50 ? 'Building strength' :
                 health.progress >= 25 ? 'Gentle progress' : 'Taking time to heal'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Healing Journey</Text>
        <Text style={styles.subtitle}>Watch your body transform week by week</Text>
      </View>

      <View style={styles.organsGrid}>
        {Object.keys(organData).map(renderOrganCard)}
      </View>

      <View style={styles.overallProgress}>
        <View style={styles.overallHeader}>
          <Text style={styles.overallTitle}>Overall Wellness</Text>
          <Text style={styles.overallScore}>
            {Math.round(Object.values(organHealth).reduce((sum, organ) => sum + organ.progress, 0) / 4)}%
          </Text>
        </View>
        <View style={styles.overallBar}>
          <View
            style={[
              styles.overallFill,
              {
                width: `${Math.round(Object.values(organHealth).reduce((sum, organ) => sum + organ.progress, 0) / 4)}%`,
                backgroundColor: getProgressColor(Math.round(Object.values(organHealth).reduce((sum, organ) => sum + organ.progress, 0) / 4)),
              }
            ]}
          />
        </View>
        <Text style={styles.overallMessage}>
          {Math.round(Object.values(organHealth).reduce((sum, organ) => sum + organ.progress, 0) / 4) >= 75 
            ? "You're thriving beautifully! ✨" 
            : Math.round(Object.values(organHealth).reduce((sum, organ) => sum + organ.progress, 0) / 4) >= 50
            ? "Your healing journey is progressing well 🌱"
            : "Your body is gently healing and restoring 💫"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
  },
  organsGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  organCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  organContent: {
    flex: 1,
  },
  organHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  organIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  organEmoji: {
    fontSize: 24,
  },
  organInfo: {
    flex: 1,
  },
  organName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  organStage: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
  },
  organProgress: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  healingMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  healingText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    flex: 1,
  },
  celebrationIcon: {
    marginLeft: spacing.sm,
  },
  healingInsights: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insightText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginLeft: spacing.xs,
  },
  overallProgress: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  overallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  overallTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  overallScore: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
  },
  overallBar: {
    height: 12,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  overallFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  overallMessage: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    textAlign: 'center',
    lineHeight: 22,
  },
});
