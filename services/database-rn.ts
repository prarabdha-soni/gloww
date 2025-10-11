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

// Calculate Gloww Score based on user data
export const calculateGlowwScore = (userData: Partial<UserData>): number => {
  let score = 50; // Base score

  // Age factor
  if (userData.age === '26-35') score += 10;
  else if (userData.age === '36-45') score += 5;

  // Cycle regularity
  if (userData.cycleLength === '25-28 days') score += 15;
  else if (userData.cycleLength === '29-32 days') score += 10;
  else if (userData.cycleLength === 'Irregular') score -= 10;

  // Goals (positive)
  if (userData.goals?.includes('Balance my hormones')) score += 5;
  if (userData.goals?.includes('Track my period')) score += 5;
  if (userData.goals?.includes('Plan for pregnancy')) score += 3;

  // Symptoms (negative)
  const symptomCount = userData.symptoms?.filter(s => s !== 'None of these').length || 0;
  score -= symptomCount * 5;

  // Lifestyle
  if (userData.lifestyle?.includes('Very active')) score += 10;
  else if (userData.lifestyle?.includes('Moderately active')) score += 5;
  else if (userData.lifestyle?.includes('Sedentary')) score -= 5;

  return Math.max(20, Math.min(95, score));
};

// Clear all data (for testing)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      'userData',
      'userId',
      'isOnboardingComplete',
      'userCycles',
      'organHealth'
    ]);
    console.log('All data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
