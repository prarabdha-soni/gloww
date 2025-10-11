import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Sparkles, Sun, Moon, Zap, Coffee, Flower, Droplets, Wind } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface DailyGlowwCardProps {
  cyclePhase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  lastMood: string;
  sleepQuality: number;
  stressLevel: number;
  onReaction: (reaction: string) => void;
  onActionSelect: (action: string) => void;
}

const bodyStories = {
  menstrual: [
    "Your uterus is releasing and renewing 🌸 — honor this natural cleansing with gentle movement and extra rest.",
    "Your body is doing important work today 💫 — focus on iron-rich foods and warm beverages.",
    "Your uterus is healing and preparing for renewal 🌱 — take it easy and listen to your body's needs."
  ],
  follicular: [
    "Your estrogen is rising beautifully ✨ — perfect time for energizing activities and fresh foods.",
    "Your ovaries are preparing for ovulation 🌸 — gentle exercise and hydration will support this process.",
    "Your hormones are balancing and building energy 💫 — great time for new projects and social connections."
  ],
  ovulation: [
    "Your estrogen is peaking — great time for skin glow and confidence ✨",
    "Your ovaries are at their most active 🌸 — perfect for important conversations and decisions.",
    "Your fertility energy is at its peak 💫 — embrace your natural radiance and strength."
  ],
  luteal: [
    "Your progesterone is rising 🌙 — focus on grounding activities and nourishing foods.",
    "Your body is preparing for either pregnancy or renewal 🌸 — prioritize rest and self-care.",
    "Your hormones are shifting into rest mode 💫 — gentle movement and stress reduction will help."
  ]
};

const wellnessActions = [
  { id: 'walk', label: 'Take a Walk', icon: <Wind size={20} color={colors.reproductive.ovaries} />, color: colors.reproductive.ovaries },
  { id: 'meditate', label: 'Meditate', icon: <Moon size={20} color={colors.reproductive.uterus} />, color: colors.reproductive.uterus },
  { id: 'hydrate', label: 'Hydrate', icon: <Droplets size={20} color={colors.reproductive.thyroid} />, color: colors.reproductive.thyroid },
  { id: 'rest', label: 'Rest', icon: <Coffee size={20} color={colors.reproductive.stress} />, color: colors.reproductive.stress },
  { id: 'stretch', label: 'Stretch', icon: <Flower size={20} color={colors.semantic.healing} />, color: colors.semantic.healing },
  { id: 'breathe', label: 'Breathe', icon: <Zap size={20} color={colors.semantic.balanced} />, color: colors.semantic.balanced },
];

const reactions = [
  { id: 'loved', emoji: '💗', label: 'Felt Good' },
  { id: 'okay', emoji: '😐', label: 'Okay' },
  { id: 'struggled', emoji: '😣', label: 'Not Great' },
];

export default function DailyGlowwCard({ 
  cyclePhase, 
  lastMood, 
  sleepQuality, 
  stressLevel, 
  onReaction, 
  onActionSelect 
}: DailyGlowwCardProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [bodyStory, setBodyStory] = useState('');

  useEffect(() => {
    // Generate personalized body story based on cycle phase and user data
    const stories = bodyStories[cyclePhase];
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    setBodyStory(randomStory);
  }, [cyclePhase]);

  const handleReaction = (reactionId: string) => {
    setSelectedReaction(reactionId);
    onReaction(reactionId);
  };

  const handleActionToggle = (actionId: string) => {
    const newActions = selectedActions.includes(actionId)
      ? selectedActions.filter(id => id !== actionId)
      : [...selectedActions, actionId];
    setSelectedActions(newActions);
    onActionSelect(actionId);
  };

  const getCyclePhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'menstrual': return '🌸';
      case 'follicular': return '🌱';
      case 'ovulation': return '✨';
      case 'luteal': return '🌙';
      default: return '💫';
    }
  };

  const getCyclePhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual': return colors.reproductive.uterus;
      case 'follicular': return colors.reproductive.ovaries;
      case 'ovulation': return colors.nude.roseGold;
      case 'luteal': return colors.reproductive.thyroid;
      default: return colors.semantic.healing;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.phaseIndicator}>
            <Text style={styles.phaseEmoji}>{getCyclePhaseEmoji(cyclePhase)}</Text>
            <Text style={styles.phaseText}>{cyclePhase.charAt(0).toUpperCase() + cyclePhase.slice(1)} Phase</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Today's Gloww</Text>
          </View>
        </View>

        <View style={styles.bodyStoryContainer}>
          <Text style={styles.bodyStory}>{bodyStory}</Text>
        </View>

        <View style={styles.reactionsContainer}>
          <Text style={styles.reactionsTitle}>How does this feel?</Text>
          <View style={styles.reactionsRow}>
            {reactions.map((reaction) => (
              <TouchableOpacity
                key={reaction.id}
                style={[
                  styles.reactionButton,
                  selectedReaction === reaction.id && styles.selectedReaction
                ]}
                onPress={() => handleReaction(reaction.id)}
              >
                <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                <Text style={[
                  styles.reactionLabel,
                  selectedReaction === reaction.id && styles.selectedReactionLabel
                ]}>
                  {reaction.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Wellness Actions</Text>
          <Text style={styles.actionsSubtitle}>Tap to add to your day</Text>
          <View style={styles.actionsGrid}>
            {wellnessActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionButton,
                  { borderColor: action.color },
                  selectedActions.includes(action.id) && styles.selectedAction,
                  selectedActions.includes(action.id) && { backgroundColor: action.color + '20' }
                ]}
                onPress={() => handleActionToggle(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  {action.icon}
                </View>
                <Text style={[
                  styles.actionLabel,
                  selectedActions.includes(action.id) && styles.selectedActionLabel
                ]}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedActions.length > 0 && (
          <View style={styles.selectedActionsContainer}>
            <Text style={styles.selectedActionsTitle}>Your Wellness Plan</Text>
            <View style={styles.selectedActionsList}>
              {selectedActions.map((actionId) => {
                const action = wellnessActions.find(a => a.id === actionId);
                return (
                  <View key={actionId} style={styles.selectedActionItem}>
                    <View style={[styles.selectedActionIcon, { backgroundColor: action?.color }]}>
                      {action?.icon}
                    </View>
                    <Text style={styles.selectedActionText}>{action?.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>
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
  card: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    margin: spacing.lg,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  phaseIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  phaseEmoji: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  phaseText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  bodyStoryContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  bodyStory: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    lineHeight: 26,
    textAlign: 'center',
  },
  reactionsContainer: {
    marginBottom: spacing.lg,
  },
  reactionsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reactionButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    minWidth: 80,
  },
  selectedReaction: {
    backgroundColor: colors.nude.peach,
  },
  reactionEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  reactionLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    textAlign: 'center',
  },
  selectedReactionLabel: {
    color: colors.nude.text,
    fontFamily: typography.fontFamily.semibold,
  },
  actionsContainer: {
    marginBottom: spacing.lg,
  },
  actionsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  actionsSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAction: {
    borderColor: colors.nude.roseGold,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    textAlign: 'center',
  },
  selectedActionLabel: {
    color: colors.nude.text,
    fontFamily: typography.fontFamily.semibold,
  },
  selectedActionsContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  selectedActionsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  selectedActionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectedActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  selectedActionIcon: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedActionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
});
