import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { Bell, Moon, Shield, HelpCircle, AlertCircle } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  delay?: number;
};

function SettingItem({ icon, title, description, hasSwitch, onPress, delay = 0 }: SettingItemProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Animated.View 
      entering={FadeInDown.duration(400).delay(delay)}
      style={styles.settingItem}
    >
      <TouchableOpacity 
        style={styles.settingItemContent}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.settingIconContainer}>{icon}</View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
        {hasSwitch && (
          <Switch
            trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.gray[300]}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={<Bell size={22} color={COLORS.primary} />}
              title="Notifications"
              description="Control push notifications"
              hasSwitch
              delay={100}
            />
            <SettingItem 
              icon={<Moon size={22} color={COLORS.primary} />}
              title="Dark Mode"
              description="Toggle dark mode"
              hasSwitch
              delay={150}
            />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={<Shield size={22} color={COLORS.primary} />}
              title="Privacy"
              description="Manage your privacy settings"
              onPress={() => {}}
              delay={200}
            />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem 
              icon={<HelpCircle size={22} color={COLORS.primary} />}
              title="Help Center"
              description="Get help with the app"
              onPress={() => {}}
              delay={250}
            />
            <SettingItem 
              icon={<AlertCircle size={22} color={COLORS.primary} />}
              title="About"
              description="App version and information"
              onPress={() => {}}
              delay={300}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
});