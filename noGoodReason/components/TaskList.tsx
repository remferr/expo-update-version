import { View, Text, Pressable, Animated } from 'react-native'
import React from 'react'
import TaskItem from '@/components/Task';
import { Task } from '@/types';
import { useState } from 'react';
import { PanResponder } from 'react-native';
import { useRef } from 'react';

type TaskListProps = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    onChangeCompletion: (id: string) => void;
    onDescVisToggle : (id: string) => void;
};
  
export default function TaskList({tasks, setTasks, onChangeCompletion, onDescVisToggle }: TaskListProps) {
  //const [dragIndex, setDragIndex] = useState<number | null>

  const pan  = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
    onPanResponderRelease: () => {
      pan.extractOffset();
    },
  }),
  ).current;

  return (
    <View>
      {tasks.map(task =>(
        <Pressable key={task.id} onLongPress={() => {

        }}>
          <Animated.View

          >
            <TaskItem key={task.id} task={task} onChangeCompletion={onChangeCompletion} onDescVisToggle={onDescVisToggle}/>
          </Animated.View>
        </Pressable>
                
      ))}
    </View>
  );
}