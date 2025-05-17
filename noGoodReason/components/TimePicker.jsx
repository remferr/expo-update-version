import { View, Text, Modal, Pressable, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function TimePicker( {dueDate, setDueDate, onClose} ) {
  const [hour, setHour] = useState(dueDate.getHours());
  const [min, setMin] = useState(dueDate.getMinutes());
  //const [am, setAM] = useState({?dueDate.getHours() < 12 && true : false});

  const hours = Array.from({length: 24}, (_,i) => i);
  const mins = Array.from({length: 60}, (_,i) => i);

  const dateSetter = (time, isHour) => {

    return (
      <Pressable 
        onPress={() => {
          if (isHour) {setHour(time);}
          else {setMin(time);}
        const newDate = new Date(dueDate);
        newDate.setHours(isHour ? time : dueDate.getHours()); 
        newDate.setHours(isHour ? dueDate.getMinutes(): time); 
        setDueDate(newDate);
      }}
        style={styles.jkitem}>

        <Text style={styles.time}>
          {time.toString().padStart(2, '0')}</Text>
      </Pressable>
    );
    
  };

  return (
    <Modal
        visible={true}
        transparent
        onRequestClose={onClose}
      >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.timePickerCont} onStartShouldSetResponder={() => true}>
          <FlatList
            renderItem={dateSetter(time)}
            data={hours}
            showsVerticalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={40}
            decelerationRate={0.75}
            style={styles.wheel}
            keyExtractor={(time) => item.toString()}
          >
          </FlatList>
          
          <Text style={styles.item}>:</Text>
          <FlatList
            renderItem={dateSetter}
            data={mins}
            showsVerticalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={40}
            //decelerationRate={0.75}
            style={styles.wheel}
            keyExtractor={(item) => item.toString()}
          >
          </FlatList>
            
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

      timePickerCont: {
        borderRadius: 5,
        alignItems: "center",
        width: '70%',
        backgroundColor: "white",
        shadowOpacity: 1,
        padding: 20,
        flexDirection: "row",
        minWidth: 200,
      },

      wheel: {
        height: 120, 
      },

      wheelCont: {
        paddingVertical: 40,
      },

      item: {
        fontSize: 15,
      },

      jkitem: {
        height: 40
      },

    });