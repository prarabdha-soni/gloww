import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function HormonesMode() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Hormones Mode</Text>
        <Text style={styles.subtitle}>Monitor your hormonal balance and reproductive health</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreCard}>
          <CircularProgress
            progress={75}
            size={120}
            strokeWidth={8}
            label="75%"
            subLabel="Balanced"
            color={colors.reproductive.thyroid}
          />
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>Hormone Balance</Text>
            <Text style={styles.scoreDescription}>
              Your hormones are well-balanced. Continue supporting your reproductive system with proper nutrition.
            </Text>
          </View>
        </View>

        <View style={styles.hormonesList}>
          <View style={styles.hormoneCard}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.hormoneInfo}>
              <Text style={styles.hormoneName}>Estrogen</Text>
              <Text style={styles.hormoneStatus}>Optimal</Text>
            </View>
            <Text style={styles.hormoneValue}>85%</Text>
          </View>

          <View style={styles.hormoneCard}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.hormoneInfo}>
              <Text style={styles.hormoneName}>Progesterone</Text>
              <Text style={styles.hormoneStatus}>Good</Text>
            </View>
            <Text style={styles.hormoneValue}>72%</Text>
          </View>

          <View style={styles.hormoneCard}>
            <AlertCircle size={20} color={colors.semantic.rising} />
            <View style={styles.hormoneInfo}>
              <Text style={styles.hormoneName}>Cortisol</Text>
              <Text style={styles.hormoneStatus}>Rising</Text>
            </View>
            <Text style={styles.hormoneValue}>45%</Text>
          </View>

          <View style={styles.hormoneCard}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.hormoneInfo}>
              <Text style={styles.hormoneName}>Thyroid (TSH)</Text>
              <Text style={styles.hormoneStatus}>Normal</Text>
            </View>
            <Text style={styles.hormoneValue}>68%</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Brain size={20} color={colors.nude.roseGold} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Hormone Tip</Text>
            <Text style={styles.tipText}>
              Your cortisol levels are elevated. Try meditation and stress-reduction techniques to support hormonal balance.
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
  hormonesList: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  hormoneCard: {
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
  hormoneInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  hormoneName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  hormoneStatus: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  hormoneValue: {
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
