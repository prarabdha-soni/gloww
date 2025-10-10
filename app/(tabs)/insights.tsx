import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, TrendingUp, TrendingDown } from 'lucide-react-native';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface InsightCardProps {
  title: string;
  trend: 'up' | 'down';
  percentage: string;
  description: string;
}

function InsightCard({ title, trend, percentage, description }: InsightCardProps) {
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightTitle}>{title}</Text>
        <View style={styles.trendBadge}>
          {trend === 'up' ? (
            <TrendingUp size={16} color={colors.semantic.success} />
          ) : (
            <TrendingDown size={16} color={colors.semantic.error} />
          )}
          <Text
            style={[
              styles.trendText,
              trend === 'up' ? styles.trendUp : styles.trendDown,
            ]}
          >
            {percentage}
          </Text>
        </View>
      </View>
      <Text style={styles.insightDescription}>{description}</Text>
    </View>
  );
}

export default function InsightsScreen() {
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
        <Text style={styles.headerTitle}>Healing Insights</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Reproductive Hormone Levels</Text>
          <Text style={styles.chartSubtitle}>Last 30 days - Healing Progress</Text>
          <View style={styles.chartContainer}>
            <Svg width="100%" height={200} viewBox="0 0 350 200">
              <Rect x="20" y="150" width="40" height="40" fill={colors.nude.accentLight} rx="4" />
              <Rect x="70" y="120" width="40" height="70" fill={colors.nude.accent} rx="4" />
              <Rect x="120" y="100" width="40" height="90" fill={colors.nude.roseGold} rx="4" />
              <Rect x="170" y="130" width="40" height="60" fill={colors.nude.accent} rx="4" />
              <Rect x="220" y="110" width="40" height="80" fill={colors.nude.accentLight} rx="4" />
              <Rect x="270" y="140" width="40" height="50" fill={colors.nude.accent} rx="4" />

              <SvgText x="40" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W1</SvgText>
              <SvgText x="90" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W2</SvgText>
              <SvgText x="140" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W3</SvgText>
              <SvgText x="190" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W4</SvgText>
              <SvgText x="240" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W5</SvgText>
              <SvgText x="290" y="210" fontSize="10" fill={colors.nude.textSecondary} textAnchor="middle">W6</SvgText>
            </Svg>
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.nude.roseGold }]} />
              <Text style={styles.legendText}>Estrogen</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.nude.accent }]} />
              <Text style={styles.legendText}>Progesterone</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.nude.accentLight }]} />
              <Text style={styles.legendText}>Cortisol</Text>
            </View>
          </View>
        </View>

        <View style={styles.correlationCard}>
          <Text style={styles.chartTitle}>Reproductive Health & Cycle Correlation</Text>
          <View style={styles.correlationChart}>
            <Svg width="100%" height={150} viewBox="0 0 350 150">
              <Path
                d="M 0 100 Q 50 80, 100 90 T 200 85 T 300 75 T 350 80"
                stroke={colors.nude.roseGold}
                strokeWidth="3"
                fill="none"
              />
              <Path
                d="M 0 110 Q 50 90, 100 100 T 200 95 T 300 85 T 350 90"
                stroke={colors.nude.accent}
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </Svg>
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: colors.nude.roseGold }]} />
              <Text style={styles.legendText}>Cycle Health</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: colors.nude.accent, height: 2 }]} />
              <Text style={styles.legendText}>Hormone Balance</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Key Insights</Text>

        <InsightCard
          title="Cycle Regularity"
          trend="up"
          percentage="+18%"
          description="Your menstrual cycle is becoming more regular, indicating improved reproductive health"
        />

        <InsightCard
          title="Hormone Balance"
          trend="up"
          percentage="+12%"
          description="Estrogen and progesterone levels are stabilizing, supporting better reproductive function"
        />

        <InsightCard
          title="PCOS Risk Factors"
          trend="down"
          percentage="-25%"
          description="Reduced PCOS-related symptoms detected. Continue your current wellness approach"
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
  },
  chartCard: {
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
  chartTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  chartSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.md,
  },
  chartContainer: {
    marginVertical: spacing.md,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  legendLine: {
    width: 16,
    height: 3,
    borderRadius: 2,
    marginRight: spacing.xs,
  },
  legendText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  correlationCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  correlationChart: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  insightCard: {
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
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  insightTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  trendText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
  },
  trendUp: {
    color: colors.semantic.success,
  },
  trendDown: {
    color: colors.semantic.error,
  },
  insightDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
});
