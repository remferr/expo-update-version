import { View, Text, TextInput, Modal, Pressable, StyleSheet, Switch} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Calendar from '@/components/Calendar';
import Palette from '@/components/Palette';
import {ModalProps} from '@/types';

export default function CreateModal({visible, onClose, onAddTask}: ModalProps) {
    const colors = ['#ADD8E6', '#FBCEB1', '#C1E1C1', '#FFECB3'];
    const [desc, setDesc] = useState("");
    const [visCalendar, setVisCalendar] = useState(false);
    const [visColors, setVisColors] = useState(false);
    const [dueDate, setDueDate] = useState(new Date);
    const [color, setColor] = useState('#ADD8E6');
    const [title, setTitle] = useState('');
    const [allday, setAllDay] = useState(true);
    const [hrText, setHrText] = useState(dueDate.getHours() % 12  === 0 ? "12" : (dueDate.getHours() % 12).toString().padStart(2,'0'));
    const [minText, setMinText] = useState(dueDate.getMinutes().toString().padStart(2, '0'));
    
    useEffect(() =>{
      setHrText(dueDate.getHours() % 12  === 0 ? "12" : (dueDate.getHours() % 12).toString().padStart(2,'0'));
      setMinText(dueDate.getMinutes().toString().padStart(2, '0'));
    }, [dueDate]);


    const submit = () => {
      if (title.trim()){
        onAddTask({
          title,
          completed: false,
          color,
          desc,
          visDesc: false,
          dueDate
        });
        setTitle('');
        setDesc('');
        setDueDate(new Date());
        setAllDay(true);
        onClose();
      }
    }

    const updateHours = (am: boolean, hr: string) => {
      //if (isNaN(hour) || hour < 1 || hour > 12) return;
      
      if (hr === "") {
        setDueDate(prev => {
          const tempDate = new Date(prev);
          tempDate.setHours(am ? 0: 12);
          return tempDate;
        });
        return;
      }

      let hour = parseInt(hr)
      const upDate = new Date(dueDate);

      if (!am && hour !== 12){
        upDate.setHours(hour+12);
      }
      else if (am && hour == 12){
        upDate.setHours(0);
      }
      else {
        upDate.setHours(hour);
      }

      setDueDate(upDate);
    }

    const updateMinutes = (min: string) => {
      if (min === "") {
        setDueDate(prev => {
          const tempDate = new Date(prev);
          tempDate.setMinutes(0);
          return tempDate;
        });
        return;
      }

      const minute = parseInt(min);
      const upDate = new Date(dueDate);

      upDate.setMinutes(minute);
      
      setDueDate(upDate);
    }

    const AMPM = () => {
      const upDate = new Date(dueDate);
      
      if (upDate.getHours() < 12) {
        upDate.setHours(dueDate.getHours()+12);
      }
      else {
        upDate.setHours(dueDate.getHours()-12);
      }
      
      setDueDate(upDate);
    }

    return (
    <Modal
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
              <Pressable onPress={() => setVisCalendar(!visCalendar)} style={styles.dateRow}>
                <MaterialIcons name="edit-calendar" size={24} color="#ADD8E6"/>
                <Text style={styles.calText}>: {dueDate.toLocaleDateString()} </Text>
              </Pressable>

              {visCalendar && (<Calendar dueDate={dueDate} setDueDate={setDueDate} onClose={() => setVisCalendar(false)}/> )}

              <View style={styles.row} >
              <Pressable onPress={() => setAllDay(!allday)} style={styles.dateRow} >
                <Feather name="clock" size={20} color={"#ADD8E6"}/>
                <Text> </Text>
              </Pressable>

                {!allday &&
                  <View style={styles.dateRow}>

                    <TextInput 
                        style={styles.dateText} 
                        inputMode='numeric' 
                        maxLength={2}
                        value={hrText}
                        onChangeText={setHrText}
                        onSubmitEditing={() => {
                          const padded = hrText.padStart(2, '0');
                          updateHours(dueDate.getHours() < 12, padded);
                          }
                        }

                        keyboardType='number-pad'
                        
                        />

                      <Text style={styles.calText}>: </Text>

                      <TextInput 
                        style={styles.dateText} 
                        inputMode='numeric' 
                        maxLength={2}
                        value={minText}
                        onChangeText={setMinText}
                        onSubmitEditing={() => {
                          const padded = minText.padStart(2, '0');
                          updateMinutes(padded);
                          }
                      }
                        keyboardType='number-pad'
                        />

                    <Pressable onPress={() => {AMPM()}}>
                        {<Text style={styles.calText}>{ dueDate.getHours() < 12 ? 'AM': 'PM' }</Text>}
                    </Pressable>


                  </View>
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
    },

    dateRow: {
      flexDirection:"row",
      alignItems:"center",
      marginTop: 10,
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

