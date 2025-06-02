import { Text, View, StyleSheet, Pressable, FlatList, Platform} from "react-native";
import { Task } from "@/types";
import Feather from '@expo/vector-icons/Feather';
import { useState, useEffect, use } from "react";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';


type TaskItemProps =  {
    task: Task;
    //drag: () => void;
    isActive?: boolean;
    modalVis: boolean;
    onChangeCompletion: (id: string) => void; 
    onDescVisToggle: (id: string) => void; 
};

    
export default function TaskItem({task, isActive, modalVis, onChangeCompletion, onDescVisToggle}: TaskItemProps) {
  const [color, setColor] = useState('#ADD8E6');

  const dragging = useSharedValue(false);
  const distance = useSharedValue(0);

  const panGesture = Gesture.Pan()
  .enabled(!modalVis)
    .onStart(() => {
      'worklet';
    dragging.value = true;
  })
    .onUpdate((e) => {
      'worklet';
    distance.value = e.translationY;
    
  })
    .onEnd(() => {
      'worklet';
      distance.value = withSpring(0);
      dragging.value = false;
  });

  useEffect(() => {
    if (!modalVis) {
      distance.value = 0;
      dragging.value = false;
    }
  }, [modalVis]);

  const animateStyle = useAnimatedStyle(() => ({
    transform: [{translateY: distance.value}],
    elevation: dragging.value ? 3: 0,
  }));

  

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
        <Pressable 
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

                
        </Pressable>  
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
