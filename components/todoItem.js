import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Modal, View, Button } from 'react-native';

export default function TodoItem({ item, pressHandler }) {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setModalOpen(true)}>
      <Text style={styles.item}>{item.text}</Text> 
      {/* Modal służy do wyświetlania nowego ekranu */}
      <Modal visible={modalOpen}>
        <View style={styles.dataReview}>
          <Text>{ item.text }</Text>          
          <Button 
            title='delete'
            onPress={() => pressHandler(item.key)}
          />
          <Button 
            title='close'
            onPress={() => setModalOpen(false)}
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