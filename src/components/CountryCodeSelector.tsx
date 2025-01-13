import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Portal, Dialog } from 'react-native-paper';

interface CountryCodeSelectorProps {
  disabled?: boolean;
}

export default function CountryCodeSelector({ disabled }: CountryCodeSelectorProps) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <TouchableRipple
        onPress={showDialog}
        disabled={disabled}
        style={[
          styles.container,
          disabled && styles.disabled
        ]}
      >
        <View style={styles.content}>
          <Text>+91</Text>
        </View>
      </TouchableRipple>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Country Code</Dialog.Title>
          <Dialog.Content>
            <Text>Currently, we only support Indian phone numbers (+91).</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableRipple onPress={hideDialog}>
              <Text style={styles.okButton}>OK</Text>
            </TouchableRipple>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  okButton: {
    color: '#004B93',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});