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
    <GestureHandlerRootView>
      <DraggableFlatList
        data={tasks}
        renderItem={({ item, drag, isActive}) => (
          <TaskItem
            task={item}
            drag={drag}
            isActive={isActive}
            onChangeCompletion={onChangeCompletion}
            onDescVisToggle={onDescVisToggle}
          />
        )}
        keyExtractor={(item) => item.id}
        onDragEnd={({data}) => setTasks(data)}
        activationDistance={20}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
});