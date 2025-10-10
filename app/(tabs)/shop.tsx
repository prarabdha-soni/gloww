import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Sparkles, Zap, Sunrise } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  subscription?: string;
}

function ProductCard({ icon, title, description, price, subscription }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productIconContainer}>{icon}</View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={20} color={colors.nude.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      <View style={styles.productFooter}>
        <View>
          <Text style={styles.productPrice}>{price}</Text>
          {subscription && (
            <Text style={styles.subscriptionText}>{subscription}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface TierCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

function TierCard({ title, price, period, features, isPopular }: TierCardProps) {
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
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.tierButton, isPopular && styles.tierButtonPopular]}
      >
        <Text
          style={[styles.tierButtonText, isPopular && styles.tierButtonTextPopular]}
        >
          Subscribe
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ShopScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gloww Shop</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Curated Stacks</Text>

        <ProductCard
          icon={<Heart size={24} color={colors.nude.roseGold} />}
          title="Calm Stack"
          description="Magnesium, Ashwagandha & L-Theanine for stress relief"
          price="₹3,999"
          subscription="/month"
        />

        <ProductCard
          icon={<Zap size={24} color={colors.nude.roseGold} />}
          title="Energy Stack"
          description="B-Complex, CoQ10 & Rhodiola for sustained energy"
          price="₹4,499"
          subscription="/month"
        />

        <ProductCard
          icon={<Sunrise size={24} color={colors.nude.roseGold} />}
          title="Glow Stack"
          description="Collagen, Biotin & Vitamin C for skin radiance"
          price="₹4,999"
          subscription="/month"
        />

        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          Subscription Tiers
        </Text>

        <TierCard
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

        <TierCard
          title="Balance"
          price="₹4,999"
          period="month"
          features={[
            'Everything in Basic',
            'AI Coach access',
            'Lab test discounts',
            'Monthly supplement',
            'Priority support',
          ]}
          isPopular
        />

        <TierCard
          title="Gloww+"
          price="₹8,499"
          period="month"
          features={[
            'Everything in Balance',
            'Unlimited AI coaching',
            'Free lab testing',
            'Custom supplement stacks',
            'Wearable integration',
            '1-on-1 expert calls',
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
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  productCard: {
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
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  productIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  productDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
  },
  subscriptionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  addButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  addButtonText: {
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
    fontSize: typography.size.xl,
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
    fontSize: typography.size.xxxl,
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
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.nude.roseGold,
    marginRight: spacing.sm,
  },
  featureText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
  },
  tierButton: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.nude.text,
  },
  tierButtonPopular: {
    backgroundColor: colors.nude.text,
    borderColor: colors.nude.text,
  },
  tierButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  tierButtonTextPopular: {
    color: colors.nude.background,
  },
});
