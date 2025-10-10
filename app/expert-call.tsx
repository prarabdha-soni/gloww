import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, Video, Phone, MessageCircle } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface ExpertCardProps {
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  availability: string;
}

function ExpertCard({ name, title, specialty, rating, reviews, availability }: ExpertCardProps) {
  return (
    <View style={styles.expertCard}>
      <View style={styles.expertHeader}>
        <View style={styles.expertAvatar}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{name}</Text>
          <Text style={styles.expertTitle}>{title}</Text>
          <Text style={styles.expertSpecialty}>{specialty}</Text>
        </View>
      </View>
      <View style={styles.expertStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>⭐ {rating}</Text>
          <Text style={styles.statLabel}>{reviews} reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{availability}</Text>
          <Text style={styles.statLabel}>Next available</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Consultation</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ExpertCallScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'video' | 'phone' | 'chat'>('video');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expert Consultation</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Talk to a Hormone{'\n'}Health Expert</Text>
        <Text style={styles.subtitle}>
          Get personalized guidance from certified hormone health specialists
        </Text>

        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'video' && styles.typeButtonActive]}
            onPress={() => setSelectedType('video')}
          >
            <Video
              size={20}
              color={selectedType === 'video' ? colors.nude.background : colors.nude.text}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'video' && styles.typeButtonTextActive,
              ]}
            >
              Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'phone' && styles.typeButtonActive]}
            onPress={() => setSelectedType('phone')}
          >
            <Phone
              size={20}
              color={selectedType === 'phone' ? colors.nude.background : colors.nude.text}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'phone' && styles.typeButtonTextActive,
              ]}
            >
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'chat' && styles.typeButtonActive]}
            onPress={() => setSelectedType('chat')}
          >
            <MessageCircle
              size={20}
              color={selectedType === 'chat' ? colors.nude.background : colors.nude.text}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === 'chat' && styles.typeButtonTextActive,
              ]}
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>What to expect:</Text>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>45-minute personalized session</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Custom hormone optimization plan</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Supplement & lifestyle recommendations</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Follow-up support via chat</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Experts</Text>

        <ExpertCard
          name="Dr. Sarah Chen"
          title="Endocrinologist"
          specialty="Hormone Balance & Thyroid"
          rating={4.9}
          reviews={127}
          availability="Today, 3pm"
        />

        <ExpertCard
          name="Dr. Michael Ross"
          title="Functional Medicine"
          specialty="Men's Hormone Health"
          rating={4.8}
          reviews={89}
          availability="Tomorrow, 10am"
        />

        <ExpertCard
          name="Dr. Emily Park"
          title="Nutritionist"
          specialty="Hormone & Nutrition"
          rating={5.0}
          reviews={156}
          availability="Today, 5pm"
        />

        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <View>
              <Text style={styles.pricingTitle}>Single Session</Text>
              <Text style={styles.pricingDescription}>One-time consultation</Text>
            </View>
            <Text style={styles.price}>₹12,999</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.pricingHeader}>
            <View>
              <Text style={styles.pricingTitle}>Gloww+ Members</Text>
              <Text style={styles.pricingDescription}>Included in subscription</Text>
            </View>
            <Text style={[styles.price, styles.priceHighlight]}>Free</Text>
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
  headerTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonActive: {
    backgroundColor: colors.nude.text,
    borderColor: colors.nude.text,
  },
  typeButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  typeButtonTextActive: {
    color: colors.nude.background,
  },
  benefitsCard: {
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
  benefitsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.nude.roseGold,
    marginRight: spacing.sm,
  },
  benefitText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  expertCard: {
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
  expertHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  expertAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
  },
  expertInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  expertName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  expertTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.roseGold,
    marginBottom: spacing.xs,
  },
  expertSpecialty: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  expertStats: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  bookButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  pricingCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  pricingDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  price: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
  },
  priceHighlight: {
    color: colors.nude.roseGold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.nude.border,
    marginVertical: spacing.md,
  },
});
