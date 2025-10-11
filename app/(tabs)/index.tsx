import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity, Beaker, ShoppingBag, Lightbulb, Sparkles, Phone, Heart, Brain, Zap, Calendar, Target, Baby, Flower, Settings, ArrowRight } from 'lucide-react-native';
import GlowwScore from '@/components/GlowwScore';
import OrganDashboard from '@/components/OrganDashboard';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { getUserById, getUserOrganHealth } from '@/services/database-rn';

export default function HomeScreen() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(true);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [userGlowwScore, setUserGlowwScore] = useState(0);
  const [organs, setOrgans] = useState([
    { name: 'Uterus', status: 'healing' as const, progress: 30, color: colors.reproductive.uterus },
    { name: 'Ovaries', status: 'balanced' as const, progress: 75, color: colors.reproductive.ovaries },
    { name: 'Thyroid', status: 'rising' as const, progress: 60, color: colors.reproductive.thyroid },
    { name: 'Stress', status: 'rising' as const, progress: 45, color: colors.reproductive.stress },
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  // Add focus listener to reload data when returning from onboarding
  useEffect(() => {
    const handleFocus = () => {
      loadUserData();
    };

    // Listen for focus events (when user returns to this screen)
    const unsubscribe = () => {
      // This will be called when the screen comes into focus
      loadUserData();
    };

    return unsubscribe;
  }, []);

  const loadUserData = async () => {
    try {
      const isOnboardingComplete = await AsyncStorage.getItem('isOnboardingComplete');
      const userId = await AsyncStorage.getItem('userId');
      const localUserData = await AsyncStorage.getItem('userData');

      console.log('Loading user data:', { isOnboardingComplete, userId, localUserData });

      if (isOnboardingComplete === 'true' && userId && localUserData) {
        setIsNewUser(false);
        const parsedUserData = JSON.parse(localUserData);
        setUserData(parsedUserData);
        setUserName(parsedUserData.name || 'Beautiful');
        setUserGlowwScore(parsedUserData.glowwScore || 0);

        console.log('User data loaded:', parsedUserData);

        // Load organ health from database
        try {
          const organHealth = await getUserOrganHealth(userId);
          if (organHealth) {
            setOrgans([
              { name: 'Uterus', status: organHealth.uterus.status as any, progress: organHealth.uterus.progress, color: colors.reproductive.uterus },
              { name: 'Ovaries', status: organHealth.ovaries.status as any, progress: organHealth.ovaries.progress, color: colors.reproductive.ovaries },
              { name: 'Thyroid', status: organHealth.thyroid.status as any, progress: organHealth.thyroid.progress, color: colors.reproductive.thyroid },
              { name: 'Stress', status: organHealth.stress.status as any, progress: organHealth.stress.progress, color: colors.reproductive.stress },
            ]);
            console.log('Organ health loaded:', organHealth);
          }
        } catch (error) {
          console.error('Error loading organ health from database:', error);
          // Use default organ data if database fails
        }
      } else {
        console.log('Onboarding not complete, showing new user welcome');
        setIsNewUser(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsNewUser(true);
    }
  };

  // Calculate overall Gloww Score
  const overallScore = userGlowwScore || Math.round(organs.reduce((sum, organ) => sum + organ.progress, 0) / organs.length);
  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent reproductive health! 🌟";
    if (score >= 60) return "Good progress, keep nurturing yourself 💕";
    if (score >= 40) return "Healing journey in progress 🌱";
    return "Focus on self-care and wellness 🌸";
  };
  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Your reproductive system is thriving. Maintain your healthy habits!";
    if (score >= 60) return "You're doing great! Small improvements will boost your score even more.";
    if (score >= 40) return "Your body is healing beautifully. Every small step counts.";
    return "Start with gentle self-care practices. Your body is ready to heal.";
  };

  const handleOrganPress = (organ: any) => {
    // Navigate to organ details
    console.log('Organ pressed:', organ.name);
  };

  const handleStartOnboarding = () => {
    router.push('/welcome');
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem('isOnboardingComplete');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('organHealth');
      setIsNewUser(true);
      setUserData(null);
      setUserName('');
      setUserGlowwScore(0);
      console.log('Data cleared, showing new user welcome');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const renderNewUserWelcome = () => (
    <View style={styles.newUserContainer}>
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeIcon}>
          <Sparkles size={40} color={colors.nude.roseGold} />
        </View>
        <Text style={styles.welcomeTitle}>Welcome to Gloww! 🌸</Text>
        <Text style={styles.welcomeSubtitle}>
          Your personal reproductive health companion
        </Text>
        <Text style={styles.welcomeDescription}>
          We'll ask you a few simple questions to create your personalized wellness plan. This takes just 2 minutes and helps us give you the most accurate health insights.
        </Text>
        
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>✨ What you'll get:</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Heart size={16} color={colors.nude.background} />
              </View>
              <Text style={styles.benefitText}>Your personal Gloww Score</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Calendar size={16} color={colors.nude.background} />
              </View>
              <Text style={styles.benefitText}>Smart period & cycle tracking</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Target size={16} color={colors.nude.background} />
              </View>
              <Text style={styles.benefitText}>Fertility window predictions</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Brain size={16} color={colors.nude.background} />
              </View>
              <Text style={styles.benefitText}>Personalized health insights</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.startOnboardingButton}
          onPress={handleStartOnboarding}
        >
          <Text style={styles.startOnboardingText}>Start Your Journey</Text>
          <ArrowRight size={20} color={colors.nude.background} />
        </TouchableOpacity>
        
            <Text style={styles.privacyText}>
              🔒 Your data is private and secure. We never share your personal information.
            </Text>
            
            {/* Debug button - remove in production */}
            <TouchableOpacity 
              style={styles.debugButton}
              onPress={handleClearData}
            >
              <Text style={styles.debugButtonText}>Clear Data (Debug)</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>Gloww</Text>
        <Text style={styles.tagline}>Where reproductive balance begins — naturally, scientifically, beautifully.</Text>
      </View>

      <View style={styles.content}>
        {isNewUser ? (
          renderNewUserWelcome()
        ) : (
          <>
            <Text style={styles.title}>
              Welcome back, {userName}! 💕{'\n'}Your Reproductive Wellness
            </Text>

                <GlowwScore
                  score={overallScore}
                  status={getScoreStatus(overallScore)}
                  description={getScoreDescription(overallScore)}
                />

                <OrganDashboard organs={organs} onOrganPress={handleOrganPress} />
                
                {/* Debug button - remove in production */}
                <TouchableOpacity 
                  style={styles.debugButton}
                  onPress={handleClearData}
                >
                  <Text style={styles.debugButtonText}>Clear Data (Debug)</Text>
                </TouchableOpacity>
          </>
        )}

        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Lightbulb size={20} color={colors.nude.roseGold} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Reproductive Wellness Tip</Text>
            <Text style={styles.tipText}>
              Your uterus is healing—gentle movement and stress reduction will support the process.
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/track')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.ovaries }]}>
              <Calendar size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>My Cycle</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/test')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.thyroid }]}>
              <Beaker size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>Health Tests</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/shop')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.reproductive.stress }]}>
              <Flower size={24} color={colors.nude.background} />
            </View>
            <Text style={styles.actionLabel}>Wellness</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Wellness Journey 💕</Text>

        <View style={styles.modesGrid}>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.ovaries }]}
            onPress={() => router.push('/modes/cycle')}
          >
            <Calendar size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Period & Cycle</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Ovaries')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Monitor your cycle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.thyroid }]}
            onPress={() => router.push('/modes/hormones')}
          >
            <Brain size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Hormone Balance</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Thyroid')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Balance your hormones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeCard, { backgroundColor: colors.reproductive.stress }]}
            onPress={() => router.push('/modes/stress')}
          >
            <Flower size={28} color={colors.nude.background} />
            <Text style={styles.modeLabel}>Self-Care & Stress</Text>
            <Text style={styles.modeScore}>{organs.find(o => o.name === 'Stress')?.progress || 0}</Text>
            <Text style={styles.modeSubtext}>Nurture your wellbeing</Text>
          </TouchableOpacity>
        </View>

            <TouchableOpacity
              style={styles.expertCallCard}
              onPress={() => router.push('/doctors')}
            >
              <View style={styles.expertCallIcon}>
                <Phone size={24} color={colors.nude.background} />
              </View>
              <View style={styles.expertCallContent}>
                <Text style={styles.expertCallTitle}>💬 Chat with a Women's Health Expert</Text>
                <Text style={styles.expertCallSubtitle}>
                  Get personalized advice from certified reproductive health specialists
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pregnancyCard}
              onPress={() => router.push('/track')}
            >
              <View style={styles.pregnancyIcon}>
                <Baby size={24} color={colors.nude.background} />
              </View>
              <View style={styles.pregnancyContent}>
                <Text style={styles.pregnancyTitle}>🤱 Pregnancy & Baby Tracking</Text>
                <Text style={styles.pregnancySubtitle}>
                  Track your pregnancy journey and baby's growth week by week
                </Text>
              </View>
            </TouchableOpacity>

            {/* New Feature Cards */}
            <View style={styles.newFeaturesSection}>
              <Text style={styles.sectionTitle}>Advanced Features</Text>
              
              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => router.push('/analytics')}
              >
                <View style={styles.featureIcon}>
                  <Brain size={24} color={colors.nude.roseGold} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Predictive Analytics</Text>
                  <Text style={styles.featureDescription}>
                    AI-powered fertility predictions and health risk assessment
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => router.push('/premium')}
              >
                <View style={styles.featureIcon}>
                  <Sparkles size={24} color={colors.nude.roseGold} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Premium Services</Text>
                  <Text style={styles.featureDescription}>
                    Virtual consultations, health coaching, and personalized supplements
                  </Text>
                </View>
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
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  logo: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    letterSpacing: 0.5,
  },
  tagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl + 80, // Add space for tab bar
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    lineHeight: 38,
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  tipCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    lineHeight: 22,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.nude.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  modeCard: {
    flex: 1,
    minWidth: '48%',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modeEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  modeLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  modeScore: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.background,
    marginTop: spacing.xs,
  },
  modeSubtext: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.background,
    opacity: 0.8,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  expertCallCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expertCallIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  expertCallContent: {
    flex: 1,
  },
  expertCallTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  expertCallSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  newFeaturesSection: {
    marginTop: spacing.xl,
  },
  featureCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
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
    borderRadius: borderRadius.md,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  pregnancyCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pregnancyIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.reproductive.uterus,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  pregnancyContent: {
    flex: 1,
  },
  pregnancyTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  pregnancySubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  newUserContainer: {
    paddingBottom: spacing.xl,
  },
  welcomeCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  welcomeSubtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  welcomeDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  startOnboardingButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: colors.nude.roseGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startOnboardingText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.background,
  },
  featuresPreview: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  featuresTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  featureList: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  featureText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  benefitsContainer: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    width: '100%',
  },
  benefitsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  benefitsList: {
    gap: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  benefitText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    flex: 1,
  },
      privacyText: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.size.sm,
        color: colors.nude.textSecondary,
        textAlign: 'center',
        marginTop: spacing.md,
        lineHeight: 18,
      },
      debugButton: {
        backgroundColor: colors.semantic.error,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        marginTop: spacing.md,
      },
      debugButtonText: {
        fontFamily: typography.fontFamily.medium,
        fontSize: typography.size.sm,
        color: colors.nude.background,
        textAlign: 'center',
      },
    });
