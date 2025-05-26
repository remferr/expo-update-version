import { View, Text, TextInput, Modal, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Calendar( {dueDate, setDueDate, onClose} ) { 
  if (!dueDate) return null;
   
    const [monthCounter, setMonthCounter] = useState(dueDate.getMonth()+1)
    const [yearCounter, setYearCounter] = useState(dueDate.getFullYear())
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["S", "M", "T", "W", "T", "F", "S"];
  
    const selectDay = (dayData) => {
      changeMonth(dayData.currentMonth);
      setDueDate(new Date(yearCounter, monthCounter-1 + dayData.currentMonth, dayData.day));
    }
  
    const monthDays = () => {
      const firstday = new Date(yearCounter,monthCounter-1,1).getDay()
      const lastdate = new Date(yearCounter,monthCounter,0).getDate()
      const lastday = new Date(yearCounter,monthCounter,0).getDay()
      const lastLastdate = new Date(yearCounter,monthCounter-1,0).getDate()
      const fullMonth = []
      const weeks = []
  
      for (let i = 0; i < (firstday + lastdate + 6 - lastday); i++) {
        if (i< firstday ){
          fullMonth.push({day: lastLastdate-firstday+1+i, currentMonth: -1});
        }
        else if ( i > lastdate+firstday-1){
          fullMonth.push({day: i-lastdate-firstday+1, currentMonth: 1});
        }
        else if (firstday <= i){
          fullMonth.push({day: i - firstday +  1, currentMonth: 0})
        }
      }
  
      for (let i = 0; i < fullMonth.length; i+= 7){
        weeks.push(fullMonth.slice(i, i+7));
      }
      return weeks;
    }
  
  
    const changeMonth = (modifier,) => {
      let newMonth = monthCounter + modifier;
      let newYear = yearCounter;
  
      
        if (newMonth < 1){
          setMonthCounter(12);
          newYear = yearCounter - 1;
          setYearCounter(newYear)
        }
        else if (newMonth > 12){
          newYear = yearCounter + 1;
          setMonthCounter(1);
          setYearCounter(newYear);
        }    
        else{
          setMonthCounter(newMonth);
        }
  
    }
    
    
    return (
      <Modal
        visible={true}
        transparent
        onRequestClose={onClose}

      >
      
      <Pressable style={styles.modalContainer} onPress={onClose}>
      <View style={styles.calendarCont}  onPress={(e) => e.stopPropagation()}>
        <View style={styles.header}>
          <View style={styles.row}>
              <Pressable onPress={() => changeMonth(-1)}>
              <MaterialIcons name="keyboard-arrow-left" size={20} color="#007AFF" />
            </Pressable>
            <Text>{months[monthCounter-1]}</Text>
            <Pressable onPress={() => changeMonth(1)}>
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#007AFF"  />
            </Pressable>
          </View>
          
          <Text>{yearCounter}</Text>
        </View>
  
        <View style={styles.dayHeader}>
          {days.map((day, d) =>
            <Text key={d} style={styles.dayText}>{day}</Text>
          )}
        </View>
  
          {monthDays().map((week, wi) =>(
            <View key={wi} style={styles.weeks}>
              {week.map((dayData, di) => (
                <View key={di} style={[styles.day, dueDate.getDate() === dayData.day && monthCounter=== dueDate.getMonth()+1 && dayData.currentMonth === 0 &&styles.selectedDay]}> 
                    <Pressable onPress={() => selectDay(dayData)}>
                      <Text style={[styles.dateText, dayData.currentMonth !== 0 && styles.dateTextAlt]}>{dayData.day}</Text>
                    </Pressable>
                </View>
              )
            )}
            </View>
          ))}
        </View>
        </Pressable>
        </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: "center",
      shadowOpacity: 200,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      justifyContent: "center",
    },

      calendarCont: {
        borderRadius: 5,
        alignItems: "center",
        width: '70%',
        backgroundColor: "white",
        shadowOpacity: 1,
      },

      row: {
        flexDirection: "row",
        //alignItems: "center",
      },

      header: {
        backgroundColor: "#ADD8E6",
        width: '100%',
        padding: 10,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },

      dayHeader: {
        width: '100%',
        //marginVertical: 5,
        flexDirection: "row",
        paddingVertical: 5,
        justifyContent: "space-around",
        backgroundColor:  'rgb(239, 240, 241)',
      },

      dayText: {
        color: 'rgb(143, 154, 159)',
        width: 30,
        textAlign: "center",
      },

      weeks: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        marginBottom: 10,
      },

      day: {
        width: 30,
        height: 30,
        //backgroundColor: "white",
        justifyContent: "space-around",
      },

      selectedDay: {
        width: 30,
        height: 30,
        backgroundColor: "#ADD8E6",
        justifyContent: "space-around",
        borderRadius: 5,
      },

      dateText: {
        width: 30,
        textAlign: "center",
      },

      dateTextAlt: {
        width: 30,
        textAlign: "center",
        color: 'rgb(211, 213, 216)',
      },
      

    });

