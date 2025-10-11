import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection URL - replace with your actual connection string
const DB_URL = process.env.DB_URL || 'mongodb+srv://username:password@cluster.mongodb.net/gloww?retryWrites=true&w=majority';

let client: MongoClient;
let db: Db;

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

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(DB_URL);
    await client.connect();
    db = client.db('gloww');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

export const getUserCollection = async (): Promise<Collection<UserData>> => {
  const database = await connectToDatabase();
  return database.collection<UserData>('users');
};

export const getCycleCollection = async (): Promise<Collection<CycleData>> => {
  const database = await connectToDatabase();
  return database.collection<CycleData>('cycles');
};

export const getOrganHealthCollection = async (): Promise<Collection<OrganHealth>> => {
  const database = await connectToDatabase();
  return database.collection<OrganHealth>('organHealth');
};

// User operations
export const saveUserData = async (userData: Omit<UserData, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const users = await getUserCollection();
    const now = new Date();
    
    const user: UserData = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await users.insertOne(user);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<UserData | null> => {
  try {
    const users = await getUserCollection();
    return await users.findOne({ _id: userId });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserData = async (userId: string, updates: Partial<UserData>): Promise<void> => {
  try {
    const users = await getUserCollection();
    await users.updateOne(
      { _id: userId },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      }
    );
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Cycle operations
export const saveCycleData = async (cycleData: Omit<CycleData, '_id' | 'createdAt'>): Promise<string> => {
  try {
    const cycles = await getCycleCollection();
    const now = new Date();
    
    const cycle: CycleData = {
      ...cycleData,
      createdAt: now,
    };

    const result = await cycles.insertOne(cycle);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error saving cycle data:', error);
    throw error;
  }
};

export const getUserCycles = async (userId: string): Promise<CycleData[]> => {
  try {
    const cycles = await getCycleCollection();
    return await cycles.find({ userId }).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching user cycles:', error);
    throw error;
  }
};

// Organ health operations
export const saveOrganHealth = async (organHealth: Omit<OrganHealth, '_id' | 'updatedAt'>): Promise<string> => {
  try {
    const organHealthCollection = await getOrganHealthCollection();
    const now = new Date();
    
    const health: OrganHealth = {
      ...organHealth,
      updatedAt: now,
    };

    const result = await organHealthCollection.insertOne(health);
    return result.insertedId.toString();
  } catch (error) {
    console.error('Error saving organ health:', error);
    throw error;
  }
};

export const getUserOrganHealth = async (userId: string): Promise<OrganHealth | null> => {
  try {
    const organHealthCollection = await getOrganHealthCollection();
    return await organHealthCollection.findOne({ userId });
  } catch (error) {
    console.error('Error fetching organ health:', error);
    throw error;
  }
};

export const updateOrganHealth = async (userId: string, updates: Partial<OrganHealth>): Promise<void> => {
  try {
    const organHealthCollection = await getOrganHealthCollection();
    await organHealthCollection.updateOne(
      { userId },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
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

export const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
  }
};
