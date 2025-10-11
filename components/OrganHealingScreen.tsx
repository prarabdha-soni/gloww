import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Heart, Flower, Leaf, Waves, Sparkles, ArrowLeft, TrendingUp, CheckCircle } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OrganHealingScreenProps {
  organName: string;
  organStatus: string;
  organProgress: number;
  organColor: string;
  onBack: () => void;
}

const organData = {
  uterus: {
    name: 'Uterus',
    emoji: '🌹',
    description: 'The powerhouse of your reproductive system',
    healingTips: [
      'Gentle yoga poses like child\'s pose and cat-cow',
      'Warm herbal teas like chamomile and ginger',
      'Regular pelvic floor exercises',
      'Adequate rest and stress management'
    ],
    healingAffirmations: [
      'My uterus is healing and becoming stronger',
      'I honor my body\'s natural healing process',
      'My reproductive system is balanced and healthy',
      'I trust my body\'s wisdom and healing power'
    ]
  },
  ovaries: {
    name: 'Ovaries',
    emoji: '🌸',
    description: 'Your hormone production center',
    healingTips: [
      'Omega-3 rich foods like salmon and flaxseeds',
      'Regular exercise to support hormone balance',
      'Adequate sleep for hormone regulation',
      'Stress reduction techniques like meditation'
    ],
    healingAffirmations: [
      'My ovaries are balanced and functioning optimally',
      'My hormones are in perfect harmony',
      'I am fertile and full of life energy',
      'My reproductive cycle flows naturally'
    ]
  },
  thyroid: {
    name: 'Thyroid',
    emoji: '🌿',
    description: 'Your metabolic control center',
    healingTips: [
      'Iodine-rich foods like seaweed and fish',
      'Selenium supplements for thyroid support',
      'Regular exercise to boost metabolism',
      'Stress management and adequate sleep'
    ],
    healingAffirmations: [
      'My thyroid is functioning at its best',
      'My metabolism is balanced and efficient',
      'I have abundant energy and vitality',
      'My body\'s systems work in perfect harmony'
    ]
  },
  stress: {
    name: 'Stress',
    emoji: '🌊',
    description: 'Your emotional and mental wellbeing',
    healingTips: [
      'Daily meditation or mindfulness practice',
      'Deep breathing exercises',
      'Regular physical activity',
      'Connecting with nature and loved ones'
    ],
    healingAffirmations: [
      'I am calm, centered, and at peace',
      'I release stress and embrace tranquility',
      'My mind and body are in perfect balance',
      'I am resilient and handle challenges with grace'
    ]
  }
};

export default function OrganHealingScreen({ 
  organName, 
  organStatus, 
  organProgress, 
  organColor, 
  onBack 
}: OrganHealingScreenProps) {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));
  const [currentTip, setCurrentTip] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  const organInfo = organData[organName.toLowerCase() as keyof typeof organData];

  useEffect(() => {
    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, [pulseAnim, glowAnim]);

  const getStatusMessage = (status: string, progress: number) => {
    if (status === 'balanced' && progress >= 80) {
      return "Your organ is thriving beautifully! ✨";
    } else if (status === 'healing' || (status === 'balanced' && progress >= 60)) {
      return "Your organ is healing and getting stronger 💪";
    } else {
      return "Your organ is gently healing and restoring 🌱";
    }
  };

  const getStatusColor = (status: string, progress: number) => {
    if (status === 'balanced' && progress >= 80) return colors.semantic.balanced;
    if (status === 'healing' || (status === 'balanced' && progress >= 60)) return colors.semantic.healing;
    return colors.semantic.warning;
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % organInfo.healingTips.length);
  };

  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % organInfo.healingAffirmations.length);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{organInfo.name} Healing</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.organVisualization}>
          <Animated.View 
            style={[
              styles.organGlow,
              { 
                backgroundColor: organColor + '20',
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            <Animated.View 
              style={[
                styles.organIcon,
                { 
                  backgroundColor: organColor + '40',
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1]
                  })
                }
              ]}
            >
              <Text style={styles.organEmoji}>{organInfo.emoji}</Text>
            </Animated.View>
          </Animated.View>
          
          <Text style={styles.organName}>{organInfo.name}</Text>
          <Text style={styles.organDescription}>{organInfo.description}</Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Healing Progress</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${organProgress}%`,
                    backgroundColor: organColor
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{organProgress}%</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <Text style={[styles.statusMessage, { color: getStatusColor(organStatus, organProgress) }]}>
              {getStatusMessage(organStatus, organProgress)}
            </Text>
          </View>
        </View>

        <View style={styles.healingTipsSection}>
          <Text style={styles.sectionTitle}>Healing Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>{organInfo.healingTips[currentTip]}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextTip}>
              <Text style={styles.nextButtonText}>Next Tip</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.affirmationsSection}>
          <Text style={styles.sectionTitle}>Healing Affirmations</Text>
          <View style={styles.affirmationCard}>
            <Sparkles size={20} color={colors.nude.roseGold} />
            <Text style={styles.affirmationText}>{organInfo.healingAffirmations[currentAffirmation]}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextAffirmation}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.healingActions}>
          <Text style={styles.sectionTitle}>Healing Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: organColor }]}>
              <Heart size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>Self-Care</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: organColor }]}>
              <TrendingUp size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>Track Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: organColor }]}>
              <CheckCircle size={20} color={colors.nude.background} />
              <Text style={styles.actionButtonText}>Set Reminder</Text>
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
  organVisualization: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  organGlow: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  organIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  organEmoji: {
    fontSize: 64,
  },
  organName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  organDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  statusContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  statusMessage: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  healingTipsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  tipCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  nextButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  nextButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.background,
  },
  affirmationsSection: {
    marginBottom: spacing.xl,
  },
  affirmationCard: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  affirmationText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    flex: 1,
    lineHeight: 22,
  },
  healingActions: {
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.background,
  },
});
