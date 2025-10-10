import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  Beaker, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Share,
  Phone,
  Heart,
  Brain,
  Zap
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'hormone' | 'fertility' | 'thyroid' | 'vitamin' | 'comprehensive';
  icon: React.ReactNode;
  recommended: boolean;
  atHome: boolean;
  labPartner: string;
}

interface TestResult {
  id: string;
  testName: string;
  date: string;
  status: 'pending' | 'ready' | 'reviewed';
  results: {
    parameter: string;
    value: string;
    range: string;
    status: 'normal' | 'low' | 'high' | 'critical';
  }[];
  doctorReview?: string;
  recommendations?: string[];
  nextSteps?: string[];
}

interface LabTestIntegrationProps {
  onBookTest: (test: LabTest) => void;
  onViewResults: (result: TestResult) => void;
  onConnectExpert: () => void;
}

export default function LabTestIntegration({ 
  onBookTest, 
  onViewResults, 
  onConnectExpert 
}: LabTestIntegrationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const labTests: LabTest[] = [
    {
      id: 'comprehensive_hormone_panel',
      name: 'Comprehensive Hormone Panel',
      description: 'Complete analysis of estrogen, progesterone, testosterone, cortisol, and thyroid hormones',
      price: '₹8,999',
      duration: '3-5 days',
      category: 'comprehensive',
      icon: <Heart size={24} color={colors.reproductive.uterus} />,
      recommended: true,
      atHome: true,
      labPartner: 'Thyrocare'
    },
    {
      id: 'pcos_screening',
      name: 'PCOS Screening Panel',
      description: 'Specialized tests for PCOS diagnosis including insulin resistance and androgen levels',
      price: '₹6,499',
      duration: '2-3 days',
      category: 'hormone',
      icon: <Zap size={24} color={colors.reproductive.ovaries} />,
      recommended: true,
      atHome: true,
      labPartner: 'SRL Diagnostics'
    },
    {
      id: 'fertility_hormones',
      name: 'Fertility Hormone Panel',
      description: 'Essential hormones for fertility assessment including FSH, LH, AMH, and prolactin',
      price: '₹4,999',
      duration: '2-3 days',
      category: 'fertility',
      icon: <Heart size={24} color={colors.reproductive.uterus} />,
      recommended: false,
      atHome: true,
      labPartner: 'Dr. Lal PathLabs'
    },
    {
      id: 'thyroid_complete',
      name: 'Complete Thyroid Panel',
      description: 'TSH, T3, T4, reverse T3, and thyroid antibodies for comprehensive thyroid assessment',
      price: '₹3,999',
      duration: '1-2 days',
      category: 'thyroid',
      icon: <Brain size={24} color={colors.reproductive.thyroid} />,
      recommended: false,
      atHome: true,
      labPartner: 'Apollo Diagnostics'
    },
    {
      id: 'vitamin_d_b12',
      name: 'Vitamin D & B12 Panel',
      description: 'Essential vitamins that impact hormone production and reproductive health',
      price: '₹2,499',
      duration: '1-2 days',
      category: 'vitamin',
      icon: <Zap size={24} color={colors.semantic.healing} />,
      recommended: false,
      atHome: true,
      labPartner: 'Metropolis'
    }
  ];

  const sampleResults: TestResult[] = [
    {
      id: 'result_1',
      testName: 'Comprehensive Hormone Panel',
      date: '2024-01-15',
      status: 'reviewed',
      results: [
        {
          parameter: 'Estradiol (E2)',
          value: '85 pg/mL',
          range: '30-400 pg/mL',
          status: 'normal'
        },
        {
          parameter: 'Progesterone',
          value: '2.1 ng/mL',
          range: '0.1-20 ng/mL',
          status: 'normal'
        },
        {
          parameter: 'Testosterone',
          value: '45 ng/dL',
          range: '15-70 ng/dL',
          status: 'normal'
        },
        {
          parameter: 'Cortisol (AM)',
          value: '18.5 μg/dL',
          range: '6-23 μg/dL',
          status: 'normal'
        }
      ],
      doctorReview: 'Your hormone levels are within normal ranges. Continue your current wellness routine.',
      recommendations: [
        'Maintain regular sleep schedule',
        'Continue stress management practices',
        'Consider vitamin D supplementation'
      ],
      nextSteps: [
        'Retest in 3 months',
        'Track symptoms daily',
        'Schedule follow-up consultation'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tests', icon: <Beaker size={20} color={colors.nude.text} /> },
    { id: 'hormone', name: 'Hormones', icon: <Heart size={20} color={colors.reproductive.uterus} /> },
    { id: 'fertility', name: 'Fertility', icon: <Zap size={20} color={colors.reproductive.ovaries} /> },
    { id: 'thyroid', name: 'Thyroid', icon: <Brain size={20} color={colors.reproductive.thyroid} /> },
    { id: 'vitamin', name: 'Vitamins', icon: <Zap size={20} color={colors.semantic.healing} /> }
  ];

  const filteredTests = selectedCategory === 'all' 
    ? labTests 
    : labTests.filter(test => test.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return colors.semantic.balanced;
      case 'low': return colors.semantic.rising;
      case 'high': return colors.semantic.rising;
      case 'critical': return colors.semantic.error;
      default: return colors.nude.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle size={16} color={colors.semantic.balanced} />;
      case 'low': return <AlertTriangle size={16} color={colors.semantic.rising} />;
      case 'high': return <AlertTriangle size={16} color={colors.semantic.rising} />;
      case 'critical': return <AlertTriangle size={16} color={colors.semantic.error} />;
      default: return <Beaker size={16} color={colors.nude.textSecondary} />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Lab Test Integration</Text>
        <Text style={styles.subtitle}>
          Partner with trusted diagnostic labs for comprehensive health testing
        </Text>
      </View>

      <View style={styles.content}>
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lab Tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Tests</Text>
          {filteredTests.map((test) => (
            <View key={test.id} style={styles.testCard}>
              <View style={styles.testHeader}>
                <View style={styles.testIcon}>
                  {test.icon}
                </View>
                <View style={styles.testInfo}>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testDescription}>{test.description}</Text>
                  <View style={styles.testMeta}>
                    <Text style={styles.testPrice}>{test.price}</Text>
                    <Text style={styles.testDuration}>{test.duration}</Text>
                    <Text style={styles.testPartner}>{test.labPartner}</Text>
                  </View>
                </View>
                {test.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.testFeatures}>
                <View style={styles.featureItem}>
                  <CheckCircle size={16} color={colors.semantic.balanced} />
                  <Text style={styles.featureText}>At-home collection</Text>
                </View>
                <View style={styles.featureItem}>
                  <CheckCircle size={16} color={colors.semantic.balanced} />
                  <Text style={styles.featureText}>Digital results</Text>
                </View>
                <View style={styles.featureItem}>
                  <CheckCircle size={16} color={colors.semantic.balanced} />
                  <Text style={styles.featureText}>Expert interpretation</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => onBookTest(test)}
              >
                <Text style={styles.bookButtonText}>Book Test</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Test Results */}
        {sampleResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Test Results</Text>
            {sampleResults.map((result) => (
              <View key={result.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{result.testName}</Text>
                    <Text style={styles.resultDate}>{result.date}</Text>
                  </View>
                  <View style={styles.resultActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Download size={16} color={colors.nude.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Share size={16} color={colors.nude.text} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.resultsList}>
                  {result.results.map((item, index) => (
                    <View key={index} style={styles.resultItem}>
                      <View style={styles.resultParameter}>
                        <Text style={styles.parameterName}>{item.parameter}</Text>
                        <Text style={styles.parameterValue}>{item.value}</Text>
                      </View>
                      <View style={styles.resultStatus}>
                        {getStatusIcon(item.status)}
                        <Text style={[
                          styles.statusText,
                          { color: getStatusColor(item.status) }
                        ]}>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {result.doctorReview && (
                  <View style={styles.doctorReview}>
                    <Text style={styles.reviewTitle}>Doctor's Review</Text>
                    <Text style={styles.reviewText}>{result.doctorReview}</Text>
                  </View>
                )}

                {result.recommendations && (
                  <View style={styles.recommendations}>
                    <Text style={styles.recommendationsTitle}>Recommendations</Text>
                    {result.recommendations.map((rec, index) => (
                      <View key={index} style={styles.recommendationItem}>
                        <View style={styles.recommendationDot} />
                        <Text style={styles.recommendationText}>{rec}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => onViewResults(result)}
                >
                  <Text style={styles.viewDetailsText}>View Full Report</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Expert Consultation */}
        <View style={styles.expertCard}>
          <View style={styles.expertHeader}>
            <Phone size={24} color={colors.nude.roseGold} />
            <View style={styles.expertInfo}>
              <Text style={styles.expertTitle}>Need Help Interpreting Results?</Text>
              <Text style={styles.expertSubtitle}>
                Connect with our reproductive health specialists
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.expertButton}
            onPress={onConnectExpert}
          >
            <Text style={styles.expertButtonText}>Book Consultation</Text>
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
  categoryContainer: {
    marginBottom: spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    borderColor: colors.nude.roseGold,
    backgroundColor: colors.nude.peach,
  },
  categoryText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.xs,
  },
  categoryTextActive: {
    color: colors.nude.text,
    fontFamily: typography.fontFamily.semibold,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
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
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  testIcon: {
    marginRight: spacing.md,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  testDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  testPrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.roseGold,
  },
  testDuration: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  testPartner: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  recommendedBadge: {
    backgroundColor: colors.semantic.healing,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  recommendedText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.background,
  },
  testFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureText: {
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
  resultCard: {
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  resultDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  resultActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    marginBottom: spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.nude.border,
  },
  resultParameter: {
    flex: 1,
  },
  parameterName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  parameterValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  resultStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    textTransform: 'capitalize',
  },
  doctorReview: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  reviewText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
  },
  recommendations: {
    marginBottom: spacing.md,
  },
  recommendationsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recommendationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.healing,
    marginRight: spacing.sm,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    flex: 1,
  },
  viewDetailsButton: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.nude.text,
  },
  viewDetailsText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  expertCard: {
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
  expertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  expertInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  expertTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  expertSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  expertButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  expertButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
});
