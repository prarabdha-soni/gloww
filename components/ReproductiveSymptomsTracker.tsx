import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Heart, 
  Calendar, 
  AlertTriangle, 
  Zap, 
  Moon, 
  Brain, 
  Activity,
  ChevronRight,
  CheckCircle
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Symptom {
  id: string;
  name: string;
  category: 'cycle' | 'hormone' | 'physical' | 'emotional' | 'energy';
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
  icon: React.ReactNode;
}

interface ReproductiveSymptomsTrackerProps {
  onSymptomsChange: (symptoms: Symptom[]) => void;
  onPredict: () => void;
}

export default function ReproductiveSymptomsTracker({ 
  onSymptomsChange, 
  onPredict 
}: ReproductiveSymptomsTrackerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);

  const reproductiveSymptoms: Symptom[] = [
    // Cycle-related symptoms
    {
      id: 'irregular_periods',
      name: 'Irregular periods',
      category: 'cycle',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Calendar size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'heavy_bleeding',
      name: 'Heavy menstrual bleeding',
      category: 'cycle',
      severity: 'severe',
      frequency: 'frequent',
      icon: <Heart size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'missed_periods',
      name: 'Missed periods',
      category: 'cycle',
      severity: 'moderate',
      frequency: 'occasional',
      icon: <AlertTriangle size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'painful_periods',
      name: 'Painful periods (dysmenorrhea)',
      category: 'cycle',
      severity: 'severe',
      frequency: 'frequent',
      icon: <Activity size={20} color={colors.reproductive.uterus} />
    },

    // Hormone-related symptoms
    {
      id: 'acne_breakouts',
      name: 'Acne breakouts',
      category: 'hormone',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Zap size={20} color={colors.reproductive.thyroid} />
    },
    {
      id: 'hair_loss',
      name: 'Hair loss or thinning',
      category: 'hormone',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Brain size={20} color={colors.reproductive.thyroid} />
    },
    {
      id: 'excess_hair',
      name: 'Excess facial/body hair',
      category: 'hormone',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Activity size={20} color={colors.reproductive.thyroid} />
    },
    {
      id: 'weight_gain',
      name: 'Unexplained weight gain',
      category: 'hormone',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Heart size={20} color={colors.reproductive.thyroid} />
    },

    // Physical symptoms
    {
      id: 'pelvic_pain',
      name: 'Pelvic pain',
      category: 'physical',
      severity: 'severe',
      frequency: 'frequent',
      icon: <Heart size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'breast_tenderness',
      name: 'Breast tenderness',
      category: 'physical',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Heart size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'bloating',
      name: 'Bloating',
      category: 'physical',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Activity size={20} color={colors.reproductive.uterus} />
    },
    {
      id: 'fatigue',
      name: 'Chronic fatigue',
      category: 'physical',
      severity: 'severe',
      frequency: 'constant',
      icon: <Moon size={20} color={colors.reproductive.stress} />
    },

    // Emotional symptoms
    {
      id: 'mood_swings',
      name: 'Mood swings',
      category: 'emotional',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Brain size={20} color={colors.reproductive.stress} />
    },
    {
      id: 'anxiety',
      name: 'Anxiety',
      category: 'emotional',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <AlertTriangle size={20} color={colors.reproductive.stress} />
    },
    {
      id: 'depression',
      name: 'Depression',
      category: 'emotional',
      severity: 'severe',
      frequency: 'frequent',
      icon: <Moon size={20} color={colors.reproductive.stress} />
    },
    {
      id: 'irritability',
      name: 'Irritability',
      category: 'emotional',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Zap size={20} color={colors.reproductive.stress} />
    },

    // Energy-related symptoms
    {
      id: 'low_energy',
      name: 'Low energy levels',
      category: 'energy',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Zap size={20} color={colors.reproductive.thyroid} />
    },
    {
      id: 'sleep_issues',
      name: 'Sleep disturbances',
      category: 'energy',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Moon size={20} color={colors.reproductive.stress} />
    },
    {
      id: 'brain_fog',
      name: 'Brain fog',
      category: 'energy',
      severity: 'moderate',
      frequency: 'frequent',
      icon: <Brain size={20} color={colors.reproductive.thyroid} />
    }
  ];

  const toggleSymptom = (symptom: Symptom) => {
    const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
    let newSelectedSymptoms;
    
    if (isSelected) {
      newSelectedSymptoms = selectedSymptoms.filter(s => s.id !== symptom.id);
    } else {
      newSelectedSymptoms = [...selectedSymptoms, symptom];
    }
    
    setSelectedSymptoms(newSelectedSymptoms);
    onSymptomsChange(newSelectedSymptoms);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cycle': return colors.reproductive.uterus;
      case 'hormone': return colors.reproductive.thyroid;
      case 'physical': return colors.reproductive.ovaries;
      case 'emotional': return colors.reproductive.stress;
      case 'energy': return colors.semantic.healing;
      default: return colors.nude.textSecondary;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'cycle': return 'Cycle';
      case 'hormone': return 'Hormones';
      case 'physical': return 'Physical';
      case 'emotional': return 'Emotional';
      case 'energy': return 'Energy';
      default: return 'Other';
    }
  };

  const groupedSymptoms = reproductiveSymptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, Symptom[]>);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Your Symptoms</Text>
        <Text style={styles.subtitle}>
          Select symptoms you're experiencing to get personalized insights
        </Text>
      </View>

      <View style={styles.content}>
        {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(category) }]}>
                {symptoms[0].icon}
              </View>
              <Text style={styles.categoryTitle}>{getCategoryName(category)}</Text>
            </View>
            
            <View style={styles.symptomsGrid}>
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
                return (
                  <TouchableOpacity
                    key={symptom.id}
                    style={[
                      styles.symptomCard,
                      isSelected && styles.symptomCardSelected
                    ]}
                    onPress={() => toggleSymptom(symptom)}
                  >
                    <View style={styles.symptomHeader}>
                      {symptom.icon}
                      {isSelected && (
                        <CheckCircle 
                          size={16} 
                          color={colors.semantic.balanced} 
                          style={styles.checkIcon}
                        />
                      )}
                    </View>
                    <Text style={[
                      styles.symptomName,
                      isSelected && styles.symptomNameSelected
                    ]}>
                      {symptom.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {selectedSymptoms.length > 0 && (
          <TouchableOpacity style={styles.predictButton} onPress={onPredict}>
            <Text style={styles.predictButtonText}>
              Analyze Symptoms ({selectedSymptoms.length})
            </Text>
            <ChevronRight size={20} color={colors.nude.background} />
          </TouchableOpacity>
        )}
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
    paddingBottom: spacing.xl,
  },
  categorySection: {
    marginBottom: spacing.xl,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  symptomCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  symptomCardSelected: {
    borderColor: colors.nude.roseGold,
    backgroundColor: colors.nude.peach,
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  symptomName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  symptomNameSelected: {
    color: colors.nude.text,
    fontFamily: typography.fontFamily.semibold,
  },
  predictButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  predictButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
    marginRight: spacing.sm,
  },
});
