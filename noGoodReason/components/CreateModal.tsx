import { View, Text, TextInput, Modal, Pressable, StyleSheet, Switch, Keyboard} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Calendar from '@/components/Calendar';
import Palette from '@/components/Palette';
import {ModalProps} from '@/types';

export default function CreateModal({visible, onClose, onAddTask}: ModalProps) {
    const [visCalendar, setVisCalendar] = useState(false);
    
    

    const submit = () => {
      Keyboard.dismiss();
      if (title.trim()){
        onAddTask({
          title,
          completed: false,
          color,
          desc,
          visDesc: false,
          dueDate,
          allday,
        });
        setTitle('');
        setDesc('');
        setDueDate(null);
        setAllDay(null);
        setVisCalendar(false);
        setVisColors(false);
        onClose();
      }
    }

    

    return (
    <Modal
      key={`modal-${Date.now()}`}
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      >
        <Pressable style={styles.modalContainer} onPress={onClose}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              
              <View style={styles.row}>
                <TextInput style={styles.title}
                      placeholder="Title"
                      placeholderTextColor="gray"
                      value={title}
                      onChangeText={setTitle}
                      autoFocus={true}
                    />

                    <Pressable onPress={() => setVisColors(!visColors)} style={[styles.swatch, { backgroundColor:  color}]}></Pressable>

                    {visColors && (<Palette color={color} setColor={setColor} onClose={() => setVisColors(false)}/> )}
                </View>

                <TextInput style={styles.text}
                      placeholder="Description"
                      placeholderTextColor="gray"
                      value={desc}
                      onChangeText={setDesc}
                    />

                <View style={styles.row}>
                  <View>
                    <View style={styles.dateRow}>
                      
                      <Pressable onPress={() => {dueDateToggle()}}>
                        <MaterialIcons name="edit-calendar" size={24} color="#ADD8E6"/>
                      </Pressable>
                      
                      {dueDate != null ?
                      <View> 
                        <Pressable onPress={() => setVisCalendar(!visCalendar)}>
                          <Text style={styles.calText}>: {dueDate.toLocaleDateString()} </Text>
                        </Pressable>


                        {visCalendar && (<Calendar dueDate={dueDate} setDueDate={setDueDate} onClose={() => setVisCalendar(false)}/> )}


                        </View>
                      :
                      null
                      }
                      </View>
                    </View>


                          
           


              
           <Pressable style={styles.addButton} onPress={submit}>
                  <Text>+</Text>     
                </Pressable>   
        </Pressable>
        
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        alignItems: "center",
        //justifyContent: "flex-end",
        backgroundColor: 'rgba(137, 154, 162, 0.5)',
        padding: 15,
    },

    modalContent:{
        width: 300,
        backgroundColor: "white",
        borderRadius: 5, 
        padding: 10,
        justifyContent: "space-between",
        margin: 5,
        
    },

    row: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        marginTop: 10,
    },

    dateRow: {
      flexDirection:"row",
      alignItems:"center",
      alignContent: "center",
      //marginTop: 10,
    },

    rowRight: {
        flexDirection:"row-reverse",
        alignItems:"center",
    },

    addButton:{
        width: 40,
        height: 40,
        backgroundColor: "#ADD8E6",
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 10,
    }, 

    inputCont: {
        flexDirection:"row",
        alignItems:"center",
        maxWidth: 200,      
    },

    text: {
        flexDirection:"row",
        alignItems:"center",
        maxWidth: 200,      
        width:200,
        color: '#46444C',
        outlineColor: "#ADD8E6",
        padding: 3,
    },

    title: {
        flexDirection:"row",
        alignItems:"center",
        maxWidth: 200,      
        width:200,
        //fontSize: 16,
        fontWeight: "semibold",
        outlineColor: "#ADD8E6",
        padding: 3,
    },

    calText: {
      color: "#ADD8E6",
      
    },

    pallet: {
        marginTop: 10,
      },

      swatchContainer: {
        flexDirection: "row",
      },

      swatch: {
        width: 22,
        height: 22,
        borderRadius: 5,
        marginHorizontal: 5,
      },

      selectedSwatch: {
        borderWidth: 2,
        borderColor: '#007AFF',
      },

      clock: {
        padding: 5,
      },

      switch: {
        borderWidth: 2,
        borderColor: "#ADD8E6",
        borderRadius: 10,
        backgroundColor: "",
        width: 20,
        height: 18,
        color: "red",
      },

      dateText: {
        color: "#ADD8E6",
        maxWidth: 20,
        outlineColor: "#ADD8E6",
      },

    });