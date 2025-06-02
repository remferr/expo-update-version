import { View, Text, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import TaskItem from './Task';
import { Task } from '@/types';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

type TaskListProps = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    modalVis: boolean;
    onChangeCompletion: (id: string) => void;
    onDescVisToggle : (id: string) => void;
};

// const overlap = (id, y) => {
  
// }

export default function TaskList({tasks, setTasks, modalVis, onChangeCompletion, onDescVisToggle }: TaskListProps) {


 return (
      <FlatList
        data={tasks}
        renderItem={({ item}) => (
          <TaskItem
            task={item}
            modalVis={modalVis}
            onChangeCompletion={onChangeCompletion}
            onDescVisToggle={onDescVisToggle}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.container}
        contentContainerStyle={styles.itemCont}
        key={modalVis? 'open': 'closed'}
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