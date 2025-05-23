import { View, StyleSheet, Platform } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { User, Settings, Chrome as Home, BookOpen, MessageSquare, ClipboardCheck } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawer,
        drawerActiveBackgroundColor: `${COLORS.primary}15`,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.gray[600],
        drawerLabelStyle: styles.drawerLabel,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="questions"
        options={{
          title: 'Questions',
          drawerIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="forums"
        options={{
          title: 'Forums',
          drawerIcon: ({ size, color }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="responses"
        options={{
          title: 'Responses',
          drawerIcon: ({ size, color }) => (
            <ClipboardCheck size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: Platform.OS === 'web' ? 280 : '80%',
    backgroundColor: COLORS.white,
  },
  drawerLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    marginLeft: -16,
  },
});