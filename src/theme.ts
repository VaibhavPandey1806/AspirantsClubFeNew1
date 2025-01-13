import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#004B93',
    secondary: '#003B73',
    accent: '#FFD700',
    background: '#fff',
    surface: '#fff',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#C9CCD1',
    placeholder: '#6B7280',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 4,
};