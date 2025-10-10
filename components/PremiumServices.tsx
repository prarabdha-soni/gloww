import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  Video, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock, 
  Star,
  CheckCircle,
  Heart,
  Brain,
  Zap,
  Target,
  Award,
  Shield,
  Users
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  type: 'consultation' | 'coaching' | 'testing' | 'supplement';
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  benefits: string[];
  popular?: boolean;
  savings?: string;
}

interface PremiumServicesProps {
  onBookService: (service: Service) => void;
  onSubscribe: (plan: SubscriptionPlan) => void;
  onViewDetails: (service: Service) => void;
}

export default function PremiumServices({ 
  onBookService, 
  onSubscribe, 
  onViewDetails 
}: PremiumServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services: Service[] = [
    {
      id: 'video_consultation',
      name: 'Video Consultation',
      description: '1-on-1 video call with reproductive health specialist',
      price: '₹2,500',
      duration: '45 minutes',
      type: 'consultation',
      icon: <Video size={24} color={colors.nude.roseGold} />,
      features: [
        'Personalized health assessment',
        'Treatment plan development',
        'Follow-up recommendations',
        'Digital prescription if needed'
      ],
      popular: true
    },
    {
      id: 'phone_consultation',
      name: 'Phone Consultation',
      description: 'Telephone consultation with certified specialist',
      price: '₹2,000',
      duration: '30 minutes',
      type: 'consultation',
      icon: <Phone size={24} color={colors.nude.roseGold} />,
      features: [
        'Quick health assessment',
        'Basic recommendations',
        'Follow-up scheduling',
        'Emergency guidance'
      ]
    },
    {
      id: 'chat_consultation',
      name: 'Chat Consultation',
      description: 'Text-based consultation with health expert',
      price: '₹1,500',
      duration: '24 hours',
      type: 'consultation',
      icon: <MessageCircle size={24} color={colors.nude.roseGold} />,
      features: [
        'Asynchronous communication',
        'Detailed health questions',
        'Written recommendations',
        'Resource sharing'
      ]
    },
    {
      id: 'health_coaching',
      name: 'Health Coaching Program',
      description: '3-month personalized wellness coaching',
      price: '₹15,000',
      duration: '3 months',
      type: 'coaching',
      icon: <Target size={24} color={colors.reproductive.uterus} />,
      features: [
        'Weekly 1-on-1 sessions',
        'Personalized meal plans',
        'Exercise routines',
        'Progress tracking',
        '24/7 chat support'
      ],
      popular: true
    },
    {
      id: 'hormone_testing',
      name: 'Comprehensive Hormone Panel',
      description: 'At-home hormone testing with expert interpretation',
      price: '₹8,999',
      duration: '3-5 days',
      type: 'testing',
      icon: <Brain size={24} color={colors.reproductive.thyroid} />,
      features: [
        'Complete hormone analysis',
        'Expert interpretation',
        'Personalized recommendations',
        'Follow-up consultation'
      ]
    },
    {
      id: 'pcos_screening',
      name: 'PCOS Screening Package',
      description: 'Specialized PCOS testing and consultation',
      price: '₹6,499',
      duration: '2-3 days',
      type: 'testing',
      icon: <Heart size={24} color={colors.reproductive.ovaries} />,
      features: [
        'PCOS-specific tests',
        'Insulin resistance check',
        'Specialist consultation',
        'Treatment plan'
      ]
    },
    {
      id: 'personalized_supplements',
      name: 'Personalized Supplement Plan',
      description: 'Custom supplement stack based on your health profile',
      price: '₹4,999',
      duration: '1 month',
      type: 'supplement',
      icon: <Zap size={24} color={colors.semantic.healing} />,
      features: [
        'AI-powered recommendations',
        'Quality-tested supplements',
        'Monthly adjustments',
        'Progress monitoring'
      ]
    }
  ];

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic_plan',
      name: 'Basic Plan',
      price: '₹2,499',
      period: 'month',
      description: 'Essential reproductive health tracking',
      features: [
        'Symptom tracking',
        'Cycle predictions',
        'Basic insights',
        'Community access'
      ],
      benefits: [
        'Track up to 10 symptoms',
        'Monthly health reports',
        'Basic AI recommendations'
      ]
    },
    {
      id: 'premium_plan',
      name: 'Premium Plan',
      price: '₹4,999',
      period: 'month',
      description: 'Comprehensive health management',
      features: [
        'Everything in Basic',
        'AI Health Coach',
        'Lab test discounts (20%)',
        'Monthly supplement box',
        'Priority support'
      ],
      benefits: [
        'Unlimited symptom tracking',
        'Advanced analytics',
        'Personalized recommendations',
        'Expert consultations (2/month)'
      ],
      popular: true,
      savings: 'Save ₹3,000/year'
    },
    {
      id: 'elite_plan',
      name: 'Elite Plan',
      price: '₹8,499',
      period: 'month',
      description: 'Complete reproductive wellness ecosystem',
      features: [
        'Everything in Premium',
        'Unlimited expert consultations',
        'Free lab testing',
        'Custom supplement stacks',
        'Wearable integration',
        '1-on-1 expert calls'
      ],
      benefits: [
        'Complete health ecosystem',
        'Dedicated health coach',
        'Family health tracking',
        'Advanced predictive analytics'
      ],
      savings: 'Save ₹6,000/year'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: <Star size={20} color={colors.nude.text} /> },
    { id: 'consultation', name: 'Consultations', icon: <Video size={20} color={colors.nude.roseGold} /> },
    { id: 'coaching', name: 'Coaching', icon: <Target size={20} color={colors.reproductive.uterus} /> },
    { id: 'testing', name: 'Testing', icon: <Brain size={20} color={colors.reproductive.thyroid} /> },
    { id: 'supplement', name: 'Supplements', icon: <Zap size={20} color={colors.semantic.healing} /> }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.type === selectedCategory);

  const handleServicePress = (service: Service) => {
    Alert.alert(
      'Book Service',
      `Would you like to book ${service.name} for ${service.price}?`,
      [
        { text: 'View Details', onPress: () => onViewDetails(service) },
        { text: 'Book Now', onPress: () => onBookService(service) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handlePlanPress = (plan: SubscriptionPlan) => {
    Alert.alert(
      'Subscribe to Plan',
      `Subscribe to ${plan.name} for ${plan.price}/${plan.period}?`,
      [
        { text: 'View Details', onPress: () => console.log('View plan details') },
        { text: 'Subscribe', onPress: () => onSubscribe(plan) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Premium Health Services</Text>
        <Text style={styles.subtitle}>
          Access expert care and personalized wellness solutions
        </Text>
      </View>

      <View style={styles.content}>
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Services</Text>
          {filteredServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceIcon}>
                  {service.icon}
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceMeta}>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                    <Text style={styles.serviceDuration}>{service.duration}</Text>
                  </View>
                </View>
                {service.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </View>

              <View style={styles.serviceFeatures}>
                {service.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <CheckCircle size={16} color={colors.semantic.balanced} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.bookServiceButton}
                onPress={() => handleServicePress(service)}
              >
                <Calendar size={16} color={colors.nude.background} />
                <Text style={styles.bookServiceText}>Book Service</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Subscription Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Plans</Text>
          {subscriptionPlans.map((plan) => (
            <View key={plan.id} style={[
              styles.planCard,
              plan.popular && styles.planCardPopular
            ]}>
              {plan.popular && (
                <View style={styles.popularPlanBadge}>
                  <Text style={styles.popularPlanText}>Most Popular</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>/{plan.period}</Text>
                  {plan.savings && (
                    <Text style={styles.planSavings}>{plan.savings}</Text>
                  )}
                </View>
              </View>

              <View style={styles.planFeatures}>
                <Text style={styles.planFeaturesTitle}>What's included:</Text>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.planFeatureItem}>
                    <CheckCircle size={16} color={colors.semantic.balanced} />
                    <Text style={styles.planFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.planBenefits}>
                <Text style={styles.planBenefitsTitle}>Benefits:</Text>
                {plan.benefits.map((benefit, index) => (
                  <View key={index} style={styles.planBenefitItem}>
                    <Star size={16} color={colors.nude.roseGold} />
                    <Text style={styles.planBenefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  plan.popular && styles.subscribeButtonPopular
                ]}
                onPress={() => handlePlanPress(plan)}
              >
                <Text style={[
                  styles.subscribeButtonText,
                  plan.popular && styles.subscribeButtonTextPopular
                ]}>
                  Subscribe Now
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustCard}>
          <Text style={styles.trustTitle}>Why Choose Our Premium Services?</Text>
          
          <View style={styles.trustItem}>
            <Shield size={20} color={colors.semantic.balanced} />
            <View style={styles.trustContent}>
              <Text style={styles.trustItemTitle}>Certified Specialists</Text>
              <Text style={styles.trustItemText}>
                All our healthcare providers are board-certified and verified
              </Text>
            </View>
          </View>

          <View style={styles.trustItem}>
            <Users size={20} color={colors.semantic.balanced} />
            <View style={styles.trustContent}>
              <Text style={styles.trustItemTitle}>10,000+ Happy Users</Text>
              <Text style={styles.trustItemText}>
                Join thousands of women who have improved their reproductive health
              </Text>
            </View>
          </View>

          <View style={styles.trustItem}>
            <Award size={20} color={colors.semantic.balanced} />
            <View style={styles.trustContent}>
              <Text style={styles.trustItemTitle}>Proven Results</Text>
              <Text style={styles.trustItemText}>
                85% of users report improved cycle regularity within 3 months
              </Text>
            </View>
          </View>

          <View style={styles.trustItem}>
            <Heart size={20} color={colors.semantic.balanced} />
            <View style={styles.trustContent}>
              <Text style={styles.trustItemTitle}>Personalized Care</Text>
              <Text style={styles.trustItemText}>
                Every service is tailored to your unique health profile and needs
              </Text>
            </View>
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
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxxl,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  categoryContainer: {
    marginBottom: spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    borderColor: colors.nude.roseGold,
    backgroundColor: colors.nude.peach,
  },
  categoryText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.xs,
  },
  categoryTextActive: {
    color: colors.nude.text,
    fontFamily: typography.fontFamily.semibold,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  serviceCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  serviceIcon: {
    marginRight: spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  servicePrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.roseGold,
  },
  serviceDuration: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  popularBadge: {
    backgroundColor: colors.semantic.healing,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  popularText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.background,
  },
  serviceFeatures: {
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  featureText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  bookServiceButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  bookServiceText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  planCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  planCardPopular: {
    borderWidth: 2,
    borderColor: colors.nude.roseGold,
  },
  popularPlanBadge: {
    position: 'absolute',
    top: -12,
    right: spacing.md,
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  popularPlanText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.background,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  planDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
  planPricing: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xxl,
    color: colors.nude.text,
  },
  planPeriod: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  planSavings: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.semantic.healing,
    marginTop: spacing.xs,
  },
  planFeatures: {
    marginBottom: spacing.md,
  },
  planFeaturesTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  planFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  planFeatureText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  planBenefits: {
    marginBottom: spacing.md,
  },
  planBenefitsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  planBenefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  planBenefitText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.nude.text,
  },
  subscribeButtonPopular: {
    backgroundColor: colors.nude.text,
    borderColor: colors.nude.text,
  },
  subscribeButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  subscribeButtonTextPopular: {
    color: colors.nude.background,
  },
  trustCard: {
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
  trustTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  trustContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  trustItemTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  trustItemText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
});
