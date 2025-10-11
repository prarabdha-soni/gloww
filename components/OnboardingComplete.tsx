import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Sparkles, ArrowRight, CheckCircle } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OnboardingCompleteProps {
  userName: string;
  glowwScore: number;
  onContinue: () => void;
}

export default function OnboardingComplete({ userName, glowwScore, onContinue }: OnboardingCompleteProps) {
  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! Your reproductive health is thriving 🌟";
    if (score >= 60) return "Good progress! Keep nurturing yourself 💕";
    if (score >= 40) return "Healing journey in progress 🌱";
    return "Let's start your wellness journey together 🌸";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return colors.semantic.balanced;
    if (score >= 60) return colors.nude.roseGold;
    if (score >= 40) return colors.semantic.warning;
    return colors.semantic.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={48} color={colors.semantic.balanced} />
        </View>
        
        <Text style={styles.title}>Welcome to Gloww, {userName}! 🎉</Text>
        <Text style={styles.subtitle}>
          Your personalized wellness journey is ready
        </Text>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Svg width={120} height={120}>
              <Circle
                cx="60"
                cy="60"
                r="50"
                stroke={colors.nude.border}
                strokeWidth="8"
                fill="none"
              />
              <Circle
                cx="60"
                cy="60"
                r="50"
                stroke={getScoreColor(glowwScore)}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50 * (glowwScore / 100)} ${2 * Math.PI * 50}`}
                strokeDashoffset={2 * Math.PI * 50 * 0.25}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <Text
                x="60"
                y="60"
                textAnchor="middle"
                fontSize="24"
                fontFamily={typography.fontFamily.semibold}
                fill={colors.nude.text}
              >
                {glowwScore}
              </Text>
            </Svg>
          </View>
          
          <Text style={styles.scoreLabel}>Your Gloww Score</Text>
          <Text style={styles.scoreMessage}>
            {getScoreMessage(glowwScore)}
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's next?</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Heart size={20} color={colors.reproductive.uterus} />
              <Text style={styles.featureText}>Track your cycle and symptoms</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={20} color={colors.reproductive.ovaries} />
              <Text style={styles.featureText}>Get personalized health insights</Text>
            </View>
            <View style={styles.featureItem}>
              <Heart size={20} color={colors.reproductive.thyroid} />
              <Text style={styles.featureText}>Monitor your fertility window</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={20} color={colors.reproductive.stress} />
              <Text style={styles.featureText}>Connect with health experts</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Start Your Journey</Text>
          <ArrowRight size={20} color={colors.nude.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.semantic.balanced + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.lg,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreCircle: {
    marginBottom: spacing.md,
  },
  scoreLabel: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  scoreMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  featuresContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    width: '100%',
  },
  featuresTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  featureList: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  featureText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  continueButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.background,
  },
});
