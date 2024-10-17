import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '@/viewmodels/context/UserContext';
import {useTheme} from '@/viewmodels/context/ThemeContext';
import ThemedText from '../components/ThemedText';

const SettingsScreen = () => {
  const {userName, changeUserName} = useAuth();
  const {theme, toggleTheme, colors, spacing} = useTheme();
  const [newUserName, setNewUserName] = useState(userName);
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleChangeUserName = () => {
    changeUserName(newUserName);
    Alert.alert('Success', 'Username updated successfully!');
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDarkMode(prev => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background, padding: spacing.md},
      ]}>
      <ThemedText
        variant="h3"
        style={[styles.heading, {marginBottom: spacing.lg}]}>
        Settings
      </ThemedText>

      <View style={{marginBottom: spacing.xl, gap: spacing.sm}}>
        <ThemedText
          style={[
            styles.label,
            {color: colors.text, marginBottom: spacing.sm},
          ]}>
          Change Username:
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              padding: spacing.md,
              marginBottom: spacing.md,
              borderRadius: spacing.sm,
            },
          ]}
          value={newUserName}
          onChangeText={setNewUserName}
          placeholder="Enter new username"
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              padding: spacing.md,
              borderRadius: spacing.sm,
            },
          ]}
          onPress={handleChangeUserName}>
          <ThemedText style={[styles.buttonText, {color: colors.text}]}>
            Update Username
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: spacing.xl, gap: spacing.sm}}>
        <ThemedText style={[styles.label, {color: colors.text}]}>
          Dark Mode:
        </ThemedText>
        <View style={[styles.switchContainer, {marginTop: spacing.sm}]}>
          <ThemedText style={{color: colors.text}}>
            {isDarkMode ? 'Enabled' : 'Disabled'}
          </ThemedText>
          <Switch
            testID="dark-mode-switch"
            value={isDarkMode}
            onValueChange={handleToggleTheme}
            thumbColor={colors.primary}
            trackColor={{false: colors.primary, true: colors.card}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;
