import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Zap, Calendar, Clock, Activity } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function CycleMode() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Cycle Mode</Text>
        <Text style={styles.subtitle}>Track your menstrual cycle and hormonal patterns</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreCard}>
          <CircularProgress
            progress={68}
            size={120}
            strokeWidth={8}
            label="68%"
            subLabel="Regular"
            color={colors.reproductive.ovaries}
          />
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>Cycle Health</Text>
            <Text style={styles.scoreDescription}>
              Your cycle is showing good regularity. Track patterns for optimal reproductive health.
            </Text>
          </View>
        </View>

        <View style={styles.cycleInfo}>
          <View style={styles.cycleCard}>
            <Calendar size={24} color={colors.reproductive.ovaries} />
            <View style={styles.cycleDetails}>
              <Text style={styles.cycleLabel}>Current Phase</Text>
              <Text style={styles.cycleValue}>Follicular</Text>
            </View>
          </View>

          <View style={styles.cycleCard}>
            <Clock size={24} color={colors.reproductive.thyroid} />
            <View style={styles.cycleDetails}>
              <Text style={styles.cycleLabel}>Days to Ovulation</Text>
              <Text style={styles.cycleValue}>8 days</Text>
            </View>
          </View>

          <View style={styles.cycleCard}>
            <Activity size={24} color={colors.reproductive.stress} />
            <View style={styles.cycleDetails}>
              <Text style={styles.cycleLabel}>Cycle Length</Text>
              <Text style={styles.cycleValue}>28 days</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Zap size={20} color={colors.nude.roseGold} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Cycle Tip</Text>
            <Text style={styles.tipText}>
              Your follicular phase is optimal for gentle exercise and nutrient-dense foods to support ovulation.
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
  cycleInfo: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  cycleCard: {
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
  cycleDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  cycleLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  cycleValue: {
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
