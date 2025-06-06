import { Text, View, StyleSheet, Pressable, FlatList, Platform} from "react-native";
import { Task } from "@/types";
import Feather from '@expo/vector-icons/Feather';
import { useState, useEffect } from "react";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import { useRef } from "react";
import type { SharedValue } from "react-native-reanimated";


type TaskItemProps =  {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    task: Task;
    //drag: () => void;
    position: SharedValue<Record<string, number>>;
    modalVis: boolean;
    onChangeCompletion: (id: string) => void; 
    onDescVisToggle: (id: string) => void; 
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const itemHeight = 70;      
    
export default function TaskItem({tasks, setTasks, task, position, modalVis, onChangeCompletion, onDescVisToggle}: TaskItemProps) {
  const [color, setColor] = useState('#ADD8E6');

  const dragging = useSharedValue(false);
  const distance = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const currentPosition = useSharedValue(0);
  //const ogPosition = useSharedValue<Record<string, number>>({});

  useEffect(()=> {
    currentPosition.value = position.value[task.id] ?? 0;
  }, []);

  const panGesture = Gesture.Pan()
  .enabled(!modalVis)

    .onBegin(() => {
      'worklet';
    dragging.value = true;
    zIndex.value = 999
    //ogPosition.value = {...position.value};
  })
    .onUpdate((e) => {
      'worklet';
    distance.value = e.translationY;
    
    const newPosition = Math.min(
      tasks.length -1, 
      Math.max(0, Math.round( distance.value /itemHeight )
      )
    );

      if (newPosition !== position.value[task.id]) {
        
        const sorted = Object.entries(position.value)
        .sort((a,b) => a[1] -b[1])
        .map(([id]) => id);

      sorted.splice(currentPosition.value, 1);
      sorted.splice(newPosition, 0, task.id)
  
        const newPos = Object.fromEntries(sorted.map((id, idx) => [id, idx]));

        position.value = newPos;
        currentPosition.value = newPosition;
        distance.value = 0;
      }
  })
    .onEnd(() => {
      'worklet';
      distance.value = withSpring(0);
      dragging.value = false;
      zIndex.value = 0;

      

  });

  useEffect(() => {
    if (!modalVis) {
      distance.value = 0;
      dragging.value = false;
    }
  }, [modalVis]);


  const animateStyle = useAnimatedStyle(() => {
    const positionY = position.value[task.id] * itemHeight;
    return{ 
      transform: [{translateY: positionY + distance.value}],
      zIndex: zIndex.value,
      position: 'absolute',
      width: '100%',
    };  
  });
  

    const checked = (completed: boolean) => {
          if (completed) {
          return <Feather name="check-square" size={23} color="gray"/>;
          }
          else {
          return <Feather name="square" size={22} color="#46444C"/>;
      }
      };
  
      
  return (
    <GestureDetector gesture={panGesture}
    >
      <Animated.View style={[styles.todoItem, animateStyle]}>
        <AnimatedPressable
          disabled={modalVis}
          onPress={() => onDescVisToggle(task.id)} 
        >
                <View style={styles.top}>
                  <View style={styles.topLeft}>
                    <View style={[styles.swatch, { backgroundColor: task.color }]} />
                    <Text style={[styles.title, task.completed && styles.completedTask]} >{task.title}</Text> 
                  </View>
                                
                  <Pressable disabled={modalVis} onPress={() => onChangeCompletion(task.id)}>
                    {checked(task.completed)}
                  </Pressable> 
                </View> 

                {task.visDesc && (task.dueDate || task.desc) && (
                  <View style={styles.top}>
                      <Text style={styles.desc} >{task.desc}</Text>
                      <View>
                        {task.dueDate && <Text style={styles.desc}>{task.dueDate?.toLocaleDateString()}</Text>}
                        {!task.allday && <Text style={styles.desc}>{task.dueDate?.toLocaleTimeString()}</Text>}
                      </View>
                      
                  </View>
                    )}   

                
        </AnimatedPressable>
      </Animated.View>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
    margin: 2,
    //fontSize: 17,
    fontWeight: 'heavy',
  },

  todoItem: {
    //position: 'absolute',
    height: itemHeight,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,  
    width: '100%',
  },

  activeItem: {
    opacity: 0.8,
    elevation: 3,
    backgroundColor: '#fff'
  },

  top:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    alignItems: "center",
  },
  
  topLeft:{
    flexDirection: "row",
    alignItems: "center",
  },

  swatch:{
    width: 20,
    height: 20,
    borderRadius: 5,
    margin:2,
}, 



title: {
  margin: 2,
  fontSize: 16,
  fontWeight: "semibold",
},

desc: {
  margin: 2,
  color: '#46444C',
},

footer:{
  flex:1,
  alignItems: "center",
  justifyContent: "flex-end",
}

}
)
