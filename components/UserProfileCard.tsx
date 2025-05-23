import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserDto } from '@/types/user';
import { COLORS } from '@/constants/colors';
import { Mail, Phone, Shield, User as UserIcon } from 'lucide-react-native';

type UserProfileCardProps = {
  user: UserDto;
};

export default function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.split(' ').map(part => part[0]).join('').toUpperCase()}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.userTypeContainer}>
            <Text style={styles.userType}>{user.userType}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.userInfo}>
        <View style={styles.infoItem}>
          <UserIcon size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>@{user.username}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Mail size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>{user.emailId}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Phone size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>{user.mobile}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Shield size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>{user.role}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>View Full Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  userTypeContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  userType: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  userInfo: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    marginLeft: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
});