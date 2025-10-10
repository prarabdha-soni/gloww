import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Heart, 
  Droplets, 
  Thermometer,
  Moon,
  Sun,
  Zap,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface PeriodDay {
  date: Date;
  isPeriod: boolean;
  flow: 'light' | 'medium' | 'heavy' | null;
  symptoms: string[];
  mood: 'happy' | 'sad' | 'anxious' | 'energetic' | 'irritable' | null;
  temperature: number | null;
  cervicalMucus: 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg-white' | null;
  ovulation: boolean;
  fertileWindow: boolean;
  predictedPeriod: boolean;
  cycleDay: number;
}

interface CycleData {
  length: number;
  averageLength: number;
  lastPeriod: Date;
  nextPeriod: Date;
  ovulationDate: Date;
  fertileWindow: { start: Date; end: Date };
  lutealPhase: number;
  follicularPhase: number;
}

interface PeriodCalendarProps {
  onDatePress: (date: Date, day: PeriodDay) => void;
  onAddPeriod: (date: Date) => void;
  onAddSymptom: (date: Date, symptom: string) => void;
  onViewInsights: () => void;
}

export default function PeriodCalendar({ 
  onDatePress, 
  onAddPeriod, 
  onAddSymptom, 
  onViewInsights 
}: PeriodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [periodDays, setPeriodDays] = useState<Map<string, PeriodDay>>(new Map());
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [showSymptomPicker, setShowSymptomPicker] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const symptoms = [
    { id: 'cramps', name: 'Cramps', icon: '💢', color: colors.semantic.error },
    { id: 'bloating', name: 'Bloating', icon: '🎈', color: colors.semantic.warning },
    { id: 'headache', name: 'Headache', icon: '🤕', color: colors.semantic.error },
    { id: 'fatigue', name: 'Fatigue', icon: '😴', color: colors.semantic.warning },
    { id: 'mood_swings', name: 'Mood Swings', icon: '😵', color: colors.semantic.rising },
    { id: 'acne', name: 'Acne', icon: '🔴', color: colors.semantic.error },
    { id: 'breast_tenderness', name: 'Breast Tenderness', icon: '👙', color: colors.semantic.warning },
    { id: 'back_pain', name: 'Back Pain', icon: '🦴', color: colors.semantic.error },
    { id: 'nausea', name: 'Nausea', icon: '🤢', color: colors.semantic.warning },
    { id: 'insomnia', name: 'Insomnia', icon: '🌙', color: colors.semantic.rising }
  ];

  const moods = [
    { id: 'happy', name: 'Happy', icon: '😊', color: colors.semantic.balanced },
    { id: 'sad', name: 'Sad', icon: '😢', color: colors.semantic.error },
    { id: 'anxious', name: 'Anxious', icon: '😰', color: colors.semantic.warning },
    { id: 'energetic', name: 'Energetic', icon: '⚡', color: colors.semantic.healing },
    { id: 'irritable', name: 'Irritable', icon: '😠', color: colors.semantic.rising }
  ];

  useEffect(() => {
    generateCycleData();
    loadPeriodData();
  }, []);

  const generateCycleData = () => {
    // Simulate cycle data - in real app, this would come from user's historical data
    const today = new Date();
    const lastPeriod = new Date(today);
    lastPeriod.setDate(today.getDate() - 14); // 14 days ago
    
    const cycleLength = 28;
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + 14);
    
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
    
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    setCycleData({
      length: cycleLength,
      averageLength: 28,
      lastPeriod,
      nextPeriod,
      ovulationDate,
      fertileWindow: { start: fertileStart, end: fertileEnd },
      lutealPhase: 14,
      follicularPhase: 14
    });
  };

  const loadPeriodData = () => {
    // Simulate existing period data
    const data = new Map<string, PeriodDay>();
    const today = new Date();
    
    // Add some sample period days
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - 14 + i);
      const key = date.toISOString().split('T')[0];
      
      data.set(key, {
        date,
        isPeriod: true,
        flow: i === 0 ? 'heavy' : i === 4 ? 'light' : 'medium',
        symptoms: i === 0 ? ['cramps', 'fatigue'] : i === 2 ? ['bloating'] : [],
        mood: i === 0 ? 'irritable' : i === 2 ? 'sad' : null,
        temperature: null,
        cervicalMucus: null,
        ovulation: false,
        fertileWindow: false,
        predictedPeriod: false,
        cycleDay: i + 1
      });
    }

    setPeriodDays(data);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getDayData = (date: Date): PeriodDay | null => {
    const key = date.toISOString().split('T')[0];
    return periodDays.get(key) || null;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isInFertileWindow = (date: Date) => {
    if (!cycleData) return false;
    return date >= cycleData.fertileWindow.start && date <= cycleData.fertileWindow.end;
  };

  const isOvulationDay = (date: Date) => {
    if (!cycleData) return false;
    return date.toDateString() === cycleData.ovulationDate.toDateString();
  };

  const isPredictedPeriod = (date: Date) => {
    if (!cycleData) return false;
    return date >= cycleData.nextPeriod && date <= new Date(cycleData.nextPeriod.getTime() + 5 * 24 * 60 * 60 * 1000);
  };

  const getCycleDay = (date: Date) => {
    if (!cycleData) return 0;
    const daysSinceLastPeriod = Math.floor((date.getTime() - cycleData.lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceLastPeriod + 1;
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    const dayData = getDayData(date);
    onDatePress(date, dayData || {
      date,
      isPeriod: false,
      flow: null,
      symptoms: [],
      mood: null,
      temperature: null,
      cervicalMucus: null,
      ovulation: isOvulationDay(date),
      fertileWindow: isInFertileWindow(date),
      predictedPeriod: isPredictedPeriod(date),
      cycleDay: getCycleDay(date)
    });
  };

  const handleAddPeriod = () => {
    if (selectedDate) {
      onAddPeriod(selectedDate);
      setShowSymptomPicker(true);
    }
  };

  const handleAddSymptom = (symptom: string) => {
    if (selectedDate) {
      onAddSymptom(selectedDate, symptom);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDayStyle = (date: Date) => {
    const dayData = getDayData(date);
    const isFertile = isInFertileWindow(date);
    const isOvulation = isOvulationDay(date);
    const isPredicted = isPredictedPeriod(date);
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

    if (dayData?.isPeriod) {
      return {
        backgroundColor: colors.reproductive.uterus,
        borderColor: colors.reproductive.uterus,
        borderWidth: 2
      };
    }

    if (isOvulation) {
      return {
        backgroundColor: colors.semantic.healing,
        borderColor: colors.semantic.healing,
        borderWidth: 2
      };
    }

    if (isFertile) {
      return {
        backgroundColor: colors.reproductive.ovaries,
        borderColor: colors.reproductive.ovaries,
        borderWidth: 1
      };
    }

    if (isPredicted) {
      return {
        backgroundColor: colors.nude.peach,
        borderColor: colors.nude.peach,
        borderWidth: 1
      };
    }

    if (isSelected) {
      return {
        backgroundColor: colors.nude.roseGold,
        borderColor: colors.nude.roseGold,
        borderWidth: 2
      };
    }

    return {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 1
    };
  };

  const getDayTextColor = (date: Date) => {
    const dayData = getDayData(date);
    const isFertile = isInFertileWindow(date);
    const isOvulation = isOvulationDay(date);
    const isPredicted = isPredictedPeriod(date);

    if (dayData?.isPeriod || isOvulation) {
      return colors.nude.background;
    }

    if (isFertile || isPredicted) {
      return colors.nude.text;
    }

    return colors.nude.text;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <View style={styles.calendarGrid}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayHeader}>{day}</Text>
        ))}
        {days.map((date, index) => {
          if (!date) {
            return <View key={index} style={styles.emptyDay} />;
          }

          const dayData = getDayData(date);
          const isFertile = isInFertileWindow(date);
          const isOvulation = isOvulationDay(date);
          const isPredicted = isPredictedPeriod(date);
          const cycleDay = getCycleDay(date);

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayCell, getDayStyle(date)]}
              onPress={() => handleDatePress(date)}
            >
              <Text style={[styles.dayText, { color: getDayTextColor(date) }]}>
                {date.getDate()}
              </Text>
              
              {/* Period flow indicator */}
              {dayData?.flow && (
                <View style={[
                  styles.flowIndicator,
                  { backgroundColor: dayData.flow === 'heavy' ? colors.semantic.error : 
                                   dayData.flow === 'medium' ? colors.semantic.warning : 
                                   colors.semantic.healing }
                ]} />
              )}

              {/* Ovulation indicator */}
              {isOvulation && (
                <View style={styles.ovulationIndicator}>
                  <Zap size={8} color={colors.nude.background} />
                </View>
              )}

              {/* Fertile window indicator */}
              {isFertile && !isOvulation && (
                <View style={styles.fertileIndicator} />
              )}

              {/* Predicted period indicator */}
              {isPredicted && (
                <View style={styles.predictedIndicator} />
              )}

              {/* Cycle day */}
              {cycleDay > 0 && cycleDay <= 35 && (
                <Text style={styles.cycleDayText}>{cycleDay}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderSelectedDayInfo = () => {
    if (!selectedDate) return null;

    const dayData = getDayData(selectedDate);
    const isFertile = isInFertileWindow(selectedDate);
    const isOvulation = isOvulationDay(selectedDate);
    const isPredicted = isPredictedPeriod(selectedDate);
    const cycleDay = getCycleDay(selectedDate);

    return (
      <View style={styles.selectedDayInfo}>
        <Text style={styles.selectedDayTitle}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>

        <View style={styles.dayStatus}>
          {dayData?.isPeriod && (
            <View style={styles.statusItem}>
              <Droplets size={16} color={colors.reproductive.uterus} />
              <Text style={styles.statusText}>Period Day {dayData.cycleDay}</Text>
            </View>
          )}

          {isOvulation && (
            <View style={styles.statusItem}>
              <Zap size={16} color={colors.semantic.healing} />
              <Text style={styles.statusText}>Ovulation Day</Text>
            </View>
          )}

          {isFertile && !isOvulation && (
            <View style={styles.statusItem}>
              <Heart size={16} color={colors.reproductive.ovaries} />
              <Text style={styles.statusText}>Fertile Window</Text>
            </View>
          )}

          {isPredicted && (
            <View style={styles.statusItem}>
              <Moon size={16} color={colors.nude.peach} />
              <Text style={styles.statusText}>Predicted Period</Text>
            </View>
          )}

          {cycleDay > 0 && (
            <View style={styles.statusItem}>
              <Clock size={16} color={colors.nude.textSecondary} />
              <Text style={styles.statusText}>Cycle Day {cycleDay}</Text>
            </View>
          )}
        </View>

        {dayData && (
          <View style={styles.dayDetails}>
            {dayData.symptoms.length > 0 && (
              <View style={styles.symptomsSection}>
                <Text style={styles.sectionTitle}>Symptoms</Text>
                <View style={styles.symptomsList}>
                  {dayData.symptoms.map((symptom, index) => {
                    const symptomData = symptoms.find(s => s.id === symptom);
                    return (
                      <View key={index} style={styles.symptomItem}>
                        <Text style={styles.symptomEmoji}>{symptomData?.icon}</Text>
                        <Text style={styles.symptomText}>{symptomData?.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {dayData.mood && (
              <View style={styles.moodSection}>
                <Text style={styles.sectionTitle}>Mood</Text>
                <View style={styles.moodItem}>
                  <Text style={styles.moodEmoji}>
                    {moods.find(m => m.id === dayData.mood)?.icon}
                  </Text>
                  <Text style={styles.moodText}>
                    {moods.find(m => m.id === dayData.mood)?.name}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.dayActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddPeriod}
          >
            <Droplets size={16} color={colors.nude.roseGold} />
            <Text style={styles.actionText}>Log Period</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowSymptomPicker(true)}
          >
            <Activity size={16} color={colors.nude.roseGold} />
            <Text style={styles.actionText}>Add Symptom</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCycleInsights = () => {
    if (!cycleData) return null;

    return (
      <View style={styles.cycleInsights}>
        <Text style={styles.insightsTitle}>Cycle Insights</Text>
        
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Target size={20} color={colors.semantic.healing} />
            <Text style={styles.insightTitle}>Fertile Window</Text>
          </View>
          <Text style={styles.insightText}>
            {cycleData.fertileWindow.start.toLocaleDateString()} - {cycleData.fertileWindow.end.toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Moon size={20} color={colors.reproductive.uterus} />
            <Text style={styles.insightTitle}>Next Period</Text>
          </View>
          <Text style={styles.insightText}>
            {cycleData.nextPeriod.toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <TrendingUp size={20} color={colors.nude.roseGold} />
            <Text style={styles.insightTitle}>Cycle Length</Text>
          </View>
          <Text style={styles.insightText}>
            {cycleData.length} days (Average: {cycleData.averageLength} days)
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.insightsButton}
          onPress={onViewInsights}
        >
          <Brain size={16} color={colors.nude.background} />
          <Text style={styles.insightsButtonText}>View Detailed Analytics</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')}>
          <ChevronRight size={24} color={colors.nude.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        {renderCalendar()}
      </View>

      {renderSelectedDayInfo()}
      {renderCycleInsights()}

      {showSymptomPicker && (
        <View style={styles.symptomPicker}>
          <Text style={styles.pickerTitle}>Add Symptoms</Text>
          <View style={styles.symptomsGrid}>
            {symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={styles.symptomButton}
                onPress={() => {
                  handleAddSymptom(symptom.id);
                  setShowSymptomPicker(false);
                }}
              >
                <Text style={styles.symptomEmoji}>{symptom.icon}</Text>
                <Text style={styles.symptomName}>{symptom.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowSymptomPicker(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.nude.card,
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
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
    paddingVertical: spacing.sm,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    margin: 1,
    position: 'relative',
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
    margin: 1,
  },
  dayText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
  },
  flowIndicator: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    height: 3,
    borderRadius: 2,
  },
  ovulationIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.semantic.healing,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fertileIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.reproductive.ovaries,
  },
  predictedIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.nude.peach,
  },
  cycleDayText: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 8,
    fontFamily: typography.fontFamily.regular,
    color: colors.nude.textSecondary,
  },
  selectedDayInfo: {
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
  selectedDayTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  dayStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.peach,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  dayDetails: {
    marginBottom: spacing.md,
  },
  symptomsSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  symptomEmoji: {
    fontSize: 16,
  },
  symptomText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  moodSection: {
    marginBottom: spacing.md,
  },
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  dayActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  actionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.text,
  },
  cycleInsights: {
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
  insightsTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  insightCard: {
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  insightTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
  },
  insightText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  insightsButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  insightsButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
  symptomPicker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.nude.card,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: colors.nude.text,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  pickerTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  symptomButton: {
    width: '30%',
    backgroundColor: colors.nude.background,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    gap: spacing.xs,
  },
  symptomName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.text,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: colors.nude.text,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.background,
  },
});

