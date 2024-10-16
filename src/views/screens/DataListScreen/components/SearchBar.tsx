import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({setSearchQuery}) => {
  return (
    <TextInput
      placeholder="Search by brand, model, year, gearbox, color"
      onChangeText={setSearchQuery}
      style={styles.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
});

export default SearchBar;
