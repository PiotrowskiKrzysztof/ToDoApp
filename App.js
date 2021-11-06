import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header' // importujemy Header z osobnego pliku

export default function App() {
  const [todos, setTodos] = useState([  // tablica reprezentująca poszczególne elementy ToDo
    { text: 'buy coffee', key: '1' }, 
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);

  return (
    <View style={styles.container}>
      <Header /> 
      <View style={styles.content}>
        {/* to form */} 
        <View style={styles.list}>
          <FlatList 
            data={todos}
            renderItem={({ item }) => (
              <Text>{item.text}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // kolor tła: biel
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});