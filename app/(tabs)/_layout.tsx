import { Tabs } from 'expo-router';
import { Home, Activity, Beaker, ShoppingBag } from 'lucide-react-native';
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
        },
        tabBarActiveTintColor: colors.nude.roseGold,
        tabBarInactiveTintColor: colors.nude.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter-Medium',
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
          title: 'Test',
          tabBarIcon: ({ size, color }) => (
            <Beaker size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ size, color }) => (
            <ShoppingBag size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
