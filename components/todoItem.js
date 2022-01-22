import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, View, Button, Image, TextInput, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Header from './header'
import FastImage from 'react-native-fast-image'; // img cache

export default function TodoItem({ item, pressHandler, changeDataImage }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [statePhoto, setStatePhoto] = useState(item.img.path);
  const [text, setText] = useState('');

  const handleChosePhoto = () => {

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image.path);
        setStatePhoto(image.path);
        changeDataImage(image.path, item);
        setModalPhoto(false);
      });
  
  }
  
  const handleChosePhotoURL = () => {
    if(text != '') {
        
      // https://reactnative.dev/img/tiny_logo.png
      setStatePhoto(text); 
      changeDataImage(text, item);
      setModalPhoto(false);
    } else {
      Alert.alert('OOPS!', 'You have to paste URL', [
        {text: 'Understood'}
      ])
    }
  }

  const changeHandler = (val) => {
    setText(val);
  }

  const saveAndClose = () => {    
    setModalOpen(false);
  }

  return (
    <TouchableOpacity onPress={() => setModalOpen(true)}>
      <Text style={styles.item}>{item.text}</Text> 
      {/* Modal służy do wyświetlania nowego ekranu */}
      <Modal visible={modalOpen}>
        <Header />
        <View style={styles.dataReview}>
          {statePhoto &&
          <FastImage
            style={{ width: '100%', height: 200 }}
            source={{
                uri: statePhoto,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          }  
          {/* {statePhoto && <Image source={{uri: statePhoto}} style={{ width: '100%', height: 200 }}/>} */}
          <View>
            <Text> Created: {item.dateData.date}.{item.dateData.month}.{item.dateData.year} </Text>
            <Text style={styles.titleToDo}> { item.text } </Text>
          </View>
          <Modal visible={modalPhoto}>
            <View style={styles.containerModal}>
              <View style={styles.modalSmallSize}>
                <TextInput
                    style={styles.input}
                    placeholder='paste URL if u want add web photo ...'
                    onChangeText={changeHandler}
                />
                <Button 
                  title='add photo url'
                  color='coral'
                  onPress={() => handleChosePhotoURL()}
                />
                <Button 
                  title='add photo gallery'
                  color='coral'
                  onPress={() => handleChosePhoto()}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalPhoto(false)}
                >
                  <Text>X</Text>
                </TouchableOpacity>
              </View> 
            </View>                       
          </Modal>
          <View>
            <Button 
              title='add photo'
              color='coral'
              onPress={() => setModalPhoto(true)}
            />
            <Button 
              title='delete'
              color='coral'
              onPress={() => pressHandler(item.key)}
            />
            <Button 
              title='close'
              color='coral'
              onPress={() => saveAndClose()}
            />
          </View>
        </View>
      </Modal>     
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  },
  dataReview: {
    display: 'flex',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6, 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  modalSmallSize: {
    width: 300,
    height: 350,
    padding: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 0,
    right: 0,
    marginRight: 15,
    marginTop: 15,
  },
  titleToDo: {
    fontSize: 30,
  }
});