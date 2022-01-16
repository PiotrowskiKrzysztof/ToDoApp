import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header' // importujemy Header z komponentów
import TodoItem from './components/todoItem'; // import TodoItem z komponentow
import AddTodo from './components/addTodo'; // importujemy AddTodo z komponentów
import * as RNFS from 'react-native-fs'; // fie system do obsługi pliku json z danymi


export default function App() {
  
  const [todos, setTodos] = useState();  
  
  var pathDataJSON = RNFS.DocumentDirectoryPath + '/dataTodos.json'; // sciezka do pliku z JSONem
  // console.log(pathDataJSON);

  // RNFS.unlink(pathDataJSON)
  // .then(() => {
  //   console.log('FILE DELETED');    
  // })
  // const tmpp = '[{"text": "buy coffee","key": "1", "dateData": {"date": "15", "month": "1", "year": "2022"}, "img": {"path": "null"}},{"text": "create an app","key": "2", "dateData": {"date": "15", "month": "1", "year": "2022"}, "img": {"path": "null"}},{"text": "play on the switch","key": "3", "dateData": {"date": "15", "month": "1", "year": "2022"}, "img": {"path": "null"}},{"text": "MEGAKOT21","key": "4", "dateData": {"date": "15", "month": "1", "year": "2022"}, "img": {"path": "null"}}]';          
  // RNFS.writeFile(pathDataJSON, tmpp , 'ascii');

  //funkcja do przechwytywania danych z pliku
  const takeData = async () => {        
    var data = await RNFS.readFile(pathDataJSON, 'ascii');
    // console.log(data);
    setTodos(JSON.parse(data));
  }
  takeData();

  // useEffect(() => {
  //   // console.log( "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + pathDataJSON);
  //   takeData();
  // }, [todos]);

  // funkcja do usuwania Todos
  const pressHandler = (key) => {
    setTodos(prevTodos => {
      // return prevTodos.filter(todo => todo.key != key);
      let tmpData = prevTodos.filter(todo => todo.key != key);
      // console.log("/////////////////todos//////////////////")
      // console.log(todos);
      console.log("/////////////////tmpData//////////////////")
      console.log(tmpData);
      console.log("/////////////////tmpData STRINGLIFY//////////////////")
      console.log(JSON.stringify(tmpData));
      RNFS.unlink(pathDataJSON)
      .then(() => {
        console.log('FILE DELETED');    
      })
      RNFS.writeFile(pathDataJSON, JSON.stringify(tmpData) , 'ascii');
    });
  };

  const showInfo = () => {
    
  }

  // funkcja obslugujaca przycisk zatwierdzajacy utworzenie nowego Todo na liscie
  const submitHandler = (text) => {    
    if(text.length > 3) {
      setTodos((prevTodos) => {
          let tmpData = [ { text: text, key: Math.random().toString(), dateData: {date: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()}, img: {path: 'empty'} } ,...prevTodos ];
          // console.log(tmpData);
          // const tmp = '[{"text": "buy coffee","key": "1"},{"text": "create an app","key": "2"},{"text": "play on the switch","key": "3"},{"text": "MEGAKOT21","key": "4"}]';          
          RNFS.writeFile(pathDataJSON, JSON.stringify(tmpData) , 'ascii');
      })
    } else {
      // Alert obsługujący zbyt krótkie Todo
      Alert.alert('OOPS!', 'Todos must be over 3 chars long.', [
        {text: 'Understood'}
      ])
    }
  }

  const changeDataImage = (newPath) => {
    let tmpData = todos;
    for(let tmp of tmpData) {
      if(tmp.key == item.key) {
        tmp.img.path = newPath;
      }
    }
    console.log(JSON.stringify(todos));
    setTodos(tmpData);
    RNFS.unlink(pathDataJSON)
    .then(() => {
      console.log('FILE DELETED');    
    })
    RNFS.writeFile(pathDataJSON, JSON.stringify(tmpData) , 'ascii');
  };

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
                <TodoItem 
                  item={item}
                  pressHandler={pressHandler}
                  changeDataImage={changeDataImage}
                />              
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
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  }
});