import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';

export const TimeUtils = () => {
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [allday, setAllDay] = useState(dueDate ? true: null);
    const [hrText, setHrText] = useState(dueDate ? (dueDate.getHours() % 12  === 0 ? "12" : (dueDate.getHours() % 12).toString().padStart(2,'0')): '');
    const [minText, setMinText] = useState(dueDate ? (dueDate.getMinutes().toString().padStart(2, '0')): '');

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

  return {
    dueDate,
    allday,
    hrText,
    minText,
    setDueDate,
    setAllDay, 
    setHrText,
    setMinText,
    dueDateToggle, 
    updateHours, 
    updateMinutes, 
    AMPM
  };
};