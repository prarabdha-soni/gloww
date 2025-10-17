import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Home, BookOpen, Target, User, Star, Award, Heart, CheckCircle } from 'lucide-react-native';
import PaywallModal from '@/components/PaywallModal';
import { canStart, recordCompleted, addPoints, getPoints, touchDailyStreak } from '@/services/gamification';
import { getActivePlan } from '@/services/subscription';

const { width } = Dimensions.get('window');

interface GlowwGamifiedAppProps {
  onNavigate?: (screen: string) => void;
}

export default function GlowwGamifiedApp({ onNavigate }: GlowwGamifiedAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [glowPoints, setGlowPoints] = useState(150);
  const [glowLevel, setGlowLevel] = useState(2);
  const [challengeProgress, setChallengeProgress] = useState(3);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [planTitle, setPlanTitle] = useState('Free');

  useEffect(() => {
    (async () => {
      const plan = await getActivePlan();
      setPlanTitle(plan.title);
      const pts = await getPoints();
      setGlowPoints(pts);
      await touchDailyStreak();
    })();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const handleQuizAnswer = async (answer: string) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
    const allowed = await canStart('quiz');
    if (!allowed.allowed) { setPaywallVisible(true); return; }
    if (answer === 'true') {
      await recordCompleted('quiz');
      const next = await addPoints(10);
      setGlowPoints(next);
    }
  };

  const tryStartLesson = async () => {
    const allowed = await canStart('lesson');
    if (!allowed.allowed) { setPaywallVisible(true); return false; }
    await recordCompleted('lesson');
    await addPoints(5);
    return true;
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gloww Score</Text>
        <Text style={styles.scorePercentage}>60%</Text>
      </View>

      {/* Glow Score Circle */}
      <View style={styles.scoreContainer}>
        <View style={styles.circleContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.circleText}>60%</Text>
          </View>
        </View>
        <Text style={styles.glowMessage}>You're glowing beautifully 🌷</Text>
      </View>

      {/* Daily Motivation */}
      <View style={styles.motivationCard}>
        <Text style={styles.motivationTitle}>Daily Motivation</Text>
        <Text style={styles.motivationQuote}>
          "Glow starts from within — hydrate, rest, and smile!"
        </Text>
      </View>

      {/* Take Quiz Button */}
      <TouchableOpacity 
        style={styles.quizButton}
        onPress={() => handleTabChange('quiz')}
      >
        <Text style={styles.quizButtonText}>Take Today's Quiz</Text>
        <Target size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Quick Links */}
      <View style={styles.quickLinksContainer}>
        <TouchableOpacity 
          style={styles.quickLinkCard}
          onPress={() => handleTabChange('learn')}
        >
          <BookOpen size={24} color="#DABBB0" />
          <Text style={styles.quickLinkText}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickLinkCard}
          onPress={() => handleTabChange('challenge')}
        >
          <Award size={24} color="#DABBB0" />
          <Text style={styles.quickLinkText}>Challenge</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickLinkCard}
          onPress={() => handleTabChange('rewards')}
        >
          <Star size={24} color="#DABBB0" />
          <Text style={styles.quickLinkText}>Shop</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderLearnScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.learnHeader}>
        <TouchableOpacity onPress={() => handleTabChange('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.learnTitle}>Learn</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.learnContent}>
        <View style={styles.learnIllustration}>
          <View style={styles.womanIcon}>
            <Heart size={40} color="#DABBB0" />
          </View>
        </View>

        <Text style={styles.lessonTitle}>Why your period affects your skin</Text>
        <Text style={styles.lessonSubtext}>
          Understand how hormonal changes impact glow and breakouts.
        </Text>

        <TouchableOpacity style={styles.startLessonButton} onPress={tryStartLesson}>
          <Text style={styles.startLessonText}>Start Lesson</Text>
        </TouchableOpacity>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            💡 Tip: Avoid sugar during PMS — it worsens inflammation.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderQuizScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={() => handleTabChange('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.quizTitle}>Quiz</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.quizContent}>
        <Text style={styles.quizProgress}>2/5 completed</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            True or False? Estrogen drop causes acne flare-ups.
          </Text>
        </View>

        <View style={styles.answerButtons}>
          <TouchableOpacity 
            style={[styles.answerButton, quizAnswer === 'true' && styles.selectedAnswer]}
            onPress={() => handleQuizAnswer('true')}
          >
            <Text style={styles.answerText}>True</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.answerButton, quizAnswer === 'false' && styles.selectedAnswer]}
            onPress={() => handleQuizAnswer('false')}
          >
            <Text style={styles.answerText}>False</Text>
          </TouchableOpacity>
        </View>

        {showQuizResult && (
          <View style={styles.resultPopup}>
            <CheckCircle size={32} color="#4CAF50" />
            <Text style={styles.resultText}>
              Correct! You earned 10 Glow Points 💎
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderChallengeScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeTitle}>Challenge</Text>
      </View>

      <View style={styles.challengeContent}>
        <Text style={styles.challengeMainTitle}>7-Day Hormone Reset Challenge</Text>
        <Text style={styles.challengeDescription}>
          Improve your mood, skin, and energy with small habits.
        </Text>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Day {challengeProgress} of 7</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(challengeProgress / 7) * 100}%` }]} />
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue Challenge</Text>
        </TouchableOpacity>

        <View style={styles.challengeTip}>
          <Text style={styles.challengeTipText}>
            💧 Drink 2L of water today and sleep 8 hours!
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderRewardsScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.rewardsHeader}>
        <Text style={styles.rewardsTitle}>Rewards</Text>
      </View>

      <View style={styles.rewardsContent}>
        <Text style={styles.badgeTitle}>You Earned a Badge! 🌸</Text>
        
        <View style={styles.badgeContainer}>
          <View style={styles.badgeIcon}>
            <Award size={48} color="#DABBB0" />
          </View>
          <Text style={styles.badgeName}>Skin Shield</Text>
        </View>

        <Text style={styles.congratsText}>
          Congrats, your consistency pays off.
        </Text>

        <View style={styles.pointsContainer}>
          <Star size={24} color="#FFD700" />
          <Text style={styles.pointsText}>+50 Glow Points</Text>
        </View>

        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Shop with Points</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewRewardsLink}>
          <Text style={styles.viewRewardsText}>View All Rewards</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderProfileScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>My Glow</Text>
      </View>

      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Heart size={32} color="#DABBB0" />
          </View>
        </View>

        <Text style={styles.glowLevelTitle}>Glow Level — L{glowLevel}</Text>

        <View style={styles.progressTabs}>
          <View style={styles.progressTab}>
            <Text style={styles.tabLabel}>Skin</Text>
            <View style={styles.tabProgress}>
              <View style={[styles.tabProgressFill, { width: '70%', backgroundColor: '#DABBB0' }]} />
            </View>
            <Text style={styles.tabPercentage}>70% glowing</Text>
          </View>

          <View style={styles.progressTab}>
            <Text style={styles.tabLabel}>Hormones</Text>
            <View style={styles.tabProgress}>
              <View style={[styles.tabProgressFill, { width: '60%', backgroundColor: '#DABBB0' }]} />
            </View>
            <Text style={styles.tabPercentage}>60% balanced</Text>
          </View>

          <View style={styles.progressTab}>
            <Text style={styles.tabLabel}>Mind</Text>
            <View style={styles.tabProgress}>
              <View style={[styles.tabProgressFill, { width: '55%', backgroundColor: '#DABBB0' }]} />
            </View>
            <Text style={styles.tabPercentage}>55% calm</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.journeyButton}>
          <Text style={styles.journeyButtonText}>View Your Journey</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeScreen();
      case 'learn':
        return renderLearnScreen();
      case 'quiz':
        return renderQuizScreen();
      case 'challenge':
        return renderChallengeScreen();
      case 'rewards':
        return renderRewardsScreen();
      case 'profile':
        return renderProfileScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <View style={styles.appContainer}>
      {renderContent()}
      <PaywallModal visible={paywallVisible} onClose={() => setPaywallVisible(false)} />
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => handleTabChange('home')}
        >
          <Home size={24} color={activeTab === 'home' ? '#DABBB0' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'learn' && styles.activeNavItem]}
          onPress={() => handleTabChange('learn')}
        >
          <BookOpen size={24} color={activeTab === 'learn' ? '#DABBB0' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'learn' && styles.activeNavText]}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'quiz' && styles.activeNavItem]}
          onPress={() => handleTabChange('quiz')}
        >
          <Target size={24} color={activeTab === 'quiz' ? '#DABBB0' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'quiz' && styles.activeNavText]}>Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]}
          onPress={() => handleTabChange('profile')}
        >
          <User size={24} color={activeTab === 'profile' ? '#DABBB0' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F4EEE9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4EEE9',
    paddingBottom: 100, // Space for bottom navigation
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  scorePercentage: {
    fontSize: 32,
    fontWeight: '800',
    color: '#DABBB0',
    fontFamily: 'System',
  },

  // Score Container
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  circleContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EFDCD3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DABBB0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  glowMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C2E2B',
    marginTop: 16,
    fontFamily: 'System',
  },

  // Motivation Card
  motivationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C2E2B',
    marginBottom: 8,
    fontFamily: 'System',
  },
  motivationQuote: {
    fontSize: 16,
    color: '#6B5B73',
    lineHeight: 24,
    fontFamily: 'System',
  },

  // Quiz Button
  quizButton: {
    backgroundColor: '#DABBB0',
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'System',
  },

  // Quick Links
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  quickLinkCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 80,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3C2E2B',
    marginTop: 8,
    fontFamily: 'System',
  },

  // Learn Screen
  learnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#DABBB0',
    fontWeight: '600',
    fontFamily: 'System',
  },
  learnTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  learnContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  learnIllustration: {
    marginBottom: 32,
  },
  womanIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EFDCD3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  lessonSubtext: {
    fontSize: 16,
    color: '#6B5B73',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: 'System',
  },
  startLessonButton: {
    backgroundColor: '#DABBB0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  startLessonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  tipBox: {
    backgroundColor: '#EFDCD3',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#3C2E2B',
    textAlign: 'center',
    fontFamily: 'System',
  },

  // Quiz Screen
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  quizContent: {
    paddingHorizontal: 24,
  },
  quizProgress: {
    fontSize: 16,
    color: '#6B5B73',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'System',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C2E2B',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'System',
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  answerButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedAnswer: {
    backgroundColor: '#DABBB0',
  },
  answerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  resultPopup: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C2E2B',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },

  // Challenge Screen
  challengeHeader: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  challengeContent: {
    paddingHorizontal: 24,
  },
  challengeMainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    marginBottom: 8,
    fontFamily: 'System',
  },
  challengeDescription: {
    fontSize: 16,
    color: '#6B5B73',
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: 'System',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressText: {
    fontSize: 16,
    color: '#3C2E2B',
    marginBottom: 8,
    fontFamily: 'System',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EFDCD3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DABBB0',
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: '#DABBB0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  challengeTip: {
    backgroundColor: '#EFDCD3',
    padding: 16,
    borderRadius: 12,
  },
  challengeTipText: {
    fontSize: 14,
    color: '#3C2E2B',
    textAlign: 'center',
    fontFamily: 'System',
  },

  // Rewards Screen
  rewardsHeader: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  rewardsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  rewardsContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'System',
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFDCD3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  congratsText: {
    fontSize: 16,
    color: '#6B5B73',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'System',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C2E2B',
    marginLeft: 8,
    fontFamily: 'System',
  },
  shopButton: {
    backgroundColor: '#DABBB0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  viewRewardsLink: {
    paddingVertical: 8,
  },
  viewRewardsText: {
    fontSize: 16,
    color: '#DABBB0',
    fontWeight: '600',
    fontFamily: 'System',
  },

  // Profile Screen
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3C2E2B',
    fontFamily: 'System',
  },
  profileContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFDCD3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glowLevelTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3C2E2B',
    marginBottom: 32,
    fontFamily: 'System',
  },
  progressTabs: {
    width: '100%',
    marginBottom: 32,
  },
  progressTab: {
    marginBottom: 24,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C2E2B',
    marginBottom: 8,
    fontFamily: 'System',
  },
  tabProgress: {
    height: 8,
    backgroundColor: '#EFDCD3',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  tabProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  tabPercentage: {
    fontSize: 14,
    color: '#6B5B73',
    fontFamily: 'System',
  },
  journeyButton: {
    backgroundColor: '#DABBB0',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  journeyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },

  // Bottom Navigation
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#DABBB0',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#F4EEE9',
    borderRadius: 12,
  },
  navText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
    fontFamily: 'System',
  },
  activeNavText: {
    color: '#DABBB0',
    fontWeight: '600',
  },
});
