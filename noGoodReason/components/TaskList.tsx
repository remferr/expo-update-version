import { View, Text, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import TaskItem from './Task';
import { Task } from '@/types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

type TaskListProps = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    onChangeCompletion: (id: string) => void;
    onDescVisToggle : (id: string) => void;
};


  
export default function TaskList({tasks, setTasks, onChangeCompletion, onDescVisToggle }: TaskListProps) {


 return (
      <FlatList
        data={tasks}
        renderItem={({ item}) => (
          <TaskItem
            task={item}
            onChangeCompletion={onChangeCompletion}
            onDescVisToggle={onDescVisToggle}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.container}
        contentContainerStyle={styles.itemCont}
      >

      </FlatList>
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