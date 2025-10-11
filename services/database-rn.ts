// React Native compatible database service
// This version uses AsyncStorage for local data persistence
// and provides a mock MongoDB-like interface

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  _id?: string;
  name: string;
  age: string;
  cycleLength: string;
  goals: string[];
  symptoms: string[];
  lifestyle: string;
  glowwScore: number;
  createdAt: Date;
  updatedAt: Date;
  isOnboardingComplete: boolean;
}

export interface CycleData {
  _id?: string;
  userId: string;
  startDate: string;
  endDate: string;
  length: number;
  ovulationDay?: number;
  lutealPhaseLength?: number;
  symptoms: { date: string; type: string; severity?: number }[];
  basalBodyTemperature: { date: string; temp: number }[];
  cervicalMucus: { date: string; type: string }[];
  periodFlow: { date: string; flow: string }[];
  lhTests: { date: string; value: number; positive: boolean }[];
  createdAt: Date;
}

export interface OrganHealth {
  _id?: string;
  userId: string;
  uterus: { status: string; progress: number };
  ovaries: { status: string; progress: number };
  thyroid: { status: string; progress: number };
  stress: { status: string; progress: number };
  updatedAt: Date;
}

// Generate a simple ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// User operations
export const saveUserData = async (userData: Omit<UserData, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    const userId = generateId();
    
    const user: UserData = {
      ...userData,
      _id: userId,
      createdAt: now,
      updatedAt: now,
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('isOnboardingComplete', 'true');
    
    console.log('User data saved locally:', user);
    return userId;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, updates: Partial<UserData>): Promise<void> => {
  try {
    const existingUser = await getUserById(userId);
    if (existingUser) {
      const updatedUser = {
        ...existingUser,
        ...updates,
        updatedAt: new Date(),
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Cycle operations
export const saveCycleData = async (cycleData: Omit<CycleData, '_id' | 'createdAt'>): Promise<string> => {
  try {
    const now = new Date();
    const cycleId = generateId();
    
    const cycle: CycleData = {
      ...cycleData,
      _id: cycleId,
      createdAt: now,
    };

    // Save to AsyncStorage
    const existingCycles = await AsyncStorage.getItem('userCycles');
    const cycles = existingCycles ? JSON.parse(existingCycles) : [];
    cycles.push(cycle);
    await AsyncStorage.setItem('userCycles', JSON.stringify(cycles));
    
    console.log('Cycle data saved locally:', cycle);
    return cycleId;
  } catch (error) {
    console.error('Error saving cycle data:', error);
    throw error;
  }
};

export const getUserCycles = async (userId: string): Promise<CycleData[]> => {
  try {
    const cyclesData = await AsyncStorage.getItem('userCycles');
    if (cyclesData) {
      const cycles = JSON.parse(cyclesData);
      return cycles.filter((cycle: CycleData) => cycle.userId === userId);
    }
    return [];
  } catch (error) {
    console.error('Error fetching user cycles:', error);
    throw error;
  }
};

// Organ health operations
export const saveOrganHealth = async (organHealth: Omit<OrganHealth, '_id' | 'updatedAt'>): Promise<string> => {
  try {
    const now = new Date();
    const healthId = generateId();
    
    const health: OrganHealth = {
      ...organHealth,
      _id: healthId,
      updatedAt: now,
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem('organHealth', JSON.stringify(health));
    
    console.log('Organ health saved locally:', health);
    return healthId;
  } catch (error) {
    console.error('Error saving organ health:', error);
    throw error;
  }
};

export const getUserOrganHealth = async (userId: string): Promise<OrganHealth | null> => {
  try {
    const organHealthData = await AsyncStorage.getItem('organHealth');
    if (organHealthData) {
      const health = JSON.parse(organHealthData);
      if (health.userId === userId) {
        return health;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching organ health:', error);
    throw error;
  }
};

export const updateOrganHealth = async (userId: string, updates: Partial<OrganHealth>): Promise<void> => {
  try {
    const existingHealth = await getUserOrganHealth(userId);
    if (existingHealth) {
      const updatedHealth = {
        ...existingHealth,
        ...updates,
        updatedAt: new Date(),
      };
      await AsyncStorage.setItem('organHealth', JSON.stringify(updatedHealth));
    } else {
      // Create new organ health record
      const newHealth: OrganHealth = {
        _id: generateId(),
        userId,
        uterus: { status: 'healing', progress: 30 },
        ovaries: { status: 'balanced', progress: 75 },
        thyroid: { status: 'rising', progress: 60 },
        stress: { status: 'rising', progress: 45 },
        updatedAt: new Date(),
        ...updates,
      };
      await AsyncStorage.setItem('organHealth', JSON.stringify(newHealth));
    }
  } catch (error) {
    console.error('Error updating organ health:', error);
    throw error;
  }
};

// Enhanced Gloww Score calculation based on symptoms, diseases, and health progression
export const calculateGlowwScore = (userData: Partial<UserData>, recentSymptoms?: any[], diseaseHistory?: any[]): number => {
  let score = 50; // Base score

  // Age factor (optimal reproductive age gets bonus)
  if (userData.age === '26-35') score += 10;
  else if (userData.age === '36-45') score += 5;
  else if (userData.age === '18-25') score += 8; // Young adults get slight bonus
  else if (userData.age === '46-55') score += 2; // Perimenopause consideration
  else score -= 5; // 55+ may have different health considerations

  // Cycle regularity (most important factor)
  if (userData.cycleLength === '25-28 days') score += 20; // Optimal cycle
  else if (userData.cycleLength === '29-32 days') score += 15; // Still good
  else if (userData.cycleLength === '21-24 days') score += 10; // Short but regular
  else if (userData.cycleLength === '33+ days') score += 5; // Long but regular
  else if (userData.cycleLength === 'Irregular') score -= 25; // Major red flag

  // Disease and condition detection
  const detectedConditions = detectHealthConditions(userData.symptoms || []);
  
  // PCOS detection and scoring
  if (detectedConditions.includes('PCOS')) {
    score -= 30; // Significant impact
    // But if managing well, can improve
    if (userData.goals?.includes('Manage PCOS')) score += 10;
  }
  
  // Thyroid issues
  if (detectedConditions.includes('Thyroid Issues')) {
    score -= 20;
    if (userData.goals?.includes('Balance my hormones')) score += 5;
  }
  
  // Hormonal imbalances
  if (detectedConditions.includes('Hormonal Imbalance')) {
    score -= 15;
  }
  
  // Endometriosis
  if (detectedConditions.includes('Endometriosis')) {
    score -= 25;
  }

  // Symptom severity analysis
  const symptomImpact = analyzeSymptomImpact(userData.symptoms || []);
  score += symptomImpact;

  // Recent symptoms tracking (if provided)
  if (recentSymptoms && recentSymptoms.length > 0) {
    const recentImpact = analyzeRecentSymptoms(recentSymptoms);
    score += recentImpact;
  }

  // Disease progression tracking (if provided)
  if (diseaseHistory && diseaseHistory.length > 0) {
    const progressionImpact = analyzeDiseaseProgression(diseaseHistory);
    score += progressionImpact;
  }

  // Goals and positive actions (motivation factor)
  if (userData.goals?.includes('Balance my hormones')) score += 8;
  if (userData.goals?.includes('Track my period')) score += 5;
  if (userData.goals?.includes('Plan for pregnancy')) score += 3;
  if (userData.goals?.includes('Manage PCOS')) score += 6;
  if (userData.goals?.includes('Reduce stress')) score += 4;

  // Lifestyle impact
  if (userData.lifestyle?.includes('Very active')) score += 12;
  else if (userData.lifestyle?.includes('Moderately active')) score += 8;
  else if (userData.lifestyle?.includes('Lightly active')) score += 3;
  else if (userData.lifestyle?.includes('Sedentary')) score -= 8;

  // Stress management (if tracked)
  if (userData.goals?.includes('Reduce stress')) score += 5;

  return Math.max(15, Math.min(95, score));
};

// Detect health conditions based on symptoms
const detectHealthConditions = (symptoms: string[]): string[] => {
  const conditions: string[] = [];
  
  // PCOS indicators
  const pcosSymptoms = ['Irregular periods', 'Weight gain', 'Hair loss', 'Acne'];
  const pcosCount = symptoms.filter(s => pcosSymptoms.includes(s)).length;
  if (pcosCount >= 3) conditions.push('PCOS');
  
  // Thyroid issues
  const thyroidSymptoms = ['Fatigue', 'Weight gain', 'Hair loss', 'Mood swings'];
  const thyroidCount = symptoms.filter(s => thyroidSymptoms.includes(s)).length;
  if (thyroidCount >= 2) conditions.push('Thyroid Issues');
  
  // Hormonal imbalance
  const hormonalSymptoms = ['Irregular periods', 'Mood swings', 'Heavy bleeding', 'Painful cramps'];
  const hormonalCount = symptoms.filter(s => hormonalSymptoms.includes(s)).length;
  if (hormonalCount >= 2) conditions.push('Hormonal Imbalance');
  
  // Endometriosis
  const endoSymptoms = ['Painful cramps', 'Heavy bleeding', 'Irregular periods'];
  const endoCount = symptoms.filter(s => endoSymptoms.includes(s)).length;
  if (endoCount >= 2) conditions.push('Endometriosis');
  
  return conditions;
};

// Analyze symptom impact on score
const analyzeSymptomImpact = (symptoms: string[]): number => {
  let impact = 0;
  
  // High impact symptoms
  const highImpact = ['Irregular periods', 'Heavy bleeding', 'Painful cramps'];
  const highCount = symptoms.filter(s => highImpact.includes(s)).length;
  impact -= highCount * 8;
  
  // Medium impact symptoms
  const mediumImpact = ['Mood swings', 'Fatigue', 'Weight gain'];
  const mediumCount = symptoms.filter(s => mediumImpact.includes(s)).length;
  impact -= mediumCount * 5;
  
  // Low impact symptoms
  const lowImpact = ['Hair loss', 'Acne'];
  const lowCount = symptoms.filter(s => lowImpact.includes(s)).length;
  impact -= lowCount * 3;
  
  return impact;
};

// Analyze recent symptoms for trend
const analyzeRecentSymptoms = (recentSymptoms: any[]): number => {
  let impact = 0;
  
  // If symptoms are improving (fewer recent symptoms)
  if (recentSymptoms.length < 3) impact += 5;
  else if (recentSymptoms.length > 5) impact -= 10;
  
  // If severe symptoms are decreasing
  const severeSymptoms = recentSymptoms.filter(s => s.severity >= 3);
  if (severeSymptoms.length === 0) impact += 8;
  else if (severeSymptoms.length > 2) impact -= 12;
  
  return impact;
};

// Analyze disease progression
const analyzeDiseaseProgression = (diseaseHistory: any[]): number => {
  let impact = 0;
  
  // If conditions are being managed/improving
  const recentImprovements = diseaseHistory.filter(d => d.status === 'improving');
  if (recentImprovements.length > 0) impact += 10;
  
  // If conditions are worsening
  const recentWorsening = diseaseHistory.filter(d => d.status === 'worsening');
  if (recentWorsening.length > 0) impact -= 15;
  
  // If new conditions are detected
  const newConditions = diseaseHistory.filter(d => d.isNew);
  if (newConditions.length > 0) impact -= 8;
  
  return impact;
};

// Track new symptoms and update score
export const trackSymptom = async (userId: string, symptom: { type: string; severity: number; date: string; notes?: string }): Promise<void> => {
  try {
    // Get existing symptoms
    const existingSymptoms = await AsyncStorage.getItem('userSymptoms');
    const symptoms = existingSymptoms ? JSON.parse(existingSymptoms) : [];
    
    // Add new symptom
    symptoms.push({
      id: generateId(),
      userId,
      ...symptom,
      createdAt: new Date()
    });
    
    // Save updated symptoms
    await AsyncStorage.setItem('userSymptoms', JSON.stringify(symptoms));
    
    // Update Gloww Score based on new symptom
    await updateGlowwScore(userId);
    
    console.log('Symptom tracked and score updated');
  } catch (error) {
    console.error('Error tracking symptom:', error);
    throw error;
  }
};

// Get user's recent symptoms
export const getRecentSymptoms = async (userId: string, days: number = 30): Promise<any[]> => {
  try {
    const symptomsData = await AsyncStorage.getItem('userSymptoms');
    if (symptomsData) {
      const allSymptoms = JSON.parse(symptomsData);
      const userSymptoms = allSymptoms.filter((s: any) => s.userId === userId);
      
      // Filter by date (last 30 days by default)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return userSymptoms.filter((s: any) => new Date(s.date) >= cutoffDate);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recent symptoms:', error);
    throw error;
  }
};

// Update Gloww Score based on current data
export const updateGlowwScore = async (userId: string): Promise<number> => {
  try {
    // Get user data
    const userData = await getUserById(userId);
    if (!userData) throw new Error('User not found');
    
    // Get recent symptoms
    const recentSymptoms = await getRecentSymptoms(userId, 30);
    
    // Get disease history
    const diseaseHistory = await getDiseaseHistory(userId);
    
    // Calculate new score
    const newScore = calculateGlowwScore(userData, recentSymptoms, diseaseHistory);
    
    // Update user data with new score
    await updateUserData(userId, { glowwScore: newScore });
    
    // Update organ health based on new score
    await updateOrganHealthFromScore(userId, newScore);
    
    console.log(`Gloww Score updated to: ${newScore}`);
    return newScore;
  } catch (error) {
    console.error('Error updating Gloww Score:', error);
    throw error;
  }
};

// Get disease history
export const getDiseaseHistory = async (userId: string): Promise<any[]> => {
  try {
    const diseaseData = await AsyncStorage.getItem('diseaseHistory');
    if (diseaseData) {
      const allDiseases = JSON.parse(diseaseData);
      return allDiseases.filter((d: any) => d.userId === userId);
    }
    return [];
  } catch (error) {
    console.error('Error fetching disease history:', error);
    throw error;
  }
};

// Track disease progression
export const trackDiseaseProgression = async (userId: string, disease: { condition: string; status: 'improving' | 'stable' | 'worsening'; isNew: boolean; notes?: string }): Promise<void> => {
  try {
    // Get existing disease history
    const existingHistory = await AsyncStorage.getItem('diseaseHistory');
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new disease entry
    history.push({
      id: generateId(),
      userId,
      ...disease,
      date: new Date().toISOString(),
      createdAt: new Date()
    });
    
    // Save updated history
    await AsyncStorage.setItem('diseaseHistory', JSON.stringify(history));
    
    // Update Gloww Score
    await updateGlowwScore(userId);
    
    console.log('Disease progression tracked and score updated');
  } catch (error) {
    console.error('Error tracking disease progression:', error);
    throw error;
  }
};

// Update organ health based on Gloww Score
const updateOrganHealthFromScore = async (userId: string, score: number): Promise<void> => {
  try {
    const organHealth = {
      userId,
      uterus: { 
        status: score >= 70 ? 'balanced' : score >= 50 ? 'healing' : 'rising', 
        progress: Math.max(20, Math.min(90, score - 10)) 
      },
      ovaries: { 
        status: score >= 80 ? 'balanced' : score >= 60 ? 'healing' : 'rising', 
        progress: Math.max(30, Math.min(95, score - 5)) 
      },
      thyroid: { 
        status: score >= 75 ? 'balanced' : score >= 55 ? 'healing' : 'rising', 
        progress: Math.max(25, Math.min(90, score - 15)) 
      },
      stress: { 
        status: score >= 60 ? 'balanced' : score >= 40 ? 'healing' : 'rising', 
        progress: Math.max(15, Math.min(85, score - 20)) 
      },
      updatedAt: new Date()
    };
    
    await saveOrganHealth(organHealth);
  } catch (error) {
    console.error('Error updating organ health from score:', error);
    throw error;
  }
};

// Get health insights based on current score and symptoms
export const getHealthInsights = async (userId: string): Promise<any[]> => {
  try {
    const userData = await getUserById(userId);
    const recentSymptoms = await getRecentSymptoms(userId, 30);
    const diseaseHistory = await getDiseaseHistory(userId);
    
    const insights: any[] = [];
    
    // Analyze symptoms for insights
    if (recentSymptoms.length > 3) {
      insights.push({
        type: 'warning',
        title: 'Multiple Symptoms Detected',
        message: 'You\'re experiencing several symptoms. Consider consulting a healthcare provider.',
        priority: 'high'
      });
    }
    
    // Check for PCOS indicators
    const pcosSymptoms = recentSymptoms.filter(s => 
      ['Irregular periods', 'Weight gain', 'Hair loss', 'Acne'].includes(s.type)
    );
    if (pcosSymptoms.length >= 3) {
      insights.push({
        type: 'alert',
        title: 'PCOS Indicators Detected',
        message: 'Your symptoms suggest possible PCOS. Please consult a healthcare provider for proper diagnosis.',
        priority: 'high'
      });
    }
    
    // Check for improvement
    const improvingConditions = diseaseHistory.filter(d => d.status === 'improving');
    if (improvingConditions.length > 0) {
      insights.push({
        type: 'positive',
        title: 'Health Improvements Detected',
        message: 'Great news! Your health conditions are showing improvement.',
        priority: 'medium'
      });
    }
    
    // Lifestyle recommendations
    if (userData?.lifestyle?.includes('Sedentary')) {
      insights.push({
        type: 'recommendation',
        title: 'Increase Physical Activity',
        message: 'Regular exercise can help improve your reproductive health and Gloww Score.',
        priority: 'medium'
      });
    }
    
    return insights;
  } catch (error) {
    console.error('Error getting health insights:', error);
    throw error;
  }
};

// Clear all data (for testing)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      'userData',
      'userId',
      'isOnboardingComplete',
      'userCycles',
      'organHealth',
      'userSymptoms',
      'diseaseHistory'
    ]);
    console.log('All data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
