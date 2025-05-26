import { View, Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react';
import useTasks from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import CreateModal from '@/components/CreateModal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Index() {
  const {tasks, setTasks, addTask, changeCompletion, descVisToggle} = useTasks();
  const [modalVis, setModalVis] = useState(false);

  
  return (
    <SafeAreaProvider>
    <SafeAreaView>
    <View style={styles.container}>
      <TaskList tasks={tasks} setTasks={setTasks} onChangeCompletion={changeCompletion} onDescVisToggle ={descVisToggle}/>
      
      <CreateModal
        visible={modalVis}
        onClose={() => setModalVis(false)}
        onAddTask={addTask}
      />

      <Pressable style={styles.addButton} onPress={() =>setModalVis(true)}>
          <Text>+</Text>
      </Pressable>

    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({


  container: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },

  addButton:{
    width: 40,
    height: 40,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
  }, 


})