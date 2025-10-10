import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Activity, Beaker, MessageCircle, ShoppingBag, Lightbulb, Sparkles, Phone, Heart, Brain, Zap } from 'lucide-react-native';
import GlowwScore from '@/components/GlowwScore';
import OrganDashboard from '@/components/OrganDashboard';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  // Sample organ data
  const organs = [
    { name: 'Uterus', status: 'healing' as const, progress: 30, color: colors.reproductive.uterus },
    { name: 'Ovaries', status: 'balanced' as const, progress: 75, color: colors.reproductive.ovaries },
    { name: 'Thyroid', status: 'rising' as const, progress: 60, color: colors.reproductive.thyroid },
    { name: 'Stress', status: 'rising' as const, progress: 45, color: colors.reproductive.stress },
  ];

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
          score={72} 
          status="Balanced but stress rising" 
          description="Your reproductive system is healing. Focus on stress management for optimal balance."
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
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Activity size={24} color={colors.nude.text} />
            </View>
            <Text style={styles.actionLabel}>Track</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Beaker size={24} color={colors.nude.text} />
            </View>
            <Text style={styles.actionLabel}>Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MessageCircle size={24} color={colors.nude.text} />
            </View>
            <Text style={styles.actionLabel}>Coach</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <ShoppingBag size={24} color={colors.nude.text} />
            </View>
            <Text style={styles.actionLabel}>Shop</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Reproductive Wellness</Text>

        <View style={styles.modesGrid}>
          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.uterus }]}
            onPress={() => router.push('/modes/fertility')}
          >
            <Heart size={28} color={colors.nude.roseGold} />
            <Text style={styles.modeLabel}>Fertility</Text>
            <Text style={styles.modeScore}>72</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.ovaries }]}
            onPress={() => router.push('/modes/cycle')}
          >
            <Zap size={28} color={colors.nude.roseGold} />
            <Text style={styles.modeLabel}>Cycle</Text>
            <Text style={styles.modeScore}>68</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.thyroid }]}
            onPress={() => router.push('/modes/hormones')}
          >
            <Brain size={28} color={colors.nude.roseGold} />
            <Text style={styles.modeLabel}>Hormones</Text>
            <Text style={styles.modeScore}>75</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.stress }]}
            onPress={() => router.push('/modes/stress')}
          >
            <Sparkles size={28} color={colors.nude.roseGold} />
            <Text style={styles.modeLabel}>Stress</Text>
            <Text style={styles.modeScore}>45</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.expertCallCard}
          onPress={() => router.push('/expert-call')}
        >
          <View style={styles.expertCallIcon}>
            <Phone size={24} color={colors.nude.roseGold} />
          </View>
          <View style={styles.expertCallContent}>
            <Text style={styles.expertCallTitle}>Talk to a Reproductive Health Expert</Text>
            <Text style={styles.expertCallSubtitle}>
              Book a 1-on-1 consultation with a reproductive wellness specialist
            </Text>
          </View>
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
    color: colors.nude.text,
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
    backgroundColor: colors.nude.peach,
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
});
