import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Activity, Beaker, ShoppingBag, Lightbulb, Sparkles, Phone, Heart, Brain, Zap, Calendar, Target, Baby, Flower } from 'lucide-react-native';
import GlowwScore from '@/components/GlowwScore';
import OrganDashboard from '@/components/OrganDashboard';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  // Calculate dynamic Gloww Score based on organ health
  const organs = [
    { name: 'Uterus', status: 'healing' as const, progress: 30, color: colors.reproductive.uterus },
    { name: 'Ovaries', status: 'balanced' as const, progress: 75, color: colors.reproductive.ovaries },
    { name: 'Thyroid', status: 'rising' as const, progress: 60, color: colors.reproductive.thyroid },
    { name: 'Stress', status: 'rising' as const, progress: 45, color: colors.reproductive.stress },
  ];

  // Calculate overall Gloww Score
  const overallScore = Math.round(organs.reduce((sum, organ) => sum + organ.progress, 0) / organs.length);
  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent reproductive health! 🌟";
    if (score >= 60) return "Good progress, keep nurturing yourself 💕";
    if (score >= 40) return "Healing journey in progress 🌱";
    return "Focus on self-care and wellness 🌸";
  };
  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Your reproductive system is thriving. Maintain your healthy habits!";
    if (score >= 60) return "You're doing great! Small improvements will boost your score even more.";
    if (score >= 40) return "Your body is healing beautifully. Every small step counts.";
    return "Start with gentle self-care practices. Your body is ready to heal.";
  };

  const handleOrganPress = (organ: any) => {
    // Navigate to organ details
    console.log('Organ pressed:', organ.name);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>Gloww</Text>
        <Text style={styles.tagline}>Where reproductive balance begins — naturally, scientifically, beautifully.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Heal Your{'\n'}Reproductive Core</Text>

        <GlowwScore 
          score={overallScore} 
          status={getScoreStatus(overallScore)} 
          description={getScoreDescription(overallScore)}
        />

        <OrganDashboard organs={organs} onOrganPress={handleOrganPress} />

        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Lightbulb size={20} color={colors.nude.roseGold} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Reproductive Wellness Tip</Text>
            <Text style={styles.tipText}>
              Your uterus is healing—gentle movement and stress reduction will support the process.
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/track')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.ovaries }]}>
              <Calendar size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>My Cycle</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/track')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.uterus }]}>
              <Target size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>Fertility</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/test')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.thyroid }]}>
              <Beaker size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>Health Tests</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/shop')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.stress }]}>
              <Flower size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>Wellness</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Wellness Journey 💕</Text>

        <View style={styles.modesGrid}>
          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.uterus }]}
            onPress={() => router.push('/modes/fertility')}
          >
            <Heart size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Fertility & Conception</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Uterus')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Track your fertile days</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.ovaries }]}
            onPress={() => router.push('/modes/cycle')}
          >
            <Calendar size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Period & Cycle</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Ovaries')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Monitor your cycle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.thyroid }]}
            onPress={() => router.push('/modes/hormones')}
          >
            <Brain size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Hormone Balance</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Thyroid')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Balance your hormones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.stress }]}
            onPress={() => router.push('/modes/stress')}
          >
            <Flower size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Self-Care & Stress</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Stress')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Nurture your wellbeing</Text>
          </TouchableOpacity>
        </View>

            <TouchableOpacity
              style={styles.expertCallCard}
              onPress={() => router.push('/doctors')}
            >
              <View style={styles.expertCallIcon}>
                <Phone size={24} color={colors.nude.background} />
              </View>
              <View style={styles.expertCallContent}>
                <Text style={styles.expertCallTitle}>💬 Chat with a Women's Health Expert</Text>
                <Text style={styles.expertCallSubtitle}>
                  Get personalized advice from certified reproductive health specialists
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pregnancyCard}
              onPress={() => router.push('/track')}
            >
              <View style={styles.pregnancyIcon}>
                <Baby size={24} color={colors.nude.background} />
              </View>
              <View style={styles.pregnancyContent}>
                <Text style={styles.pregnancyTitle}>🤱 Pregnancy & Baby Tracking</Text>
                <Text style={styles.pregnancySubtitle}>
                  Track your pregnancy journey and baby's growth week by week
                </Text>
              </View>
            </TouchableOpacity>

            {/* New Feature Cards */}
            <View style={styles.newFeaturesSection}>
              <Text style={styles.sectionTitle}>Advanced Features</Text>
              
              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => router.push('/analytics')}
              >
                <View style={styles.featureIcon}>
                  <Brain size={24} color={colors.nude.roseGold} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Predictive Analytics</Text>
                  <Text style={styles.featureDescription}>
                    AI-powered fertility predictions and health risk assessment
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => router.push('/premium')}
              >
                <View style={styles.featureIcon}>
                  <Sparkles size={24} color={colors.nude.roseGold} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Premium Services</Text>
                  <Text style={styles.featureDescription}>
                    Virtual consultations, health coaching, and personalized supplements
                  </Text>
                </View>
              </TouchableOpacity>
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
    paddingBottom: spacing.md,
  },
  logo: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    letterSpacing: 0.5,
  },
  tagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    lineHeight: 38,
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  tipCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.nude.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  modeCard: {
    flex: 1,
    minWidth: '48%',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modeEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  modeLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  modeScore: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.background,
    marginTop: spacing.xs,
  },
  modeSubtext: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.background,
    opacity: 0.8,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  expertCallCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expertCallIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  expertCallContent: {
    flex: 1,
  },
  expertCallTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  expertCallSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  newFeaturesSection: {
    marginTop: spacing.xl,
  },
  featureCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  pregnancyCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pregnancyIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.reproductive.uterus,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  pregnancyContent: {
    flex: 1,
  },
  pregnancyTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  pregnancySubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
});
