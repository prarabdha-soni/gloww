import { Tabs } from 'expo-router';
import { Home, Activity, Beaker, Phone, Baby } from 'lucide-react-native';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.nude.card,
          borderTopColor: colors.nude.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 12,
          margin: 0,
          paddingHorizontal: 0,
        },
        tabBarActiveTintColor: colors.nude.roseGold,
        tabBarInactiveTintColor: colors.nude.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-SemiBold',
          fontWeight: '600',
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Flow',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
          <Tabs.Screen
            name="test"
            options={{
              title: 'Health',
              tabBarIcon: ({ size, color }) => (
                <Beaker size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="expert"
            options={{
              title: 'Expert',
              tabBarIcon: ({ size, color }) => (
                <Phone size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="pregnant"
            options={{
              title: 'Pregnant',
              tabBarIcon: ({ size, color }) => (
                <Baby size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
    </Tabs>
  );
}
