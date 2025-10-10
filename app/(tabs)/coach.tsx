import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import AIHealthCoach from '@/components/AIHealthCoach';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
}

export default function CoachScreen() {
  const router = useRouter();
  const [showAI, setShowAI] = useState(false);

  const handleAIAction = (action: string) => {
    console.log('AI Action:', action);
    // Handle AI actions like booking consultations, viewing insights, etc.
  };

  const handleChatMessage = (message: string) => {
    console.log('Chat message:', message);
    // Handle chat messages
  };

  if (showAI) {
    return (
      <AIHealthCoach 
        onAction={handleAIAction}
        onChatMessage={handleChatMessage}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Gloww Assistant</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.assistantAvatar}>
          <View style={styles.avatarGlow}>
            <Sparkles size={32} color={colors.nude.roseGold} />
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome to Your AI Health Coach</Text>
          <Text style={styles.welcomeText}>
            Get personalized insights, track your reproductive health, and receive expert recommendations.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>What I can help you with:</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Track symptoms and patterns</Text>
            <Text style={styles.featureItem}>• Predict fertility windows</Text>
            <Text style={styles.featureItem}>• Recommend supplements</Text>
            <Text style={styles.featureItem}>• Connect with specialists</Text>
            <Text style={styles.featureItem}>• Analyze lab results</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => setShowAI(true)}
        >
          <Sparkles size={20} color={colors.nude.background} />
          <Text style={styles.startButtonText}>Start AI Coaching</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    backgroundColor: colors.nude.background,
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  assistantAvatar: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarGlow: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  messageBubble: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  aiBubble: {
    backgroundColor: colors.nude.card,
    alignSelf: 'flex-start',
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: colors.nude.peach,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    lineHeight: 22,
  },
  aiText: {
    color: colors.nude.text,
  },
  userText: {
    color: colors.nude.text,
  },
  upgradeCard: {
    backgroundColor: colors.nude.blush,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  upgradeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  upgradeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  upgradeButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  upgradeButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.background,
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.nude.background,
    borderTopWidth: 1,
    borderTopColor: colors.nude.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  welcomeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  welcomeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
  },
  featureCard: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  featureTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  featureList: {
    gap: spacing.sm,
  },
  featureItem: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  startButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.background,
  },
});
