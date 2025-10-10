import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Calendar, TrendingUp, Target } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function FertilityMode() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Fertility Mode</Text>
        <Text style={styles.subtitle}>Track your reproductive potential and fertility markers</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreCard}>
          <CircularProgress
            progress={72}
            size={120}
            strokeWidth={8}
            label="72%"
            subLabel="Fertile"
            color={colors.reproductive.uterus}
          />
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>Fertility Score</Text>
            <Text style={styles.scoreDescription}>
              Your reproductive system is in good condition. Focus on stress management for optimal fertility.
            </Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Calendar size={24} color={colors.reproductive.uterus} />
            <Text style={styles.metricLabel}>Cycle Length</Text>
            <Text style={styles.metricValue}>28 days</Text>
          </View>

          <View style={styles.metricCard}>
            <TrendingUp size={24} color={colors.reproductive.ovaries} />
            <Text style={styles.metricLabel}>Ovulation</Text>
            <Text style={styles.metricValue}>Regular</Text>
          </View>

          <View style={styles.metricCard}>
            <Target size={24} color={colors.reproductive.thyroid} />
            <Text style={styles.metricLabel}>Hormone Balance</Text>
            <Text style={styles.metricValue}>Good</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Heart size={20} color={colors.nude.roseGold} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Fertility Tip</Text>
            <Text style={styles.tipText}>
              Regular sleep and stress management are key to maintaining optimal fertility markers.
            </Text>
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
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  scoreCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  scoreTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  scoreDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  metricCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  tipCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  tipTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
  },
});
