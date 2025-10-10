import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { 
  Heart, 
  Calendar, 
  Target, 
  Baby, 
  Flower, 
  Sparkles, 
  ChevronRight,
  CheckCircle,
  ArrowRight
} from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface OnboardingQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text' | 'slider';
  options?: string[];
  placeholder?: string;
  icon: React.ReactNode;
}

interface WelcomeOnboardingProps {
  onComplete: (answers: Record<string, any>) => void;
}

export default function WelcomeOnboarding({ onComplete }: WelcomeOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions: OnboardingQuestion[] = [
    {
      id: 'name',
      question: "What's your name, beautiful? 💕",
      type: 'text',
      placeholder: 'Enter your name',
      icon: <Heart size={24} color={colors.nude.roseGold} />
    },
    {
      id: 'age',
      question: "How old are you?",
      type: 'single',
      options: ['18-25', '26-35', '36-45', '46-55', '55+'],
      icon: <Calendar size={24} color={colors.reproductive.ovaries} />
    },
    {
      id: 'cycle_length',
      question: "What's your typical cycle length?",
      type: 'single',
      options: ['21-24 days', '25-28 days', '29-32 days', '33+ days', 'Irregular'],
      icon: <Target size={24} color={colors.reproductive.uterus} />
    },
    {
      id: 'goals',
      question: "What are your main wellness goals?",
      type: 'multiple',
      options: [
        'Track my period',
        'Plan for pregnancy',
        'Balance my hormones',
        'Manage PCOS',
        'Reduce stress',
        'Improve energy',
        'Better sleep',
        'Weight management'
      ],
      icon: <Sparkles size={24} color={colors.semantic.healing} />
    },
    {
      id: 'symptoms',
      question: "Do you experience any of these?",
      type: 'multiple',
      options: [
        'Irregular periods',
        'Heavy bleeding',
        'Painful cramps',
        'Mood swings',
        'Fatigue',
        'Weight gain',
        'Hair loss',
        'Acne',
        'None of these'
      ],
      icon: <Flower size={24} color={colors.reproductive.thyroid} />
    },
    {
      id: 'lifestyle',
      question: "How would you describe your lifestyle?",
      type: 'single',
      options: [
        'Very active (exercise 5+ times/week)',
        'Moderately active (exercise 3-4 times/week)',
        'Lightly active (exercise 1-2 times/week)',
        'Sedentary (little to no exercise)'
      ],
      icon: <Baby size={24} color={colors.reproductive.stress} />
    }
  ];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      // Calculate Gloww Score based on answers
      const score = calculateGlowwScore(answers);
      onComplete({ ...answers, glowwScore: score });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateGlowwScore = (answers: Record<string, any>): number => {
    let score = 50; // Base score

    // Age factor
    if (answers.age === '26-35') score += 10;
    else if (answers.age === '36-45') score += 5;

    // Cycle regularity
    if (answers.cycle_length === '25-28 days') score += 15;
    else if (answers.cycle_length === '29-32 days') score += 10;
    else if (answers.cycle_length === 'Irregular') score -= 10;

    // Goals (positive)
    if (answers.goals?.includes('Balance my hormones')) score += 5;
    if (answers.goals?.includes('Track my period')) score += 5;

    // Symptoms (negative)
    const symptomCount = answers.symptoms?.filter((s: string) => s !== 'None of these').length || 0;
    score -= symptomCount * 5;

    // Lifestyle
    if (answers.lifestyle?.includes('Very active')) score += 10;
    else if (answers.lifestyle?.includes('Moderately active')) score += 5;
    else if (answers.lifestyle?.includes('Sedentary')) score -= 5;

    return Math.max(20, Math.min(95, score));
  };

  const renderQuestion = (question: OnboardingQuestion) => {
    const currentAnswer = answers[question.id];

    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <View style={styles.questionIcon}>
            {question.icon}
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {question.type === 'text' && (
          <TextInput
            style={styles.textInput}
            placeholder={question.placeholder}
            value={currentAnswer || ''}
            onChangeText={(text) => handleAnswer(question.id, text)}
            placeholderTextColor={colors.nude.textSecondary}
          />
        )}

        {question.type === 'single' && (
          <View style={styles.optionsContainer}>
            {question.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  currentAnswer === option && styles.selectedOption
                ]}
                onPress={() => handleAnswer(question.id, option)}
              >
                <Text style={[
                  styles.optionText,
                  currentAnswer === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
                {currentAnswer === option && (
                  <CheckCircle size={20} color={colors.nude.background} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {question.type === 'multiple' && (
          <View style={styles.optionsContainer}>
            {question.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  currentAnswer?.includes(option) && styles.selectedOption
                ]}
                onPress={() => {
                  const current = currentAnswer || [];
                  const newAnswer = current.includes(option)
                    ? current.filter((item: string) => item !== option)
                    : [...current, option];
                  handleAnswer(question.id, newAnswer);
                }}
              >
                <Text style={[
                  styles.optionText,
                  currentAnswer?.includes(option) && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
                {currentAnswer?.includes(option) && (
                  <CheckCircle size={20} color={colors.nude.background} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderProgressBar = () => {
    const progress = (currentStep + 1) / questions.length;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} of {questions.length}
        </Text>
      </View>
    );
  };

  const renderWelcome = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeIcon}>
        <Sparkles size={48} color={colors.nude.roseGold} />
      </View>
      <Text style={styles.welcomeTitle}>Welcome to Gloww! 🌸</Text>
      <Text style={styles.welcomeSubtitle}>
        Let's get to know you better so we can create your personalized wellness journey
      </Text>
      <Text style={styles.welcomeDescription}>
        This will only take 2 minutes and help us give you the most accurate health insights
      </Text>
      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => setCurrentStep(0)}
      >
        <Text style={styles.startButtonText}>Let's Begin 💕</Text>
        <ArrowRight size={20} color={colors.nude.background} />
      </TouchableOpacity>
    </View>
  );

  const renderCompletion = () => {
    const score = calculateGlowwScore(answers);
    
    return (
      <View style={styles.completionContainer}>
        <View style={styles.completionIcon}>
          <Heart size={48} color={colors.nude.roseGold} />
        </View>
        <Text style={styles.completionTitle}>All Done! 🎉</Text>
        <Text style={styles.completionSubtitle}>
          Your personalized Gloww Score is ready
        </Text>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Svg width={120} height={120}>
              <Circle
                cx="60"
                cy="60"
                r="50"
                stroke={colors.nude.border}
                strokeWidth="8"
                fill="none"
              />
              <Circle
                cx="60"
                cy="60"
                r="50"
                stroke={colors.nude.roseGold}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50 * (score / 100)} ${2 * Math.PI * 50}`}
                strokeDashoffset={2 * Math.PI * 50 * 0.25}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <Text
                x="60"
                y="60"
                textAnchor="middle"
                fontSize="24"
                fontFamily={typography.fontFamily.semibold}
                fill={colors.nude.text}
              >
                {score}
              </Text>
            </Svg>
          </View>
          <Text style={styles.scoreLabel}>Your Gloww Score</Text>
          <Text style={styles.scoreDescription}>
            {score >= 80 ? "Excellent! Your reproductive health is thriving 🌟" :
             score >= 60 ? "Good progress! Keep nurturing yourself 💕" :
             score >= 40 ? "Healing journey in progress 🌱" :
             "Let's start your wellness journey together 🌸"}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => onComplete({ ...answers, glowwScore: score })}
        >
          <Text style={styles.completeButtonText}>Continue to Gloww</Text>
          <ArrowRight size={20} color={colors.nude.background} />
        </TouchableOpacity>
      </View>
    );
  };

  if (isComplete) {
    return renderCompletion();
  }

  if (currentStep === -1) {
    return renderWelcome();
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Getting to Know You</Text>
        {renderProgressBar()}
      </View>

      {renderQuestion(questions[currentStep])}

      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity 
            style={styles.previousButton}
            onPress={handlePrevious}
          >
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.nextButton,
            !answers[questions[currentStep].id] && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!answers[questions[currentStep].id]}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
          </Text>
          <ChevronRight size={20} color={colors.nude.background} />
        </TouchableOpacity>
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
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.nude.border,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.nude.roseGold,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  questionContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  questionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  questionText: {
    flex: 1,
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    lineHeight: 26,
  },
  textInput: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    borderWidth: 1,
    borderColor: colors.nude.border,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  optionButton: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.nude.border,
  },
  selectedOption: {
    backgroundColor: colors.nude.roseGold,
    borderColor: colors.nude.roseGold,
  },
  optionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.nude.background,
    fontFamily: typography.fontFamily.semibold,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  previousButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  previousButtonText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  nextButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  nextButtonDisabled: {
    backgroundColor: colors.nude.border,
  },
  nextButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
  },
  welcomeIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  welcomeDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  startButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  startButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.background,
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
  },
  completionIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  completionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  completionSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.lg,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  scoreCircle: {
    marginBottom: spacing.md,
  },
  scoreLabel: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  scoreDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  completeButton: {
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  completeButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.background,
  },
});
