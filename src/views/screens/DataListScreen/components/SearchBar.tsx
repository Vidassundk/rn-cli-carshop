import {useTheme} from '@/viewmodels/context/ThemeContext';
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({setSearchQuery}) => {
  const {colors, spacing} = useTheme();

  return (
    <TextInput
      placeholder="Search by brand, model, year, gearbox, color"
      placeholderTextColor={colors.text}
      onChangeText={setSearchQuery}
      style={[
        styles.searchInput,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          color: colors.text,
          paddingHorizontal: spacing.md,
          marginHorizontal: spacing.md,
          borderRadius: spacing.sm,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 32,
    borderWidth: 1,
  },
});

export default SearchBar;
