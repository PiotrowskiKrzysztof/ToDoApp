import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function TodoItem({ item, pressHandler, changeDataImage }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [statePhoto, setStatePhoto] = useState(item.img.path);

  const handleChosePhoto = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image.path);
      setStatePhoto(image.path);
      changeDataImage(image.path);
    });
    
  }

  const saveAndClose = () => {
    
    setModalOpen(false);
  }

  return (
    <TouchableOpacity onPress={() => setModalOpen(true)}>
      <Text style={styles.item}>{item.text}</Text> 
      {/* Modal służy do wyświetlania nowego ekranu */}
      <Modal visible={modalOpen}>
        <View style={styles.dataReview}>
          <Text>{ item.text }</Text>  
          <TouchableOpacity onPress={() => console.log(statePhoto)}>
            {statePhoto && <Image source={{uri: statePhoto}} style={{ width: '100%', height: 200 }}/>}
          </TouchableOpacity>
          
          <Button 
            title='chose photo'
            onPress={() => handleChosePhoto()}
          />
          <Button 
            title='delete'
            onPress={() => pressHandler(item.key)}
          />
          <Button 
            title='close'
            onPress={() => saveAndClose()}
          />
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
  }
});