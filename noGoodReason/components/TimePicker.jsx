import { View, Text, Modal, Pressable, StyleSheet, ScrollView} from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function TimePicker( {dueDate, setDueDate, onClose} ) {
  const [hour, setHour] = useState(dueDate.getHours());
  const [min, setMin] = useState(dueDate.getMinutes());
  //const [am, setAM] = useState({?dueDate.getHours() < 12 && true : false});

  const hours = Array.from({length: 24}, (_,i) => i);
  const mins = Array.from({length: 60}, (_,i) => i);

  return (
    <Modal
        visible={true}
        transparent
        onRequestClose={onClose}
      >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.colorsCont} onStartShouldSetResponder={() => true}>
          <ScrollView style={styles.wheel}>
            {hours.map((hr) => (
                <Pressable key={hr} onPress={() => setHour(hr)}>
                  <Text>{hr}</Text>
                </Pressable>
            ))}
          </ScrollView>
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

      wheel: {
        height: 40, 
        width: 20,
      }

    });