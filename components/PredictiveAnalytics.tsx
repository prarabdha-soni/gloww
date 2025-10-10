import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Calendar, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Zap,
  Moon,
  Activity,
  Brain,
  CheckCircle
} from 'lucide-react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface FertilityPrediction {
  date: string;
  probability: number;
  confidence: number;
  factors: string[];
}

interface HormoneForecast {
  date: string;
  estrogen: number;
  progesterone: number;
  cortisol: number;
  testosterone: number;
}

interface HealthRisk {
  condition: string;
  probability: number;
  timeframe: string;
  riskFactors: string[];
  preventionSteps: string[];
}

interface PredictiveAnalyticsProps {
  userData: {
    cycleLength: number;
    lastPeriod: string;
    symptoms: any[];
    lifestyle: any;
    testResults: any[];
  };
}

export default function PredictiveAnalytics({ userData }: PredictiveAnalyticsProps) {
  const [fertilityPredictions, setFertilityPredictions] = useState<FertilityPrediction[]>([]);
  const [hormoneForecast, setHormoneForecast] = useState<HormoneForecast[]>([]);
  const [healthRisks, setHealthRisks] = useState<HealthRisk[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    generatePredictions();
  }, [userData, selectedTimeframe]);

  const generatePredictions = () => {
    // Generate fertility predictions
    const fertilityData = generateFertilityPredictions();
    setFertilityPredictions(fertilityData);

    // Generate hormone forecast
    const hormoneData = generateHormoneForecast();
    setHormoneForecast(hormoneData);

    // Generate health risk assessment
    const riskData = generateHealthRisks();
    setHealthRisks(riskData);
  };

  const generateFertilityPredictions = (): FertilityPrediction[] => {
    const predictions: FertilityPrediction[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simulate fertility prediction based on cycle
      const cycleDay = (i % userData.cycleLength) + 1;
      let probability = 0;
      let confidence = 0;
      const factors: string[] = [];

      if (cycleDay >= 10 && cycleDay <= 18) {
        probability = Math.random() * 40 + 60; // 60-100% during fertile window
        confidence = Math.random() * 20 + 80; // 80-100% confidence
        factors.push('Optimal cycle timing');
        factors.push('Hormone levels favorable');
      } else if (cycleDay >= 8 && cycleDay <= 20) {
        probability = Math.random() * 30 + 30; // 30-60% during extended fertile period
        confidence = Math.random() * 30 + 60; // 60-90% confidence
        factors.push('Extended fertile window');
      } else {
        probability = Math.random() * 20; // 0-20% outside fertile window
        confidence = Math.random() * 40 + 50; // 50-90% confidence
        factors.push('Low fertility period');
      }

      // Adjust based on symptoms
      if (userData.symptoms.some(s => s.category === 'hormone')) {
        probability *= 0.8;
        factors.push('Hormone imbalance detected');
      }

      predictions.push({
        date: date.toISOString().split('T')[0],
        probability: Math.round(probability),
        confidence: Math.round(confidence),
        factors
      });
    }

    return predictions;
  };

  const generateHormoneForecast = (): HormoneForecast[] => {
    const forecast: HormoneForecast[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const cycleDay = (i % userData.cycleLength) + 1;
      
      // Simulate hormone levels based on cycle phase
      let estrogen = 50;
      let progesterone = 20;
      let cortisol = 15;
      let testosterone = 30;

      if (cycleDay >= 1 && cycleDay <= 5) {
        // Menstrual phase
        estrogen = 30 + Math.random() * 20;
        progesterone = 10 + Math.random() * 10;
      } else if (cycleDay >= 6 && cycleDay <= 13) {
        // Follicular phase
        estrogen = 50 + Math.random() * 50;
        progesterone = 15 + Math.random() * 10;
      } else if (cycleDay >= 14 && cycleDay <= 16) {
        // Ovulation
        estrogen = 80 + Math.random() * 40;
        progesterone = 20 + Math.random() * 20;
      } else {
        // Luteal phase
        estrogen = 40 + Math.random() * 30;
        progesterone = 30 + Math.random() * 40;
      }

      // Add stress impact
      if (userData.lifestyle?.stressLevel > 7) {
        cortisol += 10;
        estrogen *= 0.9;
      }

      forecast.push({
        date: date.toISOString().split('T')[0],
        estrogen: Math.round(estrogen),
        progesterone: Math.round(progesterone),
        cortisol: Math.round(cortisol),
        testosterone: Math.round(testosterone)
      });
    }

    return forecast;
  };

  const generateHealthRisks = (): HealthRisk[] => {
    const risks: HealthRisk[] = [];

    // PCOS Risk Assessment
    const pcosSymptoms = userData.symptoms.filter(s => 
      ['irregular_periods', 'excess_hair', 'weight_gain', 'acne_breakouts'].includes(s.id)
    );
    
    if (pcosSymptoms.length >= 2) {
      risks.push({
        condition: 'PCOS Development',
        probability: Math.min(75, 30 + (pcosSymptoms.length * 15)),
        timeframe: '6-12 months',
        riskFactors: pcosSymptoms.map(s => s.name),
        preventionSteps: [
          'Maintain healthy weight',
          'Regular exercise routine',
          'Balanced nutrition',
          'Stress management'
        ]
      });
    }

    // Thyroid Risk Assessment
    const thyroidSymptoms = userData.symptoms.filter(s => 
      ['fatigue', 'weight_gain', 'hair_loss', 'brain_fog'].includes(s.id)
    );
    
    if (thyroidSymptoms.length >= 2) {
      risks.push({
        condition: 'Thyroid Dysfunction',
        probability: Math.min(60, 20 + (thyroidSymptoms.length * 10)),
        timeframe: '3-6 months',
        riskFactors: thyroidSymptoms.map(s => s.name),
        preventionSteps: [
          'Iodine-rich diet',
          'Regular thyroid monitoring',
          'Stress reduction',
          'Adequate sleep'
        ]
      });
    }

    // Fertility Risk Assessment
    if (userData.symptoms.some(s => s.id === 'irregular_periods')) {
      risks.push({
        condition: 'Fertility Challenges',
        probability: 45,
        timeframe: '1-2 years',
        riskFactors: ['Irregular menstrual cycles'],
        preventionSteps: [
          'Cycle tracking',
          'Hormone optimization',
          'Lifestyle modifications',
          'Early intervention'
        ]
      });
    }

    return risks;
  };

  const getFertilityColor = (probability: number) => {
    if (probability >= 80) return colors.semantic.balanced;
    if (probability >= 60) return colors.semantic.healing;
    if (probability >= 40) return colors.semantic.rising;
    return colors.semantic.error;
  };

  const getRiskColor = (probability: number) => {
    if (probability >= 70) return colors.semantic.error;
    if (probability >= 50) return colors.semantic.rising;
    if (probability >= 30) return colors.semantic.warning;
    return colors.semantic.healing;
  };

  const getRiskIcon = (probability: number) => {
    if (probability >= 70) return <AlertTriangle size={20} color={colors.semantic.error} />;
    if (probability >= 50) return <AlertTriangle size={20} color={colors.semantic.rising} />;
    if (probability >= 30) return <AlertTriangle size={20} color={colors.semantic.warning} />;
    return <CheckCircle size={20} color={colors.semantic.healing} />;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Predictive Analytics</Text>
        <Text style={styles.subtitle}>
          AI-powered insights into your reproductive health future
        </Text>
      </View>

      <View style={styles.content}>
        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          <Text style={styles.timeframeLabel}>Prediction Period:</Text>
          <View style={styles.timeframeButtons}>
            {(['week', 'month', 'quarter'] as const).map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe && styles.timeframeButtonActive
                ]}
                onPress={() => setSelectedTimeframe(timeframe)}
              >
                <Text style={[
                  styles.timeframeText,
                  selectedTimeframe === timeframe && styles.timeframeTextActive
                ]}>
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fertility Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fertility Window Predictions</Text>
          <View style={styles.fertilityChart}>
            <Svg width="100%" height={200} viewBox="0 0 350 200">
              {fertilityPredictions.slice(0, 14).map((prediction, index) => {
                const x = (index / 13) * 300 + 25;
                const y = 180 - (prediction.probability / 100) * 150;
                const color = getFertilityColor(prediction.probability);
                
                return (
                  <Circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={color}
                  />
                );
              })}
              
              {/* Connect points with line */}
              <Path
                d={fertilityPredictions.slice(0, 14).map((prediction, index) => {
                  const x = (index / 13) * 300 + 25;
                  const y = 180 - (prediction.probability / 100) * 150;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                stroke={colors.nude.roseGold}
                strokeWidth="2"
                fill="none"
              />
            </Svg>
          </View>
          
          <View style={styles.fertilityInsights}>
            {fertilityPredictions.slice(0, 7).map((prediction, index) => (
              <View key={index} style={styles.fertilityDay}>
                <Text style={styles.fertilityDate}>
                  {new Date(prediction.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
                <View style={styles.fertilityBar}>
                  <View 
                    style={[
                      styles.fertilityBarFill,
                      { 
                        width: `${prediction.probability}%`,
                        backgroundColor: getFertilityColor(prediction.probability)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.fertilityPercentage}>{prediction.probability}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Hormone Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hormone Level Forecast</Text>
          <View style={styles.hormoneChart}>
            <Svg width="100%" height={200} viewBox="0 0 350 200">
              {/* Estrogen line */}
              <Path
                d={hormoneForecast.map((day, index) => {
                  const x = (index / (hormoneForecast.length - 1)) * 300 + 25;
                  const y = 180 - (day.estrogen / 100) * 150;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                stroke={colors.reproductive.uterus}
                strokeWidth="3"
                fill="none"
              />
              
              {/* Progesterone line */}
              <Path
                d={hormoneForecast.map((day, index) => {
                  const x = (index / (hormoneForecast.length - 1)) * 300 + 25;
                  const y = 180 - (day.progesterone / 100) * 150;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                stroke={colors.reproductive.ovaries}
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </Svg>
          </View>
          
          <View style={styles.hormoneLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: colors.reproductive.uterus }]} />
              <Text style={styles.legendText}>Estrogen</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: colors.reproductive.ovaries, height: 2 }]} />
              <Text style={styles.legendText}>Progesterone</Text>
            </View>
          </View>
        </View>

        {/* Health Risk Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Risk Assessment</Text>
          {healthRisks.map((risk, index) => (
            <View key={index} style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <View style={styles.riskIcon}>
                  {getRiskIcon(risk.probability)}
                </View>
                <View style={styles.riskInfo}>
                  <Text style={styles.riskCondition}>{risk.condition}</Text>
                  <Text style={styles.riskTimeframe}>Risk timeframe: {risk.timeframe}</Text>
                </View>
                <View style={styles.riskProbability}>
                  <Text style={[
                    styles.riskPercentage,
                    { color: getRiskColor(risk.probability) }
                  ]}>
                    {risk.probability}%
                  </Text>
                  <Text style={styles.riskLabel}>probability</Text>
                </View>
              </View>

              <View style={styles.riskFactors}>
                <Text style={styles.riskFactorsTitle}>Risk Factors:</Text>
                {risk.riskFactors.map((factor, idx) => (
                  <View key={idx} style={styles.riskFactorItem}>
                    <View style={styles.riskFactorDot} />
                    <Text style={styles.riskFactorText}>{factor}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.preventionSteps}>
                <Text style={styles.preventionTitle}>Prevention Steps:</Text>
                {risk.preventionSteps.map((step, idx) => (
                  <View key={idx} style={styles.preventionItem}>
                    <CheckCircle size={16} color={colors.semantic.healing} />
                    <Text style={styles.preventionText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {healthRisks.length === 0 && (
            <View style={styles.noRisksCard}>
              <CheckCircle size={48} color={colors.semantic.balanced} />
              <Text style={styles.noRisksTitle}>Low Risk Profile</Text>
              <Text style={styles.noRisksText}>
                Your current health patterns don't indicate significant risks. 
                Continue your wellness routine for optimal health.
              </Text>
            </View>
          )}
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
  timeframeContainer: {
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
  timeframeLabel: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  timeframeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  timeframeButton: {
    flex: 1,
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.nude.border,
  },
  timeframeButtonActive: {
    backgroundColor: colors.nude.text,
    borderColor: colors.nude.text,
  },
  timeframeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  timeframeTextActive: {
    color: colors.nude.background,
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
  fertilityChart: {
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
  fertilityInsights: {
    gap: spacing.sm,
  },
  fertilityDay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fertilityDate: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    width: 60,
  },
  fertilityBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.nude.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fertilityBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  fertilityPercentage: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    width: 40,
    textAlign: 'right',
  },
  hormoneChart: {
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
  hormoneLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginRight: spacing.xs,
  },
  legendText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  riskCard: {
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
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  riskIcon: {
    marginRight: spacing.sm,
  },
  riskInfo: {
    flex: 1,
  },
  riskCondition: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  riskTimeframe: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  riskProbability: {
    alignItems: 'center',
  },
  riskPercentage: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
  },
  riskLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  riskFactors: {
    marginBottom: spacing.md,
  },
  riskFactorsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  riskFactorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  riskFactorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.rising,
    marginRight: spacing.sm,
  },
  riskFactorText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    flex: 1,
  },
  preventionSteps: {
    marginBottom: spacing.sm,
  },
  preventionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  preventionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  noRisksCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noRisksTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  noRisksText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
