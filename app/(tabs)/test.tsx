import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import LabTestIntegration from '@/components/LabTestIntegration';

interface TestCardProps {
  title: string;
  price: string;
  description: string;
  status?: string;
}

function TestCard({ title, price, description, status }: TestCardProps) {
  return (
    <View style={styles.testCard}>
      <View style={styles.testCardHeader}>
        <View>
          <Text style={styles.testTitle}>{title}</Text>
          <Text style={styles.testPrice}>{price}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={20} color={colors.nude.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <Text style={styles.testDescription}>{description}</Text>
      {status && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order Test</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TestScreen() {
  const handleOrderTest = (testId: string) => {
    console.log('Order test:', testId);
    // Handle test ordering
  };

  const handleViewResults = (testId: string) => {
    console.log('View results:', testId);
    // Handle viewing test results
  };

  const handleTrackOrder = (orderId: string) => {
    console.log('Track order:', orderId);
    // Handle order tracking
  };

  return (
    <LabTestIntegration 
      onOrderTest={handleOrderTest}
      onViewResults={handleViewResults}
      onTrackOrder={handleTrackOrder}
    />
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
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
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
  testCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  testTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  testPrice: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.roseGold,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  statusBadge: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.text,
  },
  orderButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  orderButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  progressCard: {
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
  progressTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.nude.border,
    marginBottom: spacing.xs,
  },
  progressDotComplete: {
    backgroundColor: colors.nude.roseGold,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.nude.border,
    marginHorizontal: spacing.xs,
  },
  progressLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.text,
    textAlign: 'center',
    width: 60,
  },
  progressLabelInactive: {
    color: colors.nude.textSecondary,
  },
});
