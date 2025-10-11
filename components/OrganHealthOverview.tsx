import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { ArrowLeft, Heart, Flower, Leaf, Waves, TrendingUp, Activity, Target } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OrganHealth {
  name: string;
  status: 'balanced' | 'healing' | 'rising' | 'warning';
  progress: number;
  color: string;
  emoji: string;
  description: string;
}

interface OrganHealthOverviewProps {
  organHealth: {
    uterus: { status: string; progress: number };
    ovaries: { status: string; progress: number };
    thyroid: { status: string; progress: number };
    stress: { status: string; progress: number };
  };
  onBack: () => void;
  onOrganPress: (organ: string) => void;
}

const organData: Record<string, OrganHealth> = {
  uterus: {
    name: 'Uterus',
    status: 'healing',
    progress: 30,
    color: colors.reproductive.uterus,
    emoji: '🌹',
    description: 'The powerhouse of your reproductive system'
  },
  ovaries: {
    name: 'Ovaries',
    status: 'balanced',
    progress: 75,
    color: colors.reproductive.ovaries,
    emoji: '🌸',
    description: 'Your hormone production center'
  },
  thyroid: {
    name: 'Thyroid',
    status: 'rising',
    progress: 60,
    color: colors.reproductive.thyroid,
    emoji: '🌿',
    description: 'Your metabolic control center'
  },
  stress: {
    name: 'Stress',
    status: 'rising',
    progress: 45,
    color: colors.reproductive.stress,
    emoji: '🌊',
    description: 'Your emotional and mental wellbeing'
  }
};

export default function OrganHealthOverview({ 
  organHealth, 
  onBack, 
  onOrganPress 
}: OrganHealthOverviewProps) {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    // Calculate overall health score
    const scores = Object.values(organHealth).map(organ => organ.progress);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    setOverallScore(Math.round(average));

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [pulseAnim]);

  const getStatusMessage = (score: number) => {
    if (score >= 80) return "Your reproductive system is thriving beautifully! ✨";
    if (score >= 60) return "You're doing great! Your organs are healing well 🌱";
    if (score >= 40) return "Your ovaries are asking for rest today 🌸 — take a short walk and hydrate more.";
    return "Start with gentle self-care practices. Your body is ready to heal 💫";
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return colors.semantic.balanced;
    if (score >= 60) return colors.semantic.healing;
    if (score >= 40) return colors.semantic.warning;
    return colors.semantic.warning;
  };

  const getOrganStatus = (status: string, progress: number) => {
    if (status === 'balanced' && progress >= 80) return 'Thriving';
    if (status === 'healing' || (status === 'balanced' && progress >= 60)) return 'Healing';
    if (status === 'rising' || progress >= 40) return 'Rising';
    return 'Needs Care';
  };

  const getOrganStatusColor = (status: string, progress: number) => {
    if (status === 'balanced' && progress >= 80) return colors.semantic.balanced;
    if (status === 'healing' || (status === 'balanced' && progress >= 60)) return colors.semantic.healing;
    if (status === 'rising' || progress >= 40) return colors.semantic.rising;
    return colors.semantic.warning;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organ Health</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Overall Health Score */}
        <View style={styles.overallScoreCard}>
          <Animated.View 
            style={[
              styles.scoreCircle,
              { 
                backgroundColor: getStatusColor(overallScore) + '20',
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            <Text style={styles.scoreNumber}>{overallScore}</Text>
            <Text style={styles.scoreLabel}>Overall Health</Text>
          </Animated.View>
          
          <View style={styles.scoreMessage}>
            <Text style={[styles.scoreMessageText, { color: getStatusColor(overallScore) }]}>
              {getStatusMessage(overallScore)}
            </Text>
          </View>
        </View>

        {/* Individual Organs */}
        <View style={styles.organsSection}>
          <Text style={styles.sectionTitle}>Your Reproductive Organs</Text>
          
          {Object.entries(organHealth).map(([key, organ], index) => {
            const organInfo = organData[key];
            const status = getOrganStatus(organ.status, organ.progress);
            const statusColor = getOrganStatusColor(organ.status, organ.progress);
            
            return (
              <TouchableOpacity
                key={key}
                style={styles.organCard}
                onPress={() => onOrganPress(organInfo.name)}
              >
                <View style={styles.organHeader}>
                  <View style={styles.organIconContainer}>
                    <Text style={styles.organEmoji}>{organInfo.emoji}</Text>
                  </View>
                  <View style={styles.organInfo}>
                    <Text style={styles.organName}>{organInfo.name}</Text>
                    <Text style={styles.organDescription}>{organInfo.description}</Text>
                  </View>
                  <View style={styles.organStatusContainer}>
                    <Text style={[styles.organStatus, { color: statusColor }]}>
                      {status}
                    </Text>
                    <Text style={styles.organProgress}>{organ.progress}%</Text>
                  </View>
                </View>
                
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${organ.progress}%`,
                        backgroundColor: organInfo.color
                      }
                    ]} 
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Activity size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>Track Symptoms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Target size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>Set Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <TrendingUp size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>View Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingTop: spacing.lg,
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl + 80,
  },
  overallScoreCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  scoreNumber: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  scoreLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  scoreMessage: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  scoreMessageText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  organsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  organCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  organHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  organIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.nude.peach,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  organDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  organStatusContainer: {
    alignItems: 'flex-end',
  },
  organStatus: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  organProgress: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  quickActionsSection: {
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.background,
  },
});
