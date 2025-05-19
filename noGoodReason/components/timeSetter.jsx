import { View, Text, } from 'react-native'
import { useState } from 'react'
import React from 'react'

export default function timeSetter({dueDate, hr, min}) {
    const upDate = new Date(dueDate);
    const [hr, setHr] = use(dueDate.getHours());
    const [min, setMin] = use(dueDate.getMinutes());
    
  return (
    <View>
      
    </View>
  )
}