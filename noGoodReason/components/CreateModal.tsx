import { View, Text, TextInput, Modal, Pressable, StyleSheet, Switch} from 'react-native';
import React from 'react';
import { useState } from 'react';
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
    const [AM, setAM] = useState(dueDate.getHours() < 12);

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

    const updateHours = (am: boolean, hr) => {
      const upDate = new Date(dueDate);

      !am && (upDate.setHours(hr + 12));
      am && upDate.setHours(hr);

      setAM((upDate.getHours() <= 12))
      return upDate;
    }

    const updateMinutes = (min) => {
      const upDate = new Date(dueDate);

      upDate.setMinutes(min);
      
      return upDate;
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
                        placeholder={
                          (dueDate.getHours() % 12) === 0
                            ? '12'
                          :
                            (dueDate.getHours() % 12).toString()
                        }
                        //value={}
                        onChangeText={(num) => 
                          setDueDate(updateHours(AM, num))
                        }
                        />

                      <Text style={styles.calText}>: </Text>

                      <TextInput 
                        style={styles.dateText} 
                        inputMode='numeric' 
                        maxLength={2}
                        value={(dueDate.getMinutes()).toString()}
                        onChangeText={(num) => 
                          setDueDate(updateMinutes(num))
                        }
                        />

                    <Pressable onPress={() => {
                      if (dueDate.getHours()>=12) {
                        updateHours(true, dueDate.getHours()-12)
                      }
                      else if (dueDate.getHours()<12){
                        updateHours(false, dueDate.getHours())
                      }
                    }}>
                        {<Text style={styles.calText}>{ AM ? 'AM': 'PM' }</Text>}
                        
                        
                      
                    </Pressable>


                  </View>
                }

              </View>

              

              
              </View>

              <Text style={{color: '#666'}}>
                {dueDate.toLocaleTimeString()}
              </Text>

              
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
        maxWidth: 20
      },

    });

