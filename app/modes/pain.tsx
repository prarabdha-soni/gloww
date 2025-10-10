import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function PainModeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.logo}>Gloww</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pain Mode</Text>

        <View style={styles.scoreContainer}>
          <CircularProgress
            progress={72}
            size={180}
            strokeWidth={12}
            label="72"
          />
        </View>

        <Text style={styles.statusText}>Your knees are{'\n'}feeling better</Text>

        <View style={styles.recommendationCard}>
          <Text style={styles.sectionTitle}>Today's Recommendation</Text>
          <View style={styles.routineItem}>
            <View style={[styles.routineIcon, { backgroundColor: '#E0D5C8' }]}>
              <Text style={styles.iconEmoji}>🧘</Text>
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>Flex Routine</Text>
              <Text style={styles.routineDescription}>Mobility exercises</Text>
            </View>
          </View>
        </View>

        <View style={styles.stackCard}>
          <Text style={styles.sectionTitle}>AI Recommended Stack</Text>
          <View style={styles.stackItem}>
            <View style={[styles.stackIcon, { backgroundColor: '#E0D5C8' }]}>
              <Text style={styles.stackEmoji}>💪</Text>
            </View>
            <View style={styles.stackInfo}>
              <Text style={styles.stackName}>Flex Stack</Text>
              <Text style={styles.stackDescription}>Collagen, Omega 3, Turmeric</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.talkButton, { backgroundColor: '#E0D5C8' }]}>
          <Text style={styles.talkButtonText}>Talk to Gloww</Text>
        </TouchableOpacity>
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
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  statusText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.lg,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 28,
  },
  recommendationCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconEmoji: {
    fontSize: 28,
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  routineDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  stackCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stackItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stackEmoji: {
    fontSize: 28,
  },
  stackInfo: {
    flex: 1,
  },
  stackName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  stackDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  talkButton: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  talkButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
});
