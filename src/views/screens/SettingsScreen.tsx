import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

import {useAuth} from '../../viewmodels/context/UserContext';
import {useTheme} from '../../viewmodels/context/ThemeContext';

const SettingsScreen = () => {
  const {userName, changeUserName} = useAuth();
  const {theme, toggleTheme} = useTheme();
  const [newUserName, setNewUserName] = useState(userName);

  const handleChangeUserName = () => {
    changeUserName(newUserName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings Screen</Text>

      {/* Username change */}
      <Text style={styles.label}>Change Username:</Text>
      <TextInput
        style={styles.input}
        value={newUserName}
        onChangeText={setNewUserName}
        placeholder="Enter new username"
      />
      <Button title="Update Username" onPress={handleChangeUserName} />

      {/* Dark mode toggle */}
      <Text style={styles.label}>Dark Mode:</Text>
      <Text>Current Mode: {theme === 'dark' ? 'Dark' : 'Light'}</Text>
      <Button
        title={theme ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        onPress={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
});

export default SettingsScreen;
