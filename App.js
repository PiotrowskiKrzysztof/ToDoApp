import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header' // importujemy Header z komponentów
import TodoItem from './components/todoItem'; // import TodoItem z komponentow
import AddTodo from './components/addTodo'; // importujemy AddTodo z komponentów

export default function App() {
  const [todos, setTodos] = useState([  // tablica reprezentująca poszczególne elementy ToDo
    { text: 'buy coffee', key: '1' }, 
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);

  // funkcja do usuwania zadan
  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  // funkcja obslugujaca przycisk zatwierdzajacy utworzenie nowego Todo na liscie
  const submitHandler = (text) => {    
    if(text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      })
    } else {
      // Alert obsługujący zbyt krótkie Todo
      Alert.alert('OOPS!', 'Todos must be over 3 chars long.', [
        {text: 'Understood'}
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss(); // wyłaczanie klawiatury, po kliknięciu na ekran
    }}>
      <View style={styles.container}>
        <Header /> 
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/> 
          <View style={styles.list}>
            <FlatList 
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler}/>              
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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