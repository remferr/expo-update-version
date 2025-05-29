import { View, Text, Animated, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import TaskItem from '@/components/Task';
import { Task } from '@/types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';


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
        renderItem={({ item}) => (<TaskItem
          task={item}
          onChangeCompletion={onChangeCompletion}
          onDescVisToggle={onDescVisToggle}
          />  
        )}
        keyExtractor={(item) => item.id}
      >

      </FlatList>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
});