import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Baby, Heart, Calendar, Target, BookOpen, Camera, Users } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface PregnancyMilestoneProps {
  week: number;
  title: string;
  description: string;
  babySize: string;
  symptoms: string[];
  tips: string[];
}

function PregnancyMilestone({ week, title, description, babySize, symptoms, tips }: PregnancyMilestoneProps) {
  return (
    <View style={styles.milestoneCard}>
      <View style={styles.milestoneHeader}>
        <View style={styles.weekBadge}>
          <Text style={styles.weekText}>Week {week}</Text>
        </View>
        <Text style={styles.milestoneTitle}>{title}</Text>
      </View>
      
      <Text style={styles.milestoneDescription}>{description}</Text>
      
      <View style={styles.babySizeContainer}>
        <Baby size={20} color={colors.reproductive.uterus} />
        <Text style={styles.babySizeText}>Baby is the size of: {babySize}</Text>
      </View>
      
      <View style={styles.symptomsContainer}>
        <Text style={styles.symptomsTitle}>Common Symptoms:</Text>
        {symptoms.map((symptom, index) => (
          <Text key={index} style={styles.symptomText}>• {symptom}</Text>
        ))}
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for This Week:</Text>
        {tips.map((tip, index) => (
          <Text key={index} style={styles.tipText}>• {tip}</Text>
        ))}
      </View>
    </View>
  );
}

export default function PregnantScreen() {
  const router = useRouter();

  const handleFeaturePress = (feature: string) => {
    console.log('Feature pressed:', feature);
  };

  const currentWeek = 12; // This would come from user data
  const dueDate = "October 22, 2024"; // This would come from user data

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pregnancy & Baby Tracking</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Your Pregnancy Journey</Text>
          <Text style={styles.heroSubtitle}>
            Track your pregnancy week by week and watch your baby grow
          </Text>
        </View>

        <View style={styles.babyVisualizationSection}>
          <View style={styles.babyCard}>
            <View style={styles.babyHeader}>
              <Text style={styles.babyWeekText}>{currentWeek} weeks</Text>
              <Text style={styles.babyDayText}>1 day</Text>
            </View>
            
            <View style={styles.babyContainer}>
              <View style={styles.babyGlow}>
                <View style={styles.babyIllustration}>
                  <Text style={styles.babyEmoji}>👶</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Pregnancy Progress</Text>
            <Text style={styles.progressWeek}>Week {currentWeek}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentWeek / 40) * 100}%` }]} />
          </View>
          <Text style={styles.dueDateText}>Due Date: {dueDate}</Text>
        </View>

        <View style={styles.featuresGrid}>
          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('milestones')}
          >
            <View style={styles.featureIcon}>
              <Target size={24} color={colors.reproductive.uterus} />
            </View>
            <Text style={styles.featureTitle}>Milestones</Text>
            <Text style={styles.featureDescription}>Track baby's development</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('symptoms')}
          >
            <View style={styles.featureIcon}>
              <Heart size={24} color={colors.reproductive.ovaries} />
            </View>
            <Text style={styles.featureTitle}>Symptoms</Text>
            <Text style={styles.featureDescription}>Log pregnancy symptoms</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('appointments')}
          >
            <View style={styles.featureIcon}>
              <Calendar size={24} color={colors.reproductive.thyroid} />
            </View>
            <Text style={styles.featureTitle}>Appointments</Text>
            <Text style={styles.featureDescription}>Schedule check-ups</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('journal')}
          >
            <View style={styles.featureIcon}>
              <BookOpen size={24} color={colors.reproductive.stress} />
            </View>
            <Text style={styles.featureTitle}>Journal</Text>
            <Text style={styles.featureDescription}>Record memories</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('photos')}
          >
            <View style={styles.featureIcon}>
              <Camera size={24} color={colors.nude.roseGold} />
            </View>
            <Text style={styles.featureTitle}>Photos</Text>
            <Text style={styles.featureDescription}>Bump progression</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => handleFeaturePress('community')}
          >
            <View style={styles.featureIcon}>
              <Users size={24} color={colors.semantic.balanced} />
            </View>
            <Text style={styles.featureTitle}>Community</Text>
            <Text style={styles.featureDescription}>Connect with moms</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>This Week's Development</Text>

        <PregnancyMilestone
          week={12}
          title="First Trimester Complete!"
          description="Your baby is now fully formed with all major organs in place. The risk of miscarriage drops significantly."
          babySize="a lime"
          symptoms={[
            "Morning sickness may start to ease",
            "Breast tenderness continues",
            "Increased energy levels",
            "Frequent urination"
          ]}
          tips={[
            "Continue taking prenatal vitamins",
            "Stay hydrated and eat small, frequent meals",
            "Get plenty of rest",
            "Start thinking about announcing your pregnancy"
          ]}
        />

        <PregnancyMilestone
          week={13}
          title="Second Trimester Begins"
          description="Welcome to the 'golden trimester'! Many women feel their best during this time."
          babySize="a peach"
          symptoms={[
            "Energy levels increase",
            "Morning sickness subsides",
            "Breast changes continue",
            "Possible round ligament pain"
          ]}
          tips={[
            "Enjoy your increased energy",
            "Start gentle exercise if cleared by doctor",
            "Begin planning your nursery",
            "Consider maternity clothes"
          ]}
        />

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Baby size={20} color={colors.nude.background} />
            <Text style={styles.actionButtonText}>Log Today's Symptoms</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color={colors.nude.background} />
            <Text style={styles.actionButtonText}>Schedule Appointment</Text>
          </TouchableOpacity>
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
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + 80,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressSection: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  progressWeek: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.xl,
    color: colors.reproductive.uterus,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.nude.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.reproductive.uterus,
    borderRadius: borderRadius.full,
  },
  dueDateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  featureCard: {
    width: '48%',
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
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.lg,
  },
  milestoneCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  weekBadge: {
    backgroundColor: colors.reproductive.uterus,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  weekText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.background,
  },
  milestoneTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    flex: 1,
  },
  milestoneDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  babySizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  babySizeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  symptomsContainer: {
    marginBottom: spacing.md,
  },
  symptomsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  symptomText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 18,
  },
  tipsContainer: {
    marginBottom: spacing.sm,
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
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.reproductive.uterus,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  babyVisualizationSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  babyCard: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.nude.peach,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.reproductive.uterus,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
  },
  babyHeader: {
    position: 'absolute',
    top: spacing.lg,
    alignItems: 'center',
  },
  babyWeekText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  babyDayText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  babyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.nude.roseGold + '40',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  babyIllustration: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.nude.roseGold + '60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyEmoji: {
    fontSize: 48,
  },
  detailsButton: {
    position: 'absolute',
    bottom: spacing.lg,
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.nude.peach,
  },
  detailsButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
});
