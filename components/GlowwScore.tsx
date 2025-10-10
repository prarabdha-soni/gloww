import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from './CircularProgress';
import { colors, typography, spacing } from '@/constants/theme';

interface GlowwScoreProps {
  score: number;
  status: string;
  description: string;
}

export default function GlowwScore({ score, status, description }: GlowwScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return colors.semantic.balanced;
    if (score >= 60) return colors.semantic.healing;
    if (score >= 40) return colors.semantic.rising;
    return colors.semantic.error;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Improving';
    return 'Needs Attention';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <CircularProgress
          progress={score}
          size={180}
          strokeWidth={12}
          label={`${score}%`}
          subLabel={getScoreLabel(score)}
          color={getScoreColor(score)}
        />
      </View>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Gloww Score</Text>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  scoreContainer: {
    marginBottom: spacing.md,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
