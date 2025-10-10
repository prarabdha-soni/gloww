import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  AlertTriangle, 
  CheckCircle, 
  Heart, 
  Brain, 
  Zap,
  Calendar,
  Activity,
  Phone
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Symptom {
  id: string;
  name: string;
  category: 'cycle' | 'hormone' | 'physical' | 'emotional' | 'energy';
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
}

interface Prediction {
  condition: string;
  confidence: number;
  description: string;
  symptoms: string[];
  severity: 'low' | 'moderate' | 'high';
  suggestedActions: string[];
  expertRecommendation: boolean;
}

interface PredictionEngineProps {
  symptoms: Symptom[];
  onConnectExpert: () => void;
}

export default function PredictionEngine({ symptoms, onConnectExpert }: PredictionEngineProps) {
  
  // AI-like prediction logic based on symptom patterns
  const analyzeSymptoms = (symptoms: Symptom[]): Prediction[] => {
    const predictions: Prediction[] = [];
    
    // PCOS Detection
    const pcosSymptoms = symptoms.filter(s => 
      ['irregular_periods', 'excess_hair', 'weight_gain', 'acne_breakouts', 'hair_loss'].includes(s.id)
    );
    if (pcosSymptoms.length >= 3) {
      predictions.push({
        condition: 'Polycystic Ovary Syndrome (PCOS)',
        confidence: Math.min(85, 60 + (pcosSymptoms.length * 8)),
        description: 'PCOS is a hormonal disorder affecting women of reproductive age. It can cause irregular periods, excess androgen levels, and polycystic ovaries.',
        symptoms: pcosSymptoms.map(s => s.name),
        severity: pcosSymptoms.length >= 4 ? 'high' : 'moderate',
        suggestedActions: [
          'Track your menstrual cycle patterns',
          'Book a comprehensive hormone panel',
          'Consider lifestyle modifications',
          'Consult with an endocrinologist'
        ],
        expertRecommendation: true
      });
    }

    // Thyroid Imbalance Detection
    const thyroidSymptoms = symptoms.filter(s => 
      ['fatigue', 'weight_gain', 'hair_loss', 'brain_fog', 'sleep_issues', 'low_energy'].includes(s.id)
    );
    if (thyroidSymptoms.length >= 3) {
      predictions.push({
        condition: 'Thyroid Hormone Imbalance',
        confidence: Math.min(80, 50 + (thyroidSymptoms.length * 7)),
        description: 'Thyroid dysfunction can cause a wide range of symptoms affecting metabolism, energy, and reproductive health.',
        symptoms: thyroidSymptoms.map(s => s.name),
        severity: thyroidSymptoms.length >= 4 ? 'high' : 'moderate',
        suggestedActions: [
          'Track your energy levels',
          'Book a thyroid test',
          'Monitor your sleep patterns',
          'Consider thyroid function testing'
        ],
        expertRecommendation: true
      });
    }

    // Hormonal Imbalance Detection
    const hormoneSymptoms = symptoms.filter(s => 
      ['mood_swings', 'irregular_periods', 'acne_breakouts', 'breast_tenderness', 'bloating'].includes(s.id)
    );
    if (hormoneSymptoms.length >= 3) {
      predictions.push({
        condition: 'Hormonal Imbalance',
        confidence: Math.min(75, 45 + (hormoneSymptoms.length * 6)),
        description: 'Hormonal imbalances can affect your menstrual cycle, mood, and overall reproductive health.',
        symptoms: hormoneSymptoms.map(s => s.name),
        severity: hormoneSymptoms.length >= 4 ? 'high' : 'moderate',
        suggestedActions: [
          'Track your menstrual cycle',
          'Monitor mood patterns',
          'Consider hormone testing',
          'Lifestyle modifications'
        ],
        expertRecommendation: true
      });
    }

    // Stress-Related Issues
    const stressSymptoms = symptoms.filter(s => 
      ['anxiety', 'depression', 'irritability', 'sleep_issues', 'fatigue'].includes(s.id)
    );
    if (stressSymptoms.length >= 3) {
      predictions.push({
        condition: 'Stress-Related Hormonal Disruption',
        confidence: Math.min(70, 40 + (stressSymptoms.length * 6)),
        description: 'Chronic stress can significantly impact your hormonal balance and reproductive health.',
        symptoms: stressSymptoms.map(s => s.name),
        severity: stressSymptoms.length >= 4 ? 'high' : 'moderate',
        suggestedActions: [
          'Practice stress management techniques',
          'Improve sleep hygiene',
          'Consider meditation or yoga',
          'Track stress triggers'
        ],
        expertRecommendation: false
      });
    }

    // Endometriosis Detection
    const endoSymptoms = symptoms.filter(s => 
      ['painful_periods', 'pelvic_pain', 'heavy_bleeding', 'bloating'].includes(s.id)
    );
    if (endoSymptoms.length >= 2) {
      predictions.push({
        condition: 'Possible Endometriosis',
        confidence: Math.min(65, 35 + (endoSymptoms.length * 8)),
        description: 'Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus.',
        symptoms: endoSymptoms.map(s => s.name),
        severity: endoSymptoms.length >= 3 ? 'high' : 'moderate',
        suggestedActions: [
          'Track pain patterns',
          'Document symptom severity',
          'Consult with a gynecologist',
          'Consider imaging studies'
        ],
        expertRecommendation: true
      });
    }

    return predictions.sort((a, b) => b.confidence - a.confidence);
  };

  const predictions = analyzeSymptoms(symptoms);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return colors.semantic.error;
      case 'moderate': return colors.semantic.rising;
      case 'low': return colors.semantic.healing;
      default: return colors.nude.textSecondary;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={20} color={colors.semantic.error} />;
      case 'moderate': return <Zap size={20} color={colors.semantic.rising} />;
      case 'low': return <CheckCircle size={20} color={colors.semantic.healing} />;
      default: return <Activity size={20} color={colors.nude.textSecondary} />;
    }
  };

  if (predictions.length === 0) {
    return (
      <View style={styles.noPredictionContainer}>
        <CheckCircle size={48} color={colors.semantic.balanced} />
        <Text style={styles.noPredictionTitle}>No Major Concerns Detected</Text>
        <Text style={styles.noPredictionText}>
          Your symptoms don't indicate any major reproductive health concerns. 
          Continue tracking your symptoms for better insights.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediction Analysis</Text>
      
      {predictions.map((prediction, index) => (
        <View key={index} style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <View style={styles.predictionIcon}>
              {getSeverityIcon(prediction.severity)}
            </View>
            <View style={styles.predictionInfo}>
              <Text style={styles.conditionName}>{prediction.condition}</Text>
              <Text style={styles.confidenceText}>
                {prediction.confidence}% confidence
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{prediction.description}</Text>

          <View style={styles.symptomsSection}>
            <Text style={styles.sectionTitle}>Matching Symptoms:</Text>
            {prediction.symptoms.map((symptom, idx) => (
              <View key={idx} style={styles.symptomItem}>
                <View style={styles.symptomDot} />
                <Text style={styles.symptomText}>{symptom}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Suggested Actions:</Text>
            {prediction.suggestedActions.map((action, idx) => (
              <View key={idx} style={styles.actionItem}>
                <View style={styles.actionDot} />
                <Text style={styles.actionText}>{action}</Text>
              </View>
            ))}
          </View>

          {prediction.expertRecommendation && (
            <TouchableOpacity 
              style={styles.expertButton}
              onPress={onConnectExpert}
            >
              <Phone size={20} color={colors.nude.background} />
              <Text style={styles.expertButtonText}>Connect with an expert</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.lg,
  },
  predictionCard: {
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
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  predictionIcon: {
    marginRight: spacing.sm,
  },
  predictionInfo: {
    flex: 1,
  },
  conditionName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  confidenceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  symptomsSection: {
    marginBottom: spacing.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.nude.roseGold,
    marginRight: spacing.sm,
  },
  symptomText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    flex: 1,
  },
  actionsSection: {
    marginBottom: spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.healing,
    marginRight: spacing.sm,
  },
  actionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    flex: 1,
  },
  expertButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  expertButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
    marginLeft: spacing.sm,
  },
  noPredictionContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  noPredictionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  noPredictionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
