import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Flower, Leaf, Waves, Target, CheckCircle, Star, Zap } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface MicroChallengesProps {
  organHealth: {
    uterus: { status: string; progress: number };
    ovaries: { status: string; progress: number };
    thyroid: { status: string; progress: number };
    stress: { status: string; progress: number };
  };
  onChallengeComplete: (challengeId: string, points: number) => void;
}

const organChallenges = {
  uterus: {
    name: 'Uterus',
    emoji: '🩷',
    color: colors.reproductive.uterus,
    challenges: [
      {
        id: 'sugar-free-3',
        title: 'Sugar-Free Streak',
        description: 'Avoid processed sugar for 3 days',
        duration: '3 days',
        points: 50,
        icon: <Heart size={20} color={colors.reproductive.uterus} />,
        tips: ['Choose natural sweeteners like honey', 'Read labels carefully', 'Stock up on fresh fruits']
      },
      {
        id: 'warm-beverages',
        title: 'Warm Comfort',
        description: 'Drink warm beverages for 2 days',
        duration: '2 days',
        points: 30,
        icon: <Heart size={20} color={colors.reproductive.uterus} />,
        tips: ['Herbal teas are perfect', 'Warm water with lemon', 'Avoid ice-cold drinks']
      },
      {
        id: 'gentle-movement',
        title: 'Gentle Flow',
        description: 'Do 10 minutes of gentle stretching',
        duration: '1 day',
        points: 20,
        icon: <Heart size={20} color={colors.reproductive.uterus} />,
        tips: ['Yoga poses like child\'s pose', 'Slow, mindful movements', 'Listen to your body']
      }
    ]
  },
  ovaries: {
    name: 'Ovaries',
    emoji: '🌼',
    color: colors.reproductive.ovaries,
    challenges: [
      {
        id: 'sleep-8-hours',
        title: 'Restful Nights',
        description: 'Sleep 8 hours for 2 nights',
        duration: '2 days',
        points: 40,
        icon: <Flower size={20} color={colors.reproductive.ovaries} />,
        tips: ['Create a bedtime routine', 'Avoid screens 1 hour before bed', 'Keep room cool and dark']
      },
      {
        id: 'hormone-balancing',
        title: 'Hormone Harmony',
        description: 'Eat 3 servings of leafy greens',
        duration: '1 day',
        points: 25,
        icon: <Flower size={20} color={colors.reproductive.ovaries} />,
        tips: ['Spinach, kale, arugula', 'Add to smoothies', 'Include in salads']
      },
      {
        id: 'ovulation-support',
        title: 'Ovulation Boost',
        description: 'Take a 15-minute walk in nature',
        duration: '1 day',
        points: 20,
        icon: <Flower size={20} color={colors.reproductive.ovaries} />,
        tips: ['Morning walks are ideal', 'Breathe fresh air', 'Connect with nature']
      }
    ]
  },
  thyroid: {
    name: 'Thyroid',
    emoji: '💪',
    color: colors.reproductive.thyroid,
    challenges: [
      {
        id: 'metabolism-boost',
        title: 'Metabolism Boost',
        description: 'Do 10 minutes of brisk walking',
        duration: '1 day',
        points: 20,
        icon: <Leaf size={20} color={colors.reproductive.thyroid} />,
        tips: ['Morning walks are best', 'Maintain steady pace', 'Focus on breathing']
      },
      {
        id: 'thyroid-nutrition',
        title: 'Thyroid Nutrition',
        description: 'Include iodine-rich foods',
        duration: '1 day',
        points: 25,
        icon: <Leaf size={20} color={colors.reproductive.thyroid} />,
        tips: ['Seaweed, fish, eggs', 'Brazil nuts for selenium', 'Avoid processed foods']
      },
      {
        id: 'energy-management',
        title: 'Energy Balance',
        description: 'Take 3 short breaks during work',
        duration: '1 day',
        points: 15,
        icon: <Leaf size={20} color={colors.reproductive.thyroid} />,
        tips: ['5-minute breaks every 2 hours', 'Stretch or walk', 'Deep breathing exercises']
      }
    ]
  },
  stress: {
    name: 'Stress',
    emoji: '🌊',
    color: colors.reproductive.stress,
    challenges: [
      {
        id: 'breathing-practice',
        title: 'Calm Breathing',
        description: 'Practice 5 minutes of deep breathing',
        duration: '1 day',
        points: 20,
        icon: <Waves size={20} color={colors.reproductive.stress} />,
        tips: ['4-7-8 breathing technique', 'Find a quiet space', 'Focus on your breath']
      },
      {
        id: 'stress-reduction',
        title: 'Stress Relief',
        description: 'Avoid caffeine for 1 day',
        duration: '1 day',
        points: 30,
        icon: <Waves size={20} color={colors.reproductive.stress} />,
        tips: ['Try herbal teas instead', 'Stay hydrated', 'Get enough sleep']
      },
      {
        id: 'mindfulness-moment',
        title: 'Mindfulness',
        description: 'Take 3 mindful moments today',
        duration: '1 day',
        points: 25,
        icon: <Waves size={20} color={colors.reproductive.stress} />,
        tips: ['Pause and breathe', 'Notice your surroundings', 'Be present in the moment']
      }
    ]
  }
};

export default function MicroChallenges({ organHealth, onChallengeComplete }: MicroChallengesProps) {
  const [activeChallenges, setActiveChallenges] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const getRecommendedChallenges = () => {
    const recommendations = [];
    
    Object.keys(organHealth).forEach(organ => {
      const health = organHealth[organ as keyof typeof organHealth];
      const organData = organChallenges[organ as keyof typeof organChallenges];
      
      if (health.progress < 75) {
        // Recommend challenges for organs that need attention
        const availableChallenges = organData.challenges.filter(
          challenge => !activeChallenges.includes(challenge.id) && 
                     !completedChallenges.includes(challenge.id)
        );
        
        if (availableChallenges.length > 0) {
          recommendations.push({
            organ,
            challenge: availableChallenges[0],
            priority: health.progress < 50 ? 'high' : 'medium'
          });
        }
      }
    });
    
    return recommendations.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (b.priority === 'high' && a.priority !== 'high') return 1;
      return 0;
    });
  };

  const handleStartChallenge = (challengeId: string) => {
    setActiveChallenges(prev => [...prev, challengeId]);
  };

  const handleCompleteChallenge = (challengeId: string, points: number) => {
    setActiveChallenges(prev => prev.filter(id => id !== challengeId));
    setCompletedChallenges(prev => [...prev, challengeId]);
    setTotalPoints(prev => prev + points);
    onChallengeComplete(challengeId, points);
  };

  const getChallengeById = (challengeId: string) => {
    for (const organ of Object.values(organChallenges)) {
      const challenge = organ.challenges.find(c => c.id === challengeId);
      if (challenge) return { ...challenge, organ: organ.name, organColor: organ.color };
    }
    return null;
  };

  const recommendations = getRecommendedChallenges();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Gloww Challenges</Text>
        <Text style={styles.subtitle}>Micro-tasks to boost your wellness</Text>
        <View style={styles.pointsContainer}>
          <Star size={20} color={colors.nude.roseGold} />
          <Text style={styles.pointsText}>{totalPoints} Gloww Points</Text>
        </View>
      </View>

      {activeChallenges.length > 0 && (
        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          {activeChallenges.map(challengeId => {
            const challenge = getChallengeById(challengeId);
            if (!challenge) return null;
            
            return (
              <View key={challengeId} style={styles.activeChallengeCard}>
                <View style={styles.challengeHeader}>
                  <View style={[styles.challengeIcon, { backgroundColor: challenge.organColor + '20' }]}>
                    {challenge.icon}
                  </View>
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  </View>
                  <View style={styles.challengePoints}>
                    <Text style={styles.pointsLabel}>+{challenge.points}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleCompleteChallenge(challengeId, challenge.points)}
                >
                  <CheckCircle size={20} color={colors.nude.background} />
                  <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.recommendedSection}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {recommendations.map((rec, index) => {
          const challenge = rec.challenge;
          const organData = organChallenges[rec.organ as keyof typeof organChallenges];
          
          return (
            <View key={challenge.id} style={styles.recommendedCard}>
              <View style={styles.recommendedHeader}>
                <View style={[styles.recommendedIcon, { backgroundColor: organData.color + '20' }]}>
                  {challenge.icon}
                </View>
                <View style={styles.recommendedInfo}>
                  <View style={styles.recommendedTitleRow}>
                    <Text style={styles.recommendedTitle}>{challenge.title}</Text>
                    {rec.priority === 'high' && (
                      <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>Priority</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.recommendedDescription}>{challenge.description}</Text>
                  <Text style={styles.recommendedDuration}>{challenge.duration}</Text>
                </View>
                <View style={styles.recommendedPoints}>
                  <Text style={styles.recommendedPointsText}>+{challenge.points}</Text>
                </View>
              </View>
              
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Tips:</Text>
                {challenge.tips.map((tip, tipIndex) => (
                  <Text key={tipIndex} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
              
              <TouchableOpacity
                style={[styles.startButton, { backgroundColor: organData.color }]}
                onPress={() => handleStartChallenge(challenge.id)}
              >
                <Target size={20} color={colors.nude.background} />
                <Text style={styles.startButtonText}>Start Challenge</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {completedChallenges.length > 0 && (
        <View style={styles.completedSection}>
          <Text style={styles.sectionTitle}>Completed Challenges</Text>
          <View style={styles.completedStats}>
            <View style={styles.completedStat}>
              <CheckCircle size={24} color={colors.semantic.balanced} />
              <Text style={styles.completedStatText}>{completedChallenges.length} Completed</Text>
            </View>
            <View style={styles.completedStat}>
              <Star size={24} color={colors.nude.roseGold} />
              <Text style={styles.completedStatText}>{totalPoints} Points Earned</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.nude.background,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  pointsText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  activeSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  activeChallengeCard: {
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
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  challengeDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  challengePoints: {
    alignItems: 'flex-end',
  },
  pointsLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.roseGold,
  },
  completeButton: {
    backgroundColor: colors.semantic.balanced,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  completeButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  recommendedSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  recommendedCard: {
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
  recommendedHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  recommendedIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recommendedInfo: {
    flex: 1,
  },
  recommendedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recommendedTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    flex: 1,
  },
  priorityBadge: {
    backgroundColor: colors.semantic.error,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  priorityText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.background,
  },
  recommendedDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  recommendedDuration: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  recommendedPoints: {
    alignItems: 'flex-end',
  },
  recommendedPointsText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.roseGold,
  },
  tipsContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  tipsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 18,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  startButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  completedSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  completedStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  completedStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  completedStatText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
});
