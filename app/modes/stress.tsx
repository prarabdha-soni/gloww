import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, Heart, Brain, Wind } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function StressMode() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Stress Mode</Text>
        <Text style={styles.subtitle}>Manage stress for optimal reproductive health</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreCard}>
          <CircularProgress
            progress={45}
            size={120}
            strokeWidth={8}
            label="45%"
            subLabel="Rising"
            color={colors.semantic.rising}
          />
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>Stress Level</Text>
            <Text style={styles.scoreDescription}>
              Your stress levels are elevated. Focus on relaxation techniques to support your reproductive wellness.
            </Text>
          </View>
        </View>

        <View style={styles.stressFactors}>
          <Text style={styles.sectionTitle}>Stress Factors</Text>
          
          <View style={styles.factorCard}>
            <Heart size={20} color={colors.semantic.rising} />
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>Work Pressure</Text>
              <Text style={styles.factorImpact}>High Impact</Text>
            </View>
          </View>

          <View style={styles.factorCard}>
            <Brain size={20} color={colors.semantic.healing} />
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>Sleep Quality</Text>
              <Text style={styles.factorImpact}>Moderate Impact</Text>
            </View>
          </View>

          <View style={styles.factorCard}>
            <Wind size={20} color={colors.semantic.healing} />
            <View style={styles.factorInfo}>
              <Text style={styles.factorName}>Exercise</Text>
              <Text style={styles.factorImpact}>Positive Impact</Text>
            </View>
          </View>
        </View>

        <View style={styles.recommendations}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          
          <View style={styles.recommendationCard}>
            <Sparkles size={20} color={colors.nude.roseGold} />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Daily Meditation</Text>
              <Text style={styles.recommendationText}>
                Practice 10 minutes of mindfulness meditation to reduce cortisol levels.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <Wind size={20} color={colors.nude.roseGold} />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Breathing Exercises</Text>
              <Text style={styles.recommendationText}>
                Try 4-7-8 breathing technique before bed for better sleep and stress relief.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Sparkles size={20} color={colors.nude.roseGold} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Stress Management Tip</Text>
            <Text style={styles.tipText}>
              High stress can disrupt your reproductive hormones. Prioritize self-care and relaxation for optimal fertility.
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
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  stressFactors: {
    marginBottom: spacing.xl,
  },
  factorCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  factorInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  factorName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  factorImpact: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  recommendations: {
    marginBottom: spacing.xl,
  },
  recommendationCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  recommendationTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
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
