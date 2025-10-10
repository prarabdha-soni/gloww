import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { 
  Brain, 
  Heart, 
  Calendar, 
  Zap, 
  TrendingUp, 
  Target, 
  MessageCircle,
  Send,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface HealthInsight {
  id: string;
  type: 'pattern' | 'recommendation' | 'warning' | 'achievement';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  category: 'cycle' | 'hormone' | 'lifestyle' | 'nutrition' | 'stress';
}

interface PersonalizedRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'supplement' | 'lifestyle' | 'exercise' | 'nutrition' | 'medical';
  estimatedImpact: string;
  timeToImplement: string;
}

interface AIHealthCoachProps {
  userData: {
    symptoms: any[];
    cycleData: any[];
    moodData: any[];
    sleepData: any[];
    stressData: any[];
  };
  onRecommendationSelect: (recommendation: PersonalizedRecommendation) => void;
}

export default function AIHealthCoach({ userData, onRecommendationSelect }: AIHealthCoachProps) {
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    analyzeUserData();
  }, [userData]);

  const analyzeUserData = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newInsights = generateInsights(userData);
      const newRecommendations = generateRecommendations(userData);
      
      setInsights(newInsights);
      setRecommendations(newRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateInsights = (data: any): HealthInsight[] => {
    const insights: HealthInsight[] = [];

    // Cycle pattern analysis
    if (data.cycleData && data.cycleData.length > 0) {
      insights.push({
        id: 'cycle_regularity',
        type: 'pattern',
        title: 'Cycle Regularity Detected',
        description: 'Your menstrual cycle is showing improved regularity over the past 3 months.',
        confidence: 85,
        actionable: true,
        category: 'cycle'
      });
    }

    // Hormone balance insights
    if (data.symptoms && data.symptoms.some((s: any) => s.category === 'hormone')) {
      insights.push({
        id: 'hormone_imbalance',
        type: 'warning',
        title: 'Hormone Imbalance Pattern',
        description: 'Multiple hormone-related symptoms detected. Consider comprehensive hormone testing.',
        confidence: 78,
        actionable: true,
        category: 'hormone'
      });
    }

    // Stress correlation
    if (data.stressData && data.stressData.length > 0) {
      insights.push({
        id: 'stress_cycle_correlation',
        type: 'pattern',
        title: 'Stress-Cycle Correlation',
        description: 'High stress levels correlate with irregular cycles. Stress management could improve cycle regularity.',
        confidence: 72,
        actionable: true,
        category: 'stress'
      });
    }

    // Sleep quality impact
    if (data.sleepData && data.sleepData.length > 0) {
      insights.push({
        id: 'sleep_quality_impact',
        type: 'achievement',
        title: 'Sleep Quality Improvement',
        description: 'Your sleep quality has improved by 15% this month, supporting better hormone balance.',
        confidence: 90,
        actionable: false,
        category: 'lifestyle'
      });
    }

    return insights;
  };

  const generateRecommendations = (data: any): PersonalizedRecommendation[] => {
    const recommendations: PersonalizedRecommendation[] = [];

    // Supplement recommendations
    recommendations.push({
      id: 'magnesium_supplement',
      title: 'Magnesium Supplementation',
      description: 'Based on your stress patterns and sleep quality, magnesium could help regulate cortisol and improve sleep.',
      priority: 'high',
      category: 'supplement',
      estimatedImpact: '20-30% improvement in sleep quality',
      timeToImplement: '2-4 weeks'
    });

    // Lifestyle recommendations
    recommendations.push({
      id: 'stress_management',
      title: 'Daily Stress Management',
      description: 'Implement 10-minute meditation sessions to reduce cortisol levels and support hormone balance.',
      priority: 'high',
      category: 'lifestyle',
      estimatedImpact: '15-25% reduction in stress symptoms',
      timeToImplement: '1-2 weeks'
    });

    // Exercise recommendations
    recommendations.push({
      id: 'cycle_based_exercise',
      title: 'Cycle-Based Exercise Plan',
      description: 'Adjust your exercise intensity based on your menstrual cycle phases for optimal hormone support.',
      priority: 'medium',
      category: 'exercise',
      estimatedImpact: '10-20% improvement in energy levels',
      timeToImplement: '1 week'
    });

    // Nutrition recommendations
    recommendations.push({
      id: 'hormone_balancing_nutrition',
      title: 'Hormone-Balancing Nutrition',
      description: 'Increase omega-3 fatty acids and reduce processed foods to support estrogen metabolism.',
      priority: 'medium',
      category: 'nutrition',
      estimatedImpact: '15-25% improvement in hormone balance',
      timeToImplement: '2-3 weeks'
    });

    return recommendations;
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatInput,
        isUser: true,
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: "I understand your concern. Based on your recent symptoms, I recommend tracking your stress levels more closely and considering a magnesium supplement. Would you like me to create a personalized plan?",
          isUser: false,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp size={20} color={colors.semantic.healing} />;
      case 'recommendation': return <Lightbulb size={20} color={colors.nude.roseGold} />;
      case 'warning': return <AlertTriangle size={20} color={colors.semantic.rising} />;
      case 'achievement': return <CheckCircle size={20} color={colors.semantic.balanced} />;
      default: return <Brain size={20} color={colors.nude.textSecondary} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.semantic.error;
      case 'medium': return colors.semantic.rising;
      case 'low': return colors.semantic.healing;
      default: return colors.nude.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.coachHeader}>
          <Brain size={24} color={colors.nude.roseGold} />
          <View style={styles.coachInfo}>
            <Text style={styles.coachTitle}>Your AI Health Coach</Text>
            <Text style={styles.coachSubtitle}>
              {isAnalyzing ? 'Analyzing your health patterns...' : 'Personalized insights ready'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Health Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Insights</Text>
          {insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightIcon}>
                  {getInsightIcon(insight.type)}
                </View>
                <View style={styles.insightInfo}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightConfidence}>
                    {insight.confidence}% confidence
                  </Text>
                </View>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
            </View>
          ))}
        </View>

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          {recommendations.map((rec) => (
            <TouchableOpacity
              key={rec.id}
              style={styles.recommendationCard}
              onPress={() => onRecommendationSelect(rec)}
            >
              <View style={styles.recommendationHeader}>
                <View style={styles.recommendationIcon}>
                  <Target size={20} color={colors.nude.roseGold} />
                </View>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <View style={styles.recommendationMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(rec.priority) }]}>
                      <Text style={styles.priorityText}>{rec.priority}</Text>
                    </View>
                    <Text style={styles.impactText}>{rec.estimatedImpact}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
              <Text style={styles.timeToImplement}>Time to implement: {rec.timeToImplement}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chat Interface */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ask Your Coach</Text>
          <View style={styles.chatContainer}>
            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.aiMessage
                ]}
              >
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText
                ]}>
                  {message.text}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Ask about your health patterns..."
              placeholderTextColor={colors.nude.textSecondary}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendChatMessage}>
              <Send size={20} color={colors.nude.background} />
            </TouchableOpacity>
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
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachInfo: {
    marginLeft: spacing.md,
  },
  coachTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
  },
  coachSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  insightCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  insightIcon: {
    marginRight: spacing.sm,
  },
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  insightConfidence: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.xs,
  },
  insightDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recommendationIcon: {
    marginRight: spacing.sm,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.background,
    textTransform: 'uppercase',
  },
  impactText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  recommendationDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  timeToImplement: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  chatContainer: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    minHeight: 200,
    maxHeight: 300,
  },
  messageContainer: {
    marginBottom: spacing.sm,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    lineHeight: 20,
    maxWidth: '80%',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  userMessageText: {
    backgroundColor: colors.nude.roseGold,
    color: colors.nude.background,
  },
  aiMessageText: {
    backgroundColor: colors.nude.border,
    color: colors.nude.text,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chatInput: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});
