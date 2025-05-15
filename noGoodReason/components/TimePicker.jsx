import { View, Text, Modal, Pressable, StyleSheet, FlatList} from 'react-native'
import React from 'react'

export default function TimePicker( {dueDate, setDueDate, onClose} ) {

  return (
    <Modal
        visible={true}
        transparent
        onRequestClose={onClose}
      >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.colorsCont} onStartShouldSetResponder={() => true}>

        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: "center",
      shadowOpacity: 200,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      justifyContent: "center",
    },

      colorsCont: {
        borderRadius: 5,
        alignItems: "center",
        width: '70%',
        backgroundColor: "white",
        shadowOpacity: 1,
        padding: 10,
      },

    });