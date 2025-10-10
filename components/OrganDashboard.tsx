import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OrganData {
  name: string;
  status: 'healing' | 'balanced' | 'rising' | 'declining';
  progress: number;
  color: string;
}

interface OrganDashboardProps {
  organs: OrganData[];
  onOrganPress: (organ: OrganData) => void;
}

export default function OrganDashboard({ organs, onOrganPress }: OrganDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healing': return colors.semantic.healing;
      case 'balanced': return colors.semantic.balanced;
      case 'rising': return colors.semantic.rising;
      case 'declining': return colors.semantic.error;
      default: return colors.nude.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healing': return 'Healing';
      case 'balanced': return 'Balanced';
      case 'rising': return 'Rising';
      case 'declining': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organ Dashboard</Text>
      <View style={styles.organsGrid}>
        {organs.map((organ, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.organCard, { backgroundColor: organ.color }]}
            onPress={() => onOrganPress(organ)}
          >
            <View style={styles.organHeader}>
              <Text style={styles.organName}>{organ.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(organ.status) }]}>
                <Text style={styles.statusText}>{getStatusText(organ.status)}</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${organ.progress}%`,
                      backgroundColor: getStatusColor(organ.status)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{organ.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  organsGrid: {
    gap: spacing.sm,
  },
  organCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  organHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  organName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.card,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  progressText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    minWidth: 32,
    textAlign: 'right',
  },
});
