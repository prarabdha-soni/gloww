import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity, Beaker, ShoppingBag, Lightbulb, Sparkles, Phone, Heart, Brain, Zap, Calendar, Target, Baby, Flower, Settings, ArrowRight, Scale, Leaf, Moon, Wind, Smile, Droplets, ChevronRight } from 'lucide-react-native';
import GlowwScore from '@/components/GlowwScore';
import OrganDashboard from '@/components/OrganDashboard';
import OrganHealingScreen from '@/components/OrganHealingScreen';
import OrganHealthOverview from '@/components/OrganHealthOverview';
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
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

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
    if (score >= 40) return "Your ovaries are asking for rest today 🌸 — take a short walk and hydrate more.";
    return "Start with gentle self-care practices. Your body is ready to heal.";
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


  const handleOrganPress = (organ: string) => {
    console.log('Organ pressed:', organ);
    setSelectedOrgan(organ);
  };

  const handleOrganDashboardPress = () => {
    // Show organ health overview instead of individual organ
    setSelectedOrgan('dashboard');
  };

  const handleBackFromOrgan = () => {
    setSelectedOrgan(null);
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

  // Show organ health overview or individual organ screen
  if (selectedOrgan) {
    if (selectedOrgan === 'dashboard') {
      return (
        <OrganHealthOverview
          organHealth={{
            uterus: { status: organs[0].status, progress: organs[0].progress },
            ovaries: { status: organs[1].status, progress: organs[1].progress },
            thyroid: { status: organs[2].status, progress: organs[2].progress },
            stress: { status: organs[3].status, progress: organs[3].progress },
          }}
          onBack={handleBackFromOrgan}
          onOrganPress={handleOrganPress}
        />
      );
    } else {
      const organ = organs.find(o => o.name === selectedOrgan);
      console.log('Selected organ:', selectedOrgan);
      console.log('Found organ:', organ);
      if (organ) {
        return (
          <OrganHealingScreen
            organName={organ.name}
            organStatus={organ.status}
            organProgress={organ.progress}
            organColor={organ.color}
            onBack={handleBackFromOrgan}
          />
        );
      } else {
        console.log('Organ not found for:', selectedOrgan);
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.nude.background }}>
            <Text>Organ not found: {selectedOrgan}</Text>
            <TouchableOpacity onPress={handleBackFromOrgan} style={{ marginTop: 20, padding: 10, backgroundColor: colors.nude.roseGold, borderRadius: 8 }}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  // Health goals configuration
  const healthGoals = [
    {
      id: 'perimenopause',
      title: 'Ease perimenopause',
      titleGray: 'Ease',
      titleColored: 'perimenopause',
      icon: Droplets,
      color: '#E8B4B8',
      backgroundColor: '#FDF5F6',
      route: '/modes/hormones',
      popular: false,
    },
    {
      id: 'menopause',
      title: 'Relieve menopause',
      titleGray: 'Relieve',
      titleColored: 'menopause',
      icon: Wind,
      color: '#D4A59A',
      backgroundColor: '#FAF5F3',
      route: '/modes/stress',
      popular: false,
    },
    {
      id: 'reproductive',
      title: 'Heal reproductive organ',
      titleGray: 'Heal reproductive',
      titleColored: 'organ',
      icon: Heart,
      color: '#E8B4B8',
      backgroundColor: '#FEF6F7',
      route: '/modes/hormones',
      popular: false,
    },
    {
      id: 'hormones',
      title: 'Fix hormones',
      titleGray: 'Fix',
      titleColored: 'hormones',
      icon: Zap,
      color: '#A8B8C8',
      backgroundColor: '#F3F5F8',
      route: '/modes/hormones',
      popular: false,
    },
  ];

  return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleMain}>Female care</Text>
          </Text>
          <Text style={styles.heroSubtitle}>personalized to you</Text>
          <Text style={styles.heroTagline}>Customized care starts here</Text>
        </View>

        {/* Health Goals Cards */}
        <View style={styles.goalsContainer}>
          {healthGoals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[styles.goalCard, { backgroundColor: goal.backgroundColor }]}
              onPress={() => router.push(goal.route as any)}
              activeOpacity={0.7}
            >
              {goal.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
              
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>
                  <Text style={styles.goalTitleGray}>{goal.titleGray} </Text>
                  <Text style={[styles.goalTitleColored, { color: goal.color }]}>
                    {goal.titleColored}
                  </Text>
                </Text>
              </View>

              <View style={[styles.goalIconContainer, { backgroundColor: goal.color + '30' }]}>
                <goal.icon size={48} color={goal.color} strokeWidth={1.5} />
              </View>

              <View style={styles.goalArrow}>
                <ChevronRight size={24} color={colors.nude.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
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
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl + 80,
  },
  // Hero Section Styles
  heroSection: {
    marginBottom: spacing.xl,
  },
  heroTitle: {
    marginBottom: spacing.xs,
  },
  heroTitleMain: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: 36,
    color: '#E8916D',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    marginBottom: spacing.md,
    letterSpacing: -0.5,
  },
  heroTagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  // Health Goals Cards
  goalsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  goalCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    minHeight: 120,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: '#5F8A6F',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    zIndex: 10,
  },
  popularText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: '#FFFFFF',
  },
  goalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  goalTitle: {
    fontSize: typography.size.xl,
    lineHeight: 28,
  },
  goalTitleGray: {
    fontFamily: typography.fontFamily.regular,
    color: colors.nude.textSecondary,
  },
  goalTitleColored: {
    fontFamily: typography.fontFamily.semibold,
  },
  goalIconContainer: {
    position: 'absolute',
    right: 60,
    top: '50%',
    marginTop: -32,
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalArrow: {
    position: 'absolute',
    right: spacing.lg,
    top: '50%',
    marginTop: -12,
  },
  // Tracking Section
  trackingSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.lg,
  },
  trackingCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  trackingCardLeft: {
    marginRight: spacing.md,
  },
  scoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.nude.roseGold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.nude.roseGold,
  },
  scoreNumber: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
  },
  scoreLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  trackingCardRight: {
    flex: 1,
  },
  trackingCardTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  trackingCardSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  // Metrics Cards
  metricCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  metricEmoji: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  metricBar: {
    height: 6,
    backgroundColor: colors.nude.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: 6,
    borderRadius: 3,
  },
  metricValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.md,
  },
  // Onboarding Styles (keep for new users)
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

