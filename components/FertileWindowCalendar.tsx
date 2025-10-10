import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  Heart, 
  Droplets, 
  Calendar, 
  Target,
  Zap,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react-native';
import Svg, { Circle, Line, Text as SvgText, Path } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface CycleData {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  length: number;
  ovulationDay?: number;
  lutealPhaseLength?: number;
  symptoms: { date: string; type: string; severity?: number }[];
  basalBodyTemperature: { date: string; temp: number }[];
  cervicalMucus: { date: string; type: 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg-white' }[];
  periodFlow: { date: string; flow: 'light' | 'medium' | 'heavy' }[];
  lhTests: { date: string; value: number; positive: boolean }[];
}

interface FertileWindowData {
  date: string;
  type: 'period' | 'fertile_window' | 'ovulation' | 'low_fertility';
  probability: number; // 0-100
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
  recommendations: string[];
  symptoms?: string[];
  bbt?: number;
  cervicalMucus?: string;
  lhTest?: { value: number; positive: boolean };
}

interface FertileWindowCalendarProps {
  cycleHistory: CycleData[];
  currentCycleData: CycleData;
  onLogData: (date: string, dataType: string, value: any) => void;
  onViewInsights: () => void;
}

export default function FertileWindowCalendar({ 
  cycleHistory, 
  currentCycleData, 
  onLogData, 
  onViewInsights 
}: FertileWindowCalendarProps) {
  const [fertileWindowData, setFertileWindowData] = useState<FertileWindowData[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    generateFertileWindowData();
  }, [cycleHistory, currentCycleData]);

  const generateFertileWindowData = () => {
    if (cycleHistory.length < 2) {
      setFertileWindowData([]);
      return;
    }

    const newData: FertileWindowData[] = [];
    const today = new Date();
    
    // Calculate average cycle length
    const avgCycleLength = cycleHistory.reduce((sum, cycle) => sum + cycle.length, 0) / cycleHistory.length;
    const avgLutealPhase = cycleHistory
      .filter(c => c.lutealPhaseLength)
      .reduce((sum, c) => sum + (c.lutealPhaseLength || 14), 0) / 
      Math.max(cycleHistory.filter(c => c.lutealPhaseLength).length, 1);

    // Predict next period
    const lastPeriodStart = new Date(currentCycleData.startDate);
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(lastPeriodStart.getDate() + Math.round(avgCycleLength));

    // Predict ovulation (typically 14 days before next period)
    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(nextPeriodStart.getDate() - Math.round(avgLutealPhase));

    // Fertile window (5 days before ovulation + ovulation day + 1 day after)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    // Generate predictions for next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      let data: FertileWindowData;

      if (date >= nextPeriodStart && date <= new Date(nextPeriodStart.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        // Period prediction
        data = {
          date: dateStr,
          type: 'period',
          probability: 85,
          confidence: 'high',
          factors: ['Average cycle length', 'Historical data'],
          recommendations: ['Track flow intensity', 'Note any unusual symptoms', 'Rest and hydrate']
        };
      } else if (date.toDateString() === ovulationDate.toDateString()) {
        // Ovulation day
        data = {
          date: dateStr,
          type: 'ovulation',
          probability: 90,
          confidence: 'high',
          factors: ['Luteal phase calculation', 'Cycle regularity'],
          recommendations: ['Use ovulation predictor kit', 'Track cervical mucus', 'Monitor BBT rise']
        };
      } else if (date >= fertileStart && date <= fertileEnd) {
        // Fertile window
        const daysFromOvulation = Math.abs(date.getTime() - ovulationDate.getTime()) / (1000 * 60 * 60 * 24);
        const probability = date.toDateString() === ovulationDate.toDateString() ? 95 : 85 - (daysFromOvulation * 5);
        
        data = {
          date: dateStr,
          type: 'fertile_window',
          probability: Math.max(probability, 60),
          confidence: 'high',
          factors: ['Sperm survival window', 'Ovulation prediction'],
          recommendations: ['Optimal conception timing', 'Track cervical mucus changes', 'Consider intercourse']
        };
      } else {
        // Low fertility
        data = {
          date: dateStr,
          type: 'low_fertility',
          probability: 20,
          confidence: 'medium',
          factors: ['Outside fertile window'],
          recommendations: ['Focus on health optimization', 'Track symptoms', 'Prepare for next cycle']
        };
      }

      newData.push(data);
    }

    setFertileWindowData(newData);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
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

            const dateStr = date.toISOString().split('T')[0];
            const data = fertileWindowData.find(d => d.date === dateStr);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

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

            if (data) {
              switch (data.type) {
                case 'period':
                  backgroundColor = colors.reproductive.uterus;
                  textColor = colors.nude.background;
                  indicator = <Droplets size={12} color={colors.nude.background} />;
                  break;
                case 'ovulation':
                  backgroundColor = colors.semantic.healing;
                  textColor = colors.nude.background;
                  indicator = <Zap size={12} color={colors.nude.background} />;
                  break;
                case 'fertile_window':
                  backgroundColor = colors.reproductive.ovaries;
                  textColor = colors.nude.background;
                  indicator = <Heart size={12} color={colors.nude.background} />;
                  break;
                case 'low_fertility':
                  backgroundColor = colors.nude.background;
                  textColor = colors.nude.textSecondary;
                  break;
              }
            }

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
                {data && (
                  <View style={styles.probabilityIndicator}>
                    <Text style={styles.probabilityText}>{data.probability}%</Text>
                  </View>
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

    const dateStr = selectedDate.toISOString().split('T')[0];
    const data = fertileWindowData.find(d => d.date === dateStr);

    if (!data) return null;

    const getDataIcon = () => {
      switch (data.type) {
        case 'period': return <Droplets size={24} color={colors.reproductive.uterus} />;
        case 'ovulation': return <Zap size={24} color={colors.semantic.healing} />;
        case 'fertile_window': return <Heart size={24} color={colors.reproductive.ovaries} />;
        case 'low_fertility': return <Info size={24} color={colors.nude.textSecondary} />;
        default: return <Calendar size={24} color={colors.nude.text} />;
      }
    };

    const getDataTitle = () => {
      switch (data.type) {
        case 'period': return 'Predicted Period';
        case 'ovulation': return 'Ovulation Day';
        case 'fertile_window': return 'Fertile Window';
        case 'low_fertility': return 'Low Fertility';
        default: return 'Cycle Day';
      }
    };

    const getConfidenceColor = () => {
      switch (data.confidence) {
        case 'high': return colors.semantic.balanced;
        case 'medium': return colors.semantic.warning;
        case 'low': return colors.semantic.error;
        default: return colors.nude.textSecondary;
      }
    };

    return (
      <View style={styles.detailsCard}>
        <View style={styles.detailsHeader}>
          <View style={styles.detailsIcon}>
            {getDataIcon()}
          </View>
          <View style={styles.detailsInfo}>
            <Text style={styles.detailsTitle}>{getDataTitle()}</Text>
            <Text style={styles.detailsDate}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            <View style={styles.confidenceContainer}>
              <View style={[styles.confidenceDot, { backgroundColor: getConfidenceColor() }]} />
              <Text style={styles.confidenceText}>
                {data.confidence.toUpperCase()} CONFIDENCE
              </Text>
            </View>
          </View>
          <View style={styles.probabilityContainer}>
            <Text style={styles.probabilityValue}>{data.probability}%</Text>
            <Text style={styles.probabilityLabel}>Probability</Text>
          </View>
        </View>

        <View style={styles.factorsSection}>
          <Text style={styles.sectionTitle}>Key Factors</Text>
          {data.factors.map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <CheckCircle size={16} color={colors.semantic.balanced} />
              <Text style={styles.factorText}>{factor}</Text>
            </View>
          ))}
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {data.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Target size={16} color={colors.nude.roseGold} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setShowDetails(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFertilityChart = () => {
    const next7Days = fertileWindowData.slice(0, 7);
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>7-Day Fertility Forecast</Text>
        <View style={styles.chartContent}>
          <Svg width="100%" height={120} viewBox="0 0 300 120">
            {next7Days.map((data, index) => {
              const x = (index / 6) * 280 + 10;
              const y = 100 - (data.probability / 100) * 80;
              const color = data.type === 'fertile_window' ? colors.reproductive.ovaries :
                           data.type === 'ovulation' ? colors.semantic.healing :
                           data.type === 'period' ? colors.reproductive.uterus :
                           colors.nude.textSecondary;

              return (
                <Circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="6"
                  fill={color}
                />
              );
            })}
            
            {/* Connect points with line */}
            <Path
              d={next7Days.map((data, index) => {
                const x = (index / 6) * 280 + 10;
                const y = 100 - (data.probability / 100) * 80;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              stroke={colors.nude.roseGold}
              strokeWidth="2"
              fill="none"
            />
          </Svg>
        </View>
        
        <View style={styles.chartLegend}>
          {next7Days.map((data, index) => (
            <View key={index} style={styles.legendItem}>
              <Text style={styles.legendDate}>
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Text>
              <Text style={styles.legendProbability}>{data.probability}%</Text>
            </View>
          ))}
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

  const getTodayData = () => {
    const today = new Date().toISOString().split('T')[0];
    return fertileWindowData.find(d => d.date === today);
  };

  const todayData = getTodayData();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Fertile Window Calendar</Text>
        <Text style={styles.subtitle}>Track your most fertile days with precision</Text>
      </View>

      {/* Today's Status */}
      {todayData && (
        <View style={styles.todayStatusCard}>
          <View style={styles.todayStatusHeader}>
            <View style={styles.todayIcon}>
              {todayData.type === 'fertile_window' ? <Heart size={24} color={colors.nude.background} /> :
               todayData.type === 'ovulation' ? <Zap size={24} color={colors.nude.background} /> :
               todayData.type === 'period' ? <Droplets size={24} color={colors.nude.background} /> :
               <Info size={24} color={colors.nude.background} />}
            </View>
            <View style={styles.todayInfo}>
              <Text style={styles.todayTitle}>Today's Fertility</Text>
              <Text style={styles.todayStatus}>
                {todayData.type === 'fertile_window' ? 'Fertile Window' :
                 todayData.type === 'ovulation' ? 'Ovulation Day' :
                 todayData.type === 'period' ? 'Period Day' :
                 'Low Fertility'}
              </Text>
              <Text style={styles.todayProbability}>
                {todayData.probability}% probability
              </Text>
            </View>
          </View>
        </View>
      )}

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
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.uterus }]} />
            <Text style={styles.legendText}>Period</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.semantic.healing }]} />
            <Text style={styles.legendText}>Ovulation</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.reproductive.ovaries }]} />
            <Text style={styles.legendText}>Fertile Window</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.nude.textSecondary }]} />
            <Text style={styles.legendText}>Low Fertility</Text>
          </View>
        </View>
      </View>

      {/* Fertility Chart */}
      {renderFertilityChart()}

      {/* Selected Day Details Modal */}
      {renderSelectedDayDetails()}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLogData(new Date().toISOString().split('T')[0], 'symptom', '')}
        >
          <Plus size={20} color={colors.nude.roseGold} />
          <Text style={styles.actionButtonText}>Log Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onViewInsights}
        >
          <TrendingUp size={20} color={colors.nude.roseGold} />
          <Text style={styles.actionButtonText}>View Insights</Text>
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
  todayStatusCard: {
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
  todayStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.nude.roseGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  todayInfo: {
    flex: 1,
  },
  todayTitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  todayStatus: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.lg,
    color: colors.nude.text,
    marginBottom: spacing.xs,
  },
  todayProbability: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.roseGold,
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
  probabilityIndicator: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
  },
  probabilityText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 8,
    color: colors.nude.textSecondary,
    textAlign: 'center',
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
  chartContainer: {
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
  chartTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.md,
  },
  chartContent: {
    marginBottom: spacing.md,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.xs,
    color: colors.nude.textSecondary,
    textAlign: 'center',
  },
  legendProbability: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xs,
    color: colors.nude.text,
    textAlign: 'center',
  },
  detailsCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.nude.background,
    padding: spacing.lg,
    zIndex: 1000,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
  detailsDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.base,
    color: colors.nude.textSecondary,
    marginBottom: spacing.xs,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  confidenceText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  probabilityContainer: {
    alignItems: 'center',
  },
  probabilityValue: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.xl,
    color: colors.nude.roseGold,
  },
  probabilityLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.textSecondary,
  },
  factorsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.size.base,
    color: colors.nude.text,
    marginBottom: spacing.sm,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  factorText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  recommendationsSection: {
    marginBottom: spacing.lg,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recommendationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.sm,
    color: colors.nude.text,
    marginLeft: spacing.sm,
    flex: 1,
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
