import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame, Watch, Apple, Settings } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const [isNudeTheme, setIsNudeTheme] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.nude.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.scoreSection}>
          <CircularProgress
            progress={70}
            size={140}
            strokeWidth={10}
            label="7"
          />
          <Text style={styles.scoreTitle}>My Gloww Score</Text>
          <Text style={styles.scoreSubtitle}>7-day consistency streak</Text>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View style={styles.streakIconContainer}>
              <Flame size={24} color={colors.nude.roseGold} />
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>7 Day Streak</Text>
              <Text style={styles.streakSubtitle}>Keep going!</Text>
            </View>
          </View>
          <View style={styles.streakDays}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <View
                key={index}
                style={[
                  styles.streakDay,
                  index < 7 && styles.streakDayActive,
                ]}
              >
                <Text
                  style={[
                    styles.streakDayText,
                    index < 7 && styles.streakDayTextActive,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Connected Wearables</Text>

        <View style={styles.wearablesList}>
          <View style={styles.wearableItem}>
            <View style={styles.wearableIcon}>
              <Apple size={20} color={colors.nude.text} />
            </View>
            <View style={styles.wearableInfo}>
              <Text style={styles.wearableName}>Apple Watch</Text>
              <Text style={styles.wearableStatus}>Connected</Text>
            </View>
            <View style={styles.wearableConnected} />
          </View>

          <View style={styles.wearableItem}>
            <View style={styles.wearableIcon}>
              <Watch size={20} color={colors.nude.textSecondary} />
            </View>
            <View style={styles.wearableInfo}>
              <Text style={styles.wearableName}>Oura Ring</Text>
              <Text style={styles.wearableStatus}>Not connected</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wearableItem}>
            <View style={styles.wearableIcon}>
              <Watch size={20} color={colors.nude.textSecondary} />
            </View>
            <View style={styles.wearableInfo}>
              <Text style={styles.wearableName}>Whoop</Text>
              <Text style={styles.wearableStatus}>Not connected</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.themeCard}>
          <Text style={styles.themeTitle}>Theme</Text>
          <View style={styles.themeToggle}>
            <Text style={[styles.themeOption, isNudeTheme && styles.themeOptionActive]}>
              Nude
            </Text>
            <Switch
              value={!isNudeTheme}
              onValueChange={(value) => setIsNudeTheme(!value)}
              trackColor={{ false: colors.nude.accent, true: colors.nude.text }}
              thumbColor={colors.nude.background}
            />
            <Text style={[styles.themeOption, !isNudeTheme && styles.themeOptionActive]}>
              Midnight
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Tests Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Avg Balance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Insights</Text>
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
  settingsButton: {
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
  scoreSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  scoreTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginTop: spacing.md,
  },
  scoreSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.xs,
  },
  streakCard: {
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
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  streakIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  streakSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDay: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDayActive: {
    backgroundColor: colors.nude.roseGold,
  },
  streakDayText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  streakDayTextActive: {
    color: colors.nude.background,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  wearablesList: {
    marginBottom: spacing.xl,
  },
  wearableItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  wearableIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  wearableInfo: {
    flex: 1,
  },
  wearableName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  wearableStatus: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  wearableConnected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.semantic.success,
  },
  connectButton: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.nude.text,
  },
  connectButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  themeCard: {
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
  themeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  themeOption: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  themeOptionActive: {
    color: colors.nude.text,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCard: {
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
  },
  statValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
});
