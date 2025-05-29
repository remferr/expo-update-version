import { View, Text, TextInput, Modal, Pressable, StyleSheet, Switch, Keyboard, Platform} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Calendar from '@/components/Calendar';
import Palette from '@/components/Palette';
import {ModalProps} from '@/types';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateModal({visible, onClose, onAddTask}: ModalProps) {
   const colors = ['#ADD8E6', '#FBCEB1', '#C1E1C1', '#FFECB3'];
    const [desc, setDesc] = useState("");
    const [visCalendar, setVisCalendar] = useState(false);
    const [visColors, setVisColors] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [color, setColor] = useState('#ADD8E6');
    const [title, setTitle] = useState('');
    const [allday, setAllDay] = useState(dueDate ? true: null);
    const [hrText, setHrText] = useState(dueDate ? (dueDate.getHours() % 12  === 0 ? "12" : (dueDate.getHours() % 12).toString().padStart(2,'0')): '');
    const [minText, setMinText] = useState(dueDate ? (dueDate.getMinutes().toString().padStart(2, '0')): '');
    const [priority, setPriority] = useState(1);

  useEffect(() =>{
      if (dueDate) {
        setHrText(dueDate.getHours() % 12  === 0 ? "12" : (dueDate.getHours() % 12).toString().padStart(2,'0'));
      setMinText(dueDate.getMinutes().toString().padStart(2, '0'));
      }
      else {
        setHrText('');
        setMinText('');
      } 
    }, [dueDate]);

    const dueDateToggle = () => {
      if (dueDate){
        setDueDate(null);
        setAllDay(null);
      }
      else {
        setDueDate(new Date());
        setAllDay(true);
      }
    }
  
    
  useEffect(() => {
    if (visible) {
      setTitle('');
      setDesc('');
      setVisCalendar(false);
      setPriority(1);
    }
  }, [visible]);
    
    // const submit = () => {
    //   Keyboard.dismiss();
    //   if (title.trim()){
    //     onAddTask({
    //       title,
    //       completed: false,
    //       color,
    //       desc,
    //       visDesc: false,
    //       dueDate,
    //       allday,
    //     });
    //     setTitle('');
    //     setDesc('');
    //     setDueDate(null);
    //     setAllDay(null);
    //     setVisCalendar(false);
    //     setVisColors(false);
    //     onClose();
    //   }
    // }

    const submit = () => {
       Keyboard.dismiss();
       if (!title.trim()) return;

        onAddTask({
          title, 
          completed: false, 
          color,
          desc, 
          visDesc: false,
          dueDate,
          allday,
          priority,
        });

        setTitle('');
        setDesc('');
        setVisCalendar(false);
        setPriority(1);

        onClose();
    }

    const updateHours = (am: boolean, hr: string) => {
      if (!dueDate) return;

      if (hr === "") {
        setDueDate(prev => {
          if (!prev) return null;
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
      if (!dueDate) return;

      if (min === "") {
        setDueDate(prev => {
          if (!prev) return null;
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
      if (!dueDate) return;

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
        animationType="fade"
        onRequestClose={onClose}
        statusBarTranslucent
        >
            <Pressable style={styles.outside} onPress={onClose}>
              <Pressable style={styles.inside} onPress={(e) => e.stopPropagation()}>
                <SafeAreaView>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                    style={styles.safeContent}
                  >
                    <View style={styles.basicSection}>
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
                    </View>

                <View style={styles.row}>
                  
                  <View>
                    <View style={styles.dateRow}>
                      
                      <Pressable onPress={() => {dueDateToggle()}} style={styles.dateRow}>
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

                      <View style={styles.dateRow}>
                      {dueDate != null ?
                        
                        <View style={styles.timeHolder}>
                          <Pressable onPress={() => setAllDay(!allday)}  style={styles.dateRow}>
                            <Feather name="clock" size={20} color={"#ADD8E6"}/>
                            <Text style={styles.calText}>: </Text>
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

                                    <Text style={styles.dateText}>:</Text>

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
                                          {<Text style={styles.dateText}>{ dueDate.getHours() < 12 ? 'AM': 'PM' }</Text>}
                                      </Pressable>
                                    </View>
                                  }

                                </View>
                        : 
                      null}
                  </View>
                </View>

                <View style={styles.priorityCont}>
                  <Pressable onPress={() => {if (priority !== 0) {
                    setPriority(priority-1)}
                  }}>
                    <MaterialIcons name="keyboard-arrow-up" size={20} color="#ADD8E6" />
                  </Pressable>

                    <Text style={styles.priorityText} >{priority}</Text>

                  <Pressable onPress={() => 
                    setPriority(priority+1)}
                    >
                    <MaterialIcons name="keyboard-arrow-down" size={20} color="#ADD8E6"/>
                  </Pressable>
                </View>
           
              </View>

              
              
           <Pressable style={styles.addButton} onPress={submit}>
                  <Text style={styles.addButtonText}>+</Text>     
                </Pressable>   

                  </KeyboardAvoidingView>
                </SafeAreaView>
              </Pressable>
            </Pressable> 
        </Modal>
      )
}

const styles = StyleSheet.create({
    outside:{
        flex:1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: 'rgba(182, 197, 204, 0.5)',
        backfaceVisibility: 'hidden',
        zIndex:6,
    },

    inside: {
      backgroundColor: "white",
      width: '90%',
      minHeight: 200,
      marginHorizontal: 15,
      marginTop: 30,
      shadowColor: 'rgba(0, 123, 255, 0.5)',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: .2,
      elevation: 5,
      borderRadius: 8,
      borderWidth: 0,
      zIndex: 5,
    },

    safeContent: {
      padding: 20,
      zIndex: 5,
    },

    addButton: {
      marginTop: 5,
      width: 40,
      height: 40,
      backgroundColor: "#ADD8E6",
      alignItems: "center",
      borderRadius: 5,
      justifyContent: "center",
      shadowColor: 'rgba(0, 123, 255, 0.5)',
    },

    addButtonText: {
      color: "white",
      fontSize: 18,
    },

    title: {
      width: 200,
      fontWeight: "semibold",
      outlineColor: "#ADD8E6",
      padding: 3,
    },

    swatch: {
        width: 22,
        height: 22,
        borderRadius: 5,
        marginHorizontal: 5,
      },

      row: {
        flexDirection:"row",
        justifyContent: "space-between",
        //alignItems: "center",
        alignContent: "center",
        marginTop: 5,
    },

    dateRow: {
      flexDirection:"row",
      alignItems:"center",
      alignContent: "center",
      textAlign: "center",
      paddingVertical: 1,
      
    },

    rowRight: {
        flexDirection:"row-reverse",
        alignItems:"center",
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

    calText: {
      color: "#ADD8E6",
      
    },

    pallet: {
        marginTop: 10,
      },

      swatchContainer: {
        flexDirection: "row",
      },

      selectedSwatch: {
        borderWidth: 2,
        borderColor: '#007AFF',
      },

      clock: {
        marginRight: 5,
        justifyContent: "center",
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
        //flexWrap: "wrap",
        outlineColor: "#ADD8E6",
        maxWidth:24,
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
      },

      priorityCont: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#ADD8E6",
        width: 25,
        justifyContent: "center", 
        alignItems: "center"
      },

      priorityText: {
        color: "gray",
        
      },

      basicSection: {
        marginBottom: 15,
      },

      timeHolder: {
        flexDirection: "row",
        justifyContent: "center",
      },

  });