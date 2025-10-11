import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Beaker, ShoppingBag, Heart, Sparkles, Zap, Sunrise, Star, CheckCircle } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface TestCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  category: 'lab' | 'supplement';
  onPress: () => void;
}

function TestCard({ icon, title, description, price, category, onPress }: TestCardProps) {
  return (
    <TouchableOpacity style={styles.testCard} onPress={onPress}>
      <View style={styles.testHeader}>
        <View style={styles.testIconContainer}>{icon}</View>
        <View style={[styles.categoryBadge, { backgroundColor: category === 'lab' ? colors.reproductive.thyroid + '20' : colors.reproductive.ovaries + '20' }]}>
          <Text style={[styles.categoryText, { color: category === 'lab' ? colors.reproductive.thyroid : colors.reproductive.ovaries }]}>
            {category === 'lab' ? 'Lab Test' : 'Supplement'}
          </Text>
        </View>
      </View>
      <Text style={styles.testTitle}>{title}</Text>
      <Text style={styles.testDescription}>{description}</Text>
      <View style={styles.testFooter}>
        <Text style={styles.testPrice}>{price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

interface SubscriptionTierProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

function SubscriptionTier({ title, price, period, features, isPopular }: SubscriptionTierProps) {
  return (
    <View style={[styles.tierCard, isPopular && styles.tierCardPopular]}>
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <Text style={styles.tierTitle}>{title}</Text>
      <View style={styles.tierPricing}>
        <Text style={styles.tierPrice}>{price}</Text>
        <Text style={styles.tierPeriod}>/{period}</Text>
      </View>
      <View style={styles.tierFeatures}>
        {features.map((feature, index) => (
          <View key={index} style={styles.tierFeature}>
            <CheckCircle size={16} color={colors.semantic.balanced} />
            <Text style={styles.tierFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={[styles.subscribeButton, isPopular && styles.subscribeButtonPopular]}>
        <Text style={[styles.subscribeButtonText, isPopular && styles.subscribeButtonTextPopular]}>
          Choose Plan
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TestScreen() {
  const router = useRouter();

  const handleLabTestPress = (testType: string) => {
    console.log('Lab test pressed:', testType);
  };

  const handleSupplementPress = (supplementType: string) => {
    console.log('Supplement pressed:', supplementType);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health & Wellness</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Lab Tests & Diagnostics</Text>
        <Text style={styles.sectionSubtitle}>Comprehensive health testing for reproductive wellness</Text>

        <TestCard
          icon={<Beaker size={24} color={colors.reproductive.thyroid} />}
          title="Hormone Panel"
          description="Complete hormone profile including estrogen, progesterone, testosterone, and thyroid hormones"
          price="₹2,999"
          category="lab"
          onPress={() => handleLabTestPress('hormone-panel')}
        />

        <TestCard
          icon={<Heart size={24} color={colors.reproductive.uterus} />}
          title="PCOS Screening"
          description="Comprehensive screening for PCOS including insulin resistance and metabolic markers"
          price="₹3,499"
          category="lab"
          onPress={() => handleLabTestPress('pcos-screening')}
        />

        <TestCard
          icon={<Zap size={24} color={colors.reproductive.ovaries} />}
          title="Fertility Assessment"
          description="Complete fertility evaluation with AMH, FSH, LH, and ovulation tracking"
          price="₹4,999"
          category="lab"
          onPress={() => handleLabTestPress('fertility-assessment')}
        />

        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          Wellness Supplements
        </Text>
        <Text style={styles.sectionSubtitle}>Premium supplements for reproductive health</Text>

        <TestCard
          icon={<Heart size={24} color={colors.reproductive.uterus} />}
          title="Calm Stack"
          description="Magnesium, Ashwagandha & L-Theanine for stress relief and hormonal balance"
          price="₹3,999"
          category="supplement"
          onPress={() => handleSupplementPress('calm-stack')}
        />

        <TestCard
          icon={<Zap size={24} color={colors.reproductive.ovaries} />}
          title="Energy Stack"
          description="B-Complex, CoQ10 & Rhodiola for sustained energy and metabolic support"
          price="₹4,499"
          category="supplement"
          onPress={() => handleSupplementPress('energy-stack')}
        />

        <TestCard
          icon={<Sunrise size={24} color={colors.nude.roseGold} />}
          title="Glow Stack"
          description="Collagen, Biotin & Vitamin C for skin radiance and overall wellness"
          price="₹4,999"
          category="supplement"
          onPress={() => handleSupplementPress('glow-stack')}
        />

        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          Subscription Plans
        </Text>
        <Text style={styles.sectionSubtitle}>Choose your wellness journey</Text>

        <SubscriptionTier
          title="Basic"
          price="₹2,499"
          period="month"
          features={[
            'Daily tracking',
            'Hormone rhythm chart',
            'Basic insights',
            'Community access',
          ]}
        />

        <SubscriptionTier
          title="Balance"
          price="₹4,999"
          period="month"
          features={[
            'Everything in Basic',
            'AI Coach access',
            'Lab test discounts',
            'Monthly supplement',
            'Expert consultations',
          ]}
          isPopular={true}
        />

        <SubscriptionTier
          title="Thrive"
          price="₹7,999"
          period="month"
          features={[
            'Everything in Balance',
            'Premium supplements',
            'Priority expert access',
            'Personalized meal plans',
            'Advanced analytics',
            '1-on-1 coaching sessions',
          ]}
        />
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
    paddingTop: spacing.lg,
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + 80,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  testCard: {
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
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  testIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
  },
  testTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  testDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testPrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  bookButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  bookButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  tierCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  tierCardPopular: {
    borderWidth: 2,
    borderColor: colors.nude.roseGold,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: spacing.md,
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  popularText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.background,
  },
  tierTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  tierPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  tierPrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
  },
  tierPeriod: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  tierFeatures: {
    marginBottom: spacing.md,
  },
  tierFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tierFeatureText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  subscribeButtonPopular: {
    backgroundColor: colors.nude.roseGold,
  },
  subscribeButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  subscribeButtonTextPopular: {
    color: colors.nude.background,
  },
});