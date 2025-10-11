import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Phone, MessageCircle, Video, Star, Clock, Shield, Heart } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface ExpertCardProps {
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: string;
  availability: string;
  onPress: () => void;
}

function ExpertCard({ name, specialty, rating, experience, price, availability, onPress }: ExpertCardProps) {
  return (
    <TouchableOpacity style={styles.expertCard} onPress={onPress}>
      <View style={styles.expertHeader}>
        <View style={styles.expertAvatar}>
          <Heart size={24} color={colors.nude.roseGold} />
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{name}</Text>
          <Text style={styles.expertSpecialty}>{specialty}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.nude.roseGold} fill={colors.nude.roseGold} />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.experienceText}>{experience}</Text>
          </View>
        </View>
        <View style={styles.expertPrice}>
          <Text style={styles.priceText}>{price}</Text>
          <Text style={styles.pricePeriod}>/session</Text>
        </View>
      </View>
      
      <View style={styles.availabilityContainer}>
        <Clock size={16} color={colors.semantic.balanced} />
        <Text style={styles.availabilityText}>{availability}</Text>
      </View>
      
      <View style={styles.expertActions}>
        <TouchableOpacity style={styles.chatButton}>
          <MessageCircle size={20} color={colors.nude.roseGold} />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.videoButton}>
          <Video size={20} color={colors.nude.background} />
          <Text style={styles.videoButtonText}>Video Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function ExpertScreen() {
  const router = useRouter();

  const handleExpertPress = (expertName: string) => {
    console.log('Expert pressed:', expertName);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expert Consultations</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Connect with Women's Health Experts</Text>
          <Text style={styles.heroSubtitle}>
            Get personalized advice from certified reproductive health specialists
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Shield size={24} color={colors.semantic.balanced} />
            <Text style={styles.featureText}>Certified Specialists</Text>
          </View>
          <View style={styles.featureItem}>
            <Clock size={24} color={colors.nude.roseGold} />
            <Text style={styles.featureText}>24/7 Availability</Text>
          </View>
          <View style={styles.featureItem}>
            <Heart size={24} color={colors.reproductive.uterus} />
            <Text style={styles.featureText}>Personalized Care</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Experts</Text>

        <ExpertCard
          name="Dr. Sarah Johnson"
          specialty="Reproductive Endocrinologist"
          rating={4.9}
          experience="15+ years"
          price="₹2,999"
          availability="Available now"
          onPress={() => handleExpertPress('Dr. Sarah Johnson')}
        />

        <ExpertCard
          name="Dr. Priya Sharma"
          specialty="Gynecologist & PCOS Specialist"
          rating={4.8}
          experience="12+ years"
          price="₹2,499"
          availability="Available in 2 hours"
          onPress={() => handleExpertPress('Dr. Priya Sharma')}
        />

        <ExpertCard
          name="Dr. Ananya Patel"
          specialty="Fertility Specialist"
          rating={4.9}
          experience="10+ years"
          price="₹3,499"
          availability="Available tomorrow"
          onPress={() => handleExpertPress('Dr. Ananya Patel')}
        />

        <ExpertCard
          name="Dr. Meera Singh"
          specialty="Hormone Health Specialist"
          rating={4.7}
          experience="8+ years"
          price="₹2,299"
          availability="Available now"
          onPress={() => handleExpertPress('Dr. Meera Singh')}
        />

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Need Immediate Help?</Text>
          <Text style={styles.emergencySubtitle}>
            For urgent health concerns, please contact emergency services or visit your nearest hospital.
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Phone size={20} color={colors.nude.background} />
            <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
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
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.text,
    marginBottom: spacing.lg,
  },
  expertCard: {
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
  expertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  expertAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  expertSpecialty: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.reproductive.uterus,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  experienceText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  expertPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  pricePeriod: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.semantic.balanced + '20',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  availabilityText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.semantic.balanced,
    marginLeft: spacing.xs,
  },
  expertActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  chatButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.roseGold,
  },
  videoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nude.roseGold,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  videoButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  emergencySection: {
    backgroundColor: colors.semantic.error + '10',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.semantic.error,
    marginBottom: spacing.sm,
  },
  emergencySubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.semantic.error,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emergencyButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
});
