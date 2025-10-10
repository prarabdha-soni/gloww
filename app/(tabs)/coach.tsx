import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
}

export default function CoachScreen() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      text: "I've noticed your estrogens has been low for the past two weeks. Consider more plant based foods and sun exposure.",
      isAI: true,
    },
    {
      id: 2,
      text: "Should I try a supplement?",
      isAI: false,
    },
    {
      id: 3,
      text: "Yes: a supplement can help. I will generate a recommendation",
      isAI: true,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isAI ? styles.aiBubble : styles.userBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isAI ? styles.aiText : styles.userText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}

        <View style={styles.upgradeCard}>
          <View style={styles.upgradeIconContainer}>
            <Sparkles size={20} color={colors.nude.roseGold} />
          </View>
          <View style={styles.upgradeContent}>
            <Text style={styles.upgradeTitle}>Unlock Gloww+</Text>
            <Text style={styles.upgradeText}>personalized routines</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            placeholderTextColor={colors.nude.textSecondary}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color={colors.nude.background} />
          </TouchableOpacity>
        </View>
      </View>
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
});
