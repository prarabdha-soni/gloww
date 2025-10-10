import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { 
  User, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Video, 
  MessageCircle,
  Calendar,
  Award,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface HealthcareProvider {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  education: string[];
  certifications: string[];
  languages: string[];
  availability: {
    nextAvailable: string;
    consultationTypes: string[];
  };
  location: {
    city: string;
    state: string;
    isRemote: boolean;
  };
  pricing: {
    video: string;
    phone: string;
    chat: string;
  };
  bio: string;
  profileImage?: string;
}

interface HealthcareProviderNetworkProps {
  onBookConsultation: (provider: HealthcareProvider) => void;
  onViewProfile: (provider: HealthcareProvider) => void;
}

export default function HealthcareProviderNetwork({ 
  onBookConsultation, 
  onViewProfile 
}: HealthcareProviderNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const providers: HealthcareProvider[] = [
    {
      id: 'dr_sarah_chen',
      name: 'Dr. Sarah Chen',
      title: 'Reproductive Endocrinologist',
      specialty: 'PCOS & Hormone Disorders',
      rating: 4.9,
      reviews: 127,
      experience: '12 years',
      education: ['MD - AIIMS Delhi', 'Fellowship - Reproductive Medicine'],
      certifications: ['Board Certified Endocrinologist', 'PCOS Specialist'],
      languages: ['English', 'Hindi', 'Mandarin'],
      availability: {
        nextAvailable: 'Today, 3:00 PM',
        consultationTypes: ['Video', 'Phone', 'Chat']
      },
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        isRemote: true
      },
      pricing: {
        video: '₹2,500',
        phone: '₹2,000',
        chat: '₹1,500'
      },
      bio: 'Specialized in PCOS management and hormone disorders with 12+ years of experience. Focus on holistic approach to reproductive health.'
    },
    {
      id: 'dr_priya_sharma',
      name: 'Dr. Priya Sharma',
      title: 'Gynecologist & Fertility Specialist',
      specialty: 'Fertility & IVF',
      rating: 4.8,
      reviews: 89,
      experience: '15 years',
      education: ['MD - PGIMER Chandigarh', 'Fellowship - Reproductive Medicine'],
      certifications: ['IVF Specialist', 'Laparoscopic Surgeon'],
      languages: ['English', 'Hindi', 'Punjabi'],
      availability: {
        nextAvailable: 'Tomorrow, 10:00 AM',
        consultationTypes: ['Video', 'Phone']
      },
      location: {
        city: 'Delhi',
        state: 'Delhi',
        isRemote: true
      },
      pricing: {
        video: '₹3,000',
        phone: '₹2,500',
        chat: '₹2,000'
      },
      bio: 'Leading fertility specialist with expertise in IVF, IUI, and reproductive surgery. Success rate of 85% in fertility treatments.'
    },
    {
      id: 'dr_anita_patel',
      name: 'Dr. Anita Patel',
      title: 'Functional Medicine Practitioner',
      specialty: 'Hormone Balance & Nutrition',
      rating: 5.0,
      reviews: 156,
      experience: '8 years',
      education: ['MD - BHU Varanasi', 'Certified Functional Medicine'],
      certifications: ['Hormone Specialist', 'Nutritional Medicine'],
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: {
        nextAvailable: 'Today, 5:00 PM',
        consultationTypes: ['Video', 'Chat']
      },
      location: {
        city: 'Bangalore',
        state: 'Karnataka',
        isRemote: true
      },
      pricing: {
        video: '₹2,200',
        phone: '₹1,800',
        chat: '₹1,200'
      },
      bio: 'Holistic approach to women\'s health focusing on root cause analysis and natural hormone balancing through nutrition and lifestyle.'
    },
    {
      id: 'dr_meera_singh',
      name: 'Dr. Meera Singh',
      title: 'Endocrinologist',
      specialty: 'Thyroid & Diabetes',
      rating: 4.7,
      reviews: 98,
      experience: '10 years',
      education: ['MD - AIIMS Delhi', 'DM - Endocrinology'],
      certifications: ['Thyroid Specialist', 'Diabetes Educator'],
      languages: ['English', 'Hindi'],
      availability: {
        nextAvailable: 'Tomorrow, 2:00 PM',
        consultationTypes: ['Video', 'Phone']
      },
      location: {
        city: 'Chennai',
        state: 'Tamil Nadu',
        isRemote: true
      },
      pricing: {
        video: '₹2,800',
        phone: '₹2,300',
        chat: '₹1,800'
      },
      bio: 'Expert in thyroid disorders and their impact on reproductive health. Specialized in managing PCOS with thyroid dysfunction.'
    }
  ];

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'pcos', name: 'PCOS & Hormone Disorders' },
    { id: 'fertility', name: 'Fertility & IVF' },
    { id: 'thyroid', name: 'Thyroid & Diabetes' },
    { id: 'nutrition', name: 'Nutrition & Lifestyle' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'chennai', name: 'Chennai' }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            provider.specialty.toLowerCase().includes(selectedSpecialty);
    const matchesLocation = selectedLocation === 'all' || 
                           provider.location.city.toLowerCase().includes(selectedLocation);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video size={16} color={colors.nude.roseGold} />;
      case 'Phone': return <Phone size={16} color={colors.nude.roseGold} />;
      case 'Chat': return <MessageCircle size={16} color={colors.nude.roseGold} />;
      default: return <Calendar size={16} color={colors.nude.roseGold} />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Healthcare Provider Network</Text>
        <Text style={styles.subtitle}>
          Connect with certified reproductive health specialists
        </Text>
      </View>

      <View style={styles.content}>
        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={colors.nude.textSecondary} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search doctors by name or specialty..."
              placeholderTextColor={colors.nude.textSecondary}
            />
          </View>
        </View>

        {/* Specialty Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty.id}
              style={[
                styles.filterButton,
                selectedSpecialty === specialty.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedSpecialty(specialty.id)}
            >
              <Text style={[
                styles.filterText,
                selectedSpecialty === specialty.id && styles.filterTextActive
              ]}>
                {specialty.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Location Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.filterButton,
                selectedLocation === location.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedLocation(location.id)}
            >
              <Text style={[
                styles.filterText,
                selectedLocation === location.id && styles.filterTextActive
              ]}>
                {location.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Providers List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Specialists ({filteredProviders.length})
          </Text>
          
          {filteredProviders.map((provider) => (
            <View key={provider.id} style={styles.providerCard}>
              <View style={styles.providerHeader}>
                <View style={styles.providerAvatar}>
                  <Text style={styles.avatarText}>
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerTitle}>{provider.title}</Text>
                  <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
                  
                  <View style={styles.providerStats}>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color={colors.nude.roseGold} />
                      <Text style={styles.ratingText}>{provider.rating}</Text>
                      <Text style={styles.reviewsText}>({provider.reviews} reviews)</Text>
                    </View>
                    <Text style={styles.experienceText}>{provider.experience} experience</Text>
                  </View>
                </View>
              </View>

              <View style={styles.providerDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={colors.nude.textSecondary} />
                  <Text style={styles.detailText}>
                    {provider.location.city}, {provider.location.state}
                    {provider.location.isRemote && ' • Remote Available'}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Clock size={16} color={colors.nude.textSecondary} />
                  <Text style={styles.detailText}>
                    Next available: {provider.availability.nextAvailable}
                  </Text>
                </View>

                <View style={styles.consultationTypes}>
                  <Text style={styles.consultationLabel}>Available for:</Text>
                  <View style={styles.consultationIcons}>
                    {provider.availability.consultationTypes.map((type) => (
                      <View key={type} style={styles.consultationType}>
                        {getConsultationIcon(type)}
                        <Text style={styles.consultationText}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.pricingContainer}>
                  <Text style={styles.pricingLabel}>Consultation Fees:</Text>
                  <View style={styles.pricingList}>
                    {Object.entries(provider.pricing).map(([type, price]) => (
                      <View key={type} style={styles.pricingItem}>
                        <Text style={styles.pricingType}>{type}:</Text>
                        <Text style={styles.pricingValue}>{price}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.providerActions}>
                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  onPress={() => onViewProfile(provider)}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => onBookConsultation(provider)}
                >
                  <Calendar size={16} color={colors.nude.background} />
                  <Text style={styles.bookButtonText}>Book Consultation</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Network Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Why Choose Our Network?</Text>
          
          <View style={styles.benefitItem}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Verified Specialists</Text>
              <Text style={styles.benefitDescription}>
                All doctors are board-certified with verified credentials
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Flexible Consultations</Text>
              <Text style={styles.benefitDescription}>
                Video, phone, or chat consultations available
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Integrated Care</Text>
              <Text style={styles.benefitDescription}>
                Seamless integration with your health data and test results
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <CheckCircle size={20} color={colors.semantic.balanced} />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Follow-up Support</Text>
              <Text style={styles.benefitDescription}>
                Continuous monitoring and support between consultations
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
  searchContainer: {
    marginBottom: spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  filterContainer: {
    marginBottom: spacing.md,
  },
  filterButton: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    borderColor: colors.nude.roseGold,
    backgroundColor: colors.nude.peach,
  },
  filterText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  filterTextActive: {
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
  providerCard: {
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
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  providerAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  providerTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.roseGold,
    marginBottom: spacing.xs,
  },
  providerSpecialty: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.sm,
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
  reviewsText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  experienceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  providerDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
  },
  consultationTypes: {
    marginBottom: spacing.sm,
  },
  consultationLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  consultationIcons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  consultationType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  consultationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  pricingContainer: {
    marginBottom: spacing.sm,
  },
  pricingLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  pricingList: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pricingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pricingType: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  pricingValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.roseGold,
  },
  providerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  viewProfileButton: {
    flex: 1,
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.nude.text,
  },
  viewProfileText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  bookButton: {
    flex: 1,
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  bookButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  benefitsCard: {
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
  benefitsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  benefitContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  benefitTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  benefitDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    lineHeight: 20,
  },
});
