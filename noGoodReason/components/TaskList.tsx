import { View, Text, FlatList, StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import TaskItem from './Task';
import { Task } from '@/types';
import { GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';

type TaskListProps = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    modalVis: boolean;
    onChangeCompletion: (id: string) => void;
    onDescVisToggle : (id: string) => void;
};



export default function TaskList({tasks, setTasks, modalVis, onChangeCompletion, onDescVisToggle }: TaskListProps) {

  const position = useSharedValue<{[key: string]: number}>(
    Object.fromEntries(tasks.map((task, index) => [task.id, index]))
  );

  useEffect(() => {
    position.value = Object.fromEntries(tasks.map((task, index) => [task.id, index]));
  }, [tasks]);

  const sorted = [...tasks].sort(
    (a,b) => position.value[a.id] - position.value[b.id]
  );

 return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{position: 'relative', height: tasks.length * 70}}>
          {sorted.map((task) =>  (
            <TaskItem
              key={task.id}
              tasks={tasks}
              setTasks={setTasks}
              task={task}
              position={position}
              modalVis={modalVis}
              onChangeCompletion={onChangeCompletion}
              onDescVisToggle={onDescVisToggle}

            />
          ))}
        </View>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //padding: 20,
    },

    itemCont: {
      gap: 5,
      paddingTop: 20,
    },
    
});