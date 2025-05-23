import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu } from 'lucide-react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  return (
    <View style={[
      styles.header, 
      { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 44 }
    ]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Menu size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
  },
});