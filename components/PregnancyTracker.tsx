import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  Heart, 
  Baby, 
  Calendar, 
  Clock, 
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  Camera,
  BookOpen,
  Stethoscope,
  Scale,
  Activity,
  Moon,
  Sun,
  Star,
  Shield,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3
} from 'lucide-react-native';
import Svg, { Circle, Line, Text as SvgText, Path, Rect } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface PregnancyData {
  conceptionDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  currentWeek: number;
  currentDay: number;
  trimester: 1 | 2 | 3;
  weightGain: { date: string; weight: number }[];
  symptoms: { date: string; symptom: string; severity: number }[];
  appointments: { date: string; type: string; notes: string }[];
  milestones: { date: string; milestone: string; completed: boolean }[];
  babySize: { week: number; size: string; weight: string }[];
  photos: { date: string; week: number; caption: string }[];
}

interface PregnancyTrackerProps {
  pregnancyData: PregnancyData;
  onLogData: (date: string, dataType: string, value: any) => void;
  onViewMilestones: () => void;
  onViewAppointments: () => void;
}

export default function PregnancyTracker({ 
  pregnancyData, 
  onLogData, 
  onViewMilestones, 
  onViewAppointments 
}: PregnancyTrackerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getPregnancyWeek = (date: Date) => {
    const conceptionDate = new Date(pregnancyData.conceptionDate);
    const daysDiff = Math.floor((date.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(daysDiff / 7) + 1;
  };

  const getTrimester = (week: number) => {
    if (week <= 12) return 1;
    if (week <= 28) return 2;
    return 3;
  };

  const getBabySize = (week: number) => {
    const sizes = [
      { week: 4, size: 'Poppy seed', weight: '0.04 oz' },
      { week: 8, size: 'Raspberry', weight: '0.04 oz' },
      { week: 12, size: 'Lime', weight: '0.5 oz' },
      { week: 16, size: 'Avocado', weight: '3.5 oz' },
      { week: 20, size: 'Banana', weight: '10.6 oz' },
      { week: 24, size: 'Corn', weight: '1.3 lbs' },
      { week: 28, size: 'Eggplant', weight: '2.2 lbs' },
      { week: 32, size: 'Jicama', weight: '3.8 lbs' },
      { week: 36, size: 'Romaine lettuce', weight: '5.8 lbs' },
      { week: 40, size: 'Watermelon', weight: '7.5 lbs' }
    ];

    const size = sizes.find(s => week <= s.week) || sizes[sizes.length - 1];
    return size;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const calendarDays: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const conceptionDate = new Date(pregnancyData.conceptionDate);
    const dueDate = new Date(pregnancyData.dueDate);

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.calendarGrid}>
          {calendarDays.map((date, index) => {
            if (!date) {
              return <View key={index} style={styles.emptyDay} />;
            }

            const week = getPregnancyWeek(date);
            const trimester = getTrimester(week);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isConception = date.toDateString() === conceptionDate.toDateString();
            const isDueDate = date.toDateString() === dueDate.toDateString();
            const isPregnancyPeriod = date >= conceptionDate && date <= dueDate;

            let dayStyle = styles.calendarDay;
            let textColor = colors.nude.text;
            let backgroundColor = colors.nude.card;
            let borderColor = colors.nude.border;
            let indicator = null;

            if (isToday) {
              borderColor = colors.nude.roseGold;
              backgroundColor = colors.nude.peach;
            }

            if (isSelected) {
              borderColor = colors.nude.text;
              backgroundColor = colors.nude.roseGold;
              textColor = colors.nude.background;
            }

            if (isConception) {
              backgroundColor = colors.semantic.healing;
              textColor = colors.nude.background;
              indicator = <Heart size={12} color={colors.nude.background} />;
            } else if (isDueDate) {
              backgroundColor = colors.reproductive.uterus;
              textColor = colors.nude.background;
              indicator = <Baby size={12} color={colors.nude.background} />;
            } else if (isPregnancyPeriod) {
              switch (trimester) {
                case 1:
                  backgroundColor = colors.reproductive.ovaries;
                  textColor = colors.nude.background;
                  break;
                case 2:
                  backgroundColor = colors.reproductive.thyroid;
                  textColor = colors.nude.background;
                  break;
                case 3:
                  backgroundColor = colors.reproductive.stress;
                  textColor = colors.nude.background;
                  break;
              }
            }

            // Check for appointments
            const hasAppointment = pregnancyData.appointments.some(apt => 
              new Date(apt.date).toDateString() === date.toDateString()
            );

            // Check for milestones
            const hasMilestone = pregnancyData.milestones.some(milestone => 
              new Date(milestone.date).toDateString() === date.toDateString()
            );

            return (
              <TouchableOpacity
                key={index}
                style={[
                  dayStyle,
                  { backgroundColor, borderColor },
                  isToday && styles.todayDay,
                  isSelected && styles.selectedDay
                ]}
                onPress={() => {
                  setSelectedDate(date);
                  setShowDetails(true);
                }}
              >
                <Text style={[styles.dayText, { color: textColor }]}>
                  {date.getDate()}
                </Text>
                {indicator && (
                  <View style={styles.dayIndicator}>
                    {indicator}
                  </View>
                )}
                {isPregnancyPeriod && (
                  <Text style={styles.weekText}>W{week}</Text>
                )}
                {hasAppointment && (
                  <View style={styles.appointmentDot} />
                )}
                {hasMilestone && (
                  <View style={styles.milestoneDot} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderSelectedDayDetails = () => {
    if (!selectedDate || !showDetails) return null;

    const week = getPregnancyWeek(selectedDate);
    const trimester = getTrimester(week);
    const babySize = getBabySize(week);
    const dateStr = selectedDate.toISOString().split('T')[0];

    const dayAppointments = pregnancyData.appointments.filter(apt => 
      new Date(apt.date).toDateString() === selectedDate.toDateString()
    );

    const dayMilestones = pregnancyData.milestones.filter(milestone => 
      new Date(milestone.date).toDateString() === selectedDate.toDateString()
    );

    const daySymptoms = pregnancyData.symptoms.filter(symptom => 
      new Date(symptom.date).toDateString() === selectedDate.toDateString()
    );

    return (
      <View style={styles.detailsCard}>
        <View style={styles.detailsHeader}>
          <View style={styles.detailsIcon}>
            <Baby size={24} color={colors.nude.background} />
          </View>
          <View style={styles.detailsInfo}>
            <Text style={styles.detailsTitle}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            <Text style={styles.detailsWeek}>
              Week {week} • Trimester {trimester}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.closeDetailsButton}
            onPress={() => setShowDetails(false)}
          >
            <Text style={styles.closeDetailsText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.babyInfo}>
          <Text style={styles.babyInfoTitle}>Baby Development</Text>
          <Text style={styles.babySizeText}>
            Size: {babySize.size} ({babySize.weight})
          </Text>
        </View>

        {dayAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appointments</Text>
            {dayAppointments.map((appointment, index) => (
              <View key={index} style={styles.appointmentItem}>
                <Stethoscope size={16} color={colors.nude.roseGold} />
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentType}>{appointment.type}</Text>
                  <Text style={styles.appointmentNotes}>{appointment.notes}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {dayMilestones.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Milestones</Text>
            {dayMilestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <CheckCircle 
                  size={16} 
                  color={milestone.completed ? colors.semantic.balanced : colors.nude.textSecondary} 
                />
                <Text style={[
                  styles.milestoneText,
                  milestone.completed && styles.completedMilestone
                ]}>
                  {milestone.milestone}
                </Text>
              </View>
            ))}
          </View>
        )}

        {daySymptoms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            {daySymptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <Activity size={16} color={colors.semantic.warning} />
                <Text style={styles.symptomText}>{symptom.symptom}</Text>
                <Text style={styles.severityText}>
                  {symptom.severity}/10
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.detailsActions}>
          <TouchableOpacity 
            style={styles.detailsActionButton}
            onPress={() => onLogData(dateStr, 'symptom', '')}
          >
            <Activity size={16} color={colors.nude.roseGold} />
            <Text style={styles.detailsActionText}>Log Symptom</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.detailsActionButton}
            onPress={() => onLogData(dateStr, 'appointment', '')}
          >
            <Calendar size={16} color={colors.nude.roseGold} />
            <Text style={styles.detailsActionText}>Add Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProgressChart = () => {
    const totalWeeks = 40;
    const currentWeek = pregnancyData.currentWeek;
    const progress = (currentWeek / totalWeeks) * 100;

    return (
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Pregnancy Progress</Text>
        <View style={styles.progressContainer}>
          <Svg width="100%" height={120} viewBox="0 0 300 120">
            {/* Progress circle */}
            <Circle
              cx="150"
              cy="60"
              r="50"
              stroke={colors.nude.border}
              strokeWidth="8"
              fill="none"
            />
            <Circle
              cx="150"
              cy="60"
              r="50"
              stroke={colors.nude.roseGold}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50 * (progress / 100)} ${2 * Math.PI * 50}`}
              strokeDashoffset={2 * Math.PI * 50 * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 150 60)"
            />
            <SvgText
              x="150"
              y="60"
              textAnchor="middle"
              fontSize="16"
              fontFamily={typography.fontFamily.semibold}
              fill={colors.nude.text}
            >
              {currentWeek}w
            </SvgText>
            <SvgText
              x="150"
              y="80"
              textAnchor="middle"
              fontSize="12"
              fontFamily={typography.fontFamily.regular}
              fill={colors.nude.textSecondary}
            >
              {Math.round(progress)}%
            </SvgText>
          </Svg>
        </View>
        
        <View style={styles.progressInfo}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Current Week</Text>
            <Text style={styles.progressValue}>{currentWeek}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Trimester</Text>
            <Text style={styles.progressValue}>{pregnancyData.trimester}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Days Left</Text>
            <Text style={styles.progressValue}>
              {Math.ceil((new Date(pregnancyData.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBabySizeComparison = () => {
    const currentWeek = pregnancyData.currentWeek;
    const babySize = getBabySize(currentWeek);

    return (
      <View style={styles.babySizeCard}>
        <Text style={styles.babySizeTitle}>Baby Size This Week</Text>
        <View style={styles.babySizeContainer}>
          <View style={styles.babySizeIcon}>
            <Baby size={32} color={colors.nude.roseGold} />
          </View>
          <View style={styles.babySizeInfo}>
            <Text style={styles.babySizeName}>{babySize.size}</Text>
            <Text style={styles.babySizeWeight}>{babySize.weight}</Text>
            <Text style={styles.babySizeWeek}>Week {currentWeek}</Text>
          </View>
        </View>
      </View>
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Pregnancy Tracker</Text>
        <Text style={styles.subtitle}>Track your journey to motherhood</Text>
      </View>

      {/* Progress Chart */}
      {renderProgressChart()}

      {/* Baby Size Comparison */}
      {renderBabySizeComparison()}

      {/* Calendar Navigation */}
      <View style={styles.calendarNavigation}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <ChevronRight size={24} color={colors.nude.text} />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      {renderCalendar()}

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.semantic.healing }]} />
            <Text style={styles.legendText}>Conception</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.ovaries }]} />
            <Text style={styles.legendText}>1st Trimester</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.thyroid }]} />
            <Text style={styles.legendText}>2nd Trimester</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.stress }]} />
            <Text style={styles.legendText}>3rd Trimester</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.uterus }]} />
            <Text style={styles.legendText}>Due Date</Text>
          </View>
        </View>
      </View>

      {/* Selected Day Details */}
      {renderSelectedDayDetails()}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onViewMilestones}
        >
          <Target size={20} color={colors.nude.roseGold} />
          <Text style={styles.actionButtonText}>Milestones</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onViewAppointments}
        >
          <Calendar size={20} color={colors.nude.roseGold} />
          <Text style={styles.actionButtonText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLogData(new Date().toISOString().split('T')[0], 'photo', '')}
        >
          <Camera size={20} color={colors.nude.roseGold} />
          <Text style={styles.actionButtonText}>Add Photo</Text>
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
  progressCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  progressValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  babySizeCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  babySizeTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  babySizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  babySizeIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.peach,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  babySizeInfo: {
    flex: 1,
  },
  babySizeName: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  babySizeWeight: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.base,
    color: colors.nude.roseGold,
    marginBottom: spacing.xs,
  },
  babySizeWeek: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  calendarNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  monthYear: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  calendarContainer: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    paddingVertical: spacing.sm,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    margin: 1,
    borderWidth: 1,
    borderColor: colors.nude.border,
    position: 'relative',
  },
  todayDay: {
    borderColor: colors.nude.roseGold,
    borderWidth: 2,
  },
  selectedDay: {
    borderColor: colors.nude.text,
    borderWidth: 2,
  },
  dayText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
  },
  dayIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  weekText: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    fontFamily: typography.fontFamily.regular,
    fontSize: 8,
    color: colors.nude.textSecondary,
  },
  appointmentDot: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.nude.roseGold,
  },
  milestoneDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.balanced,
  },
  legendContainer: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  legendTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.xs,
  },
  legendText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  detailsCard: {
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.lg,
    margin: spacing.lg,
    padding: spacing.md,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailsIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  detailsInfo: {
    flex: 1,
  },
  detailsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  detailsWeek: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
  },
  closeDetailsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.nude.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeDetailsText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
  },
  babyInfo: {
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  babyInfoTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  babySizeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  appointmentType: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  appointmentNotes: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  milestoneText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  completedMilestone: {
    textDecorationLine: 'line-through',
    color: colors.nude.textSecondary,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  symptomText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  severityText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.semantic.warning,
  },
  detailsActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  detailsActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  detailsActionText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nude.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
});
