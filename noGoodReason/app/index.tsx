import { View, Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react';
import useTasks from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import CreateModal from '@/components/CreateModal';

export default function Index() {
  const {tasks, setTasks, addTask, changeCompletion, descVisToggle} = useTasks();
  const [modalVis, setModalVis] = useState(false);

  return (
    <View style={styles.container}>
      <CreateModal visible={modalVis} onClose={() => setModalVis(false)} onAddTask={addTask}></CreateModal>

      <TaskList tasks={tasks} setTasks={setTasks} onChangeCompletion={changeCompletion} onDescVisToggle={descVisToggle}></TaskList>

      <Pressable style={styles.addButton} onPress={() => setModalVis(true)}>
        <Text>+</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
  },

});