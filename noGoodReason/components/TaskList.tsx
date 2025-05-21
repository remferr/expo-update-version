import { View, Text } from 'react-native'
import React from 'react'
import TaskItem from '@/components/Task';
import { Task } from '@/types';

type TaskListProps = {
    tasks: Task[];
    onChangeCompletion: (id: string) => void;
    onDescVisToggle : (id: string) => void;
};

  
export default function TaskList({tasks, onChangeCompletion, onDescVisToggle }: TaskListProps) {
//console.log('[TaskList] received onDescVisToggle:', typeof onDescVisToggle);
  return (
    <View>
      {tasks.map(task =>(
        <TaskItem 
        key={task.id}
        task={task}
        onChangeCompletion={onChangeCompletion}
        onDescVisToggle={onDescVisToggle}
        />
      ))}
    </View>
  );
}