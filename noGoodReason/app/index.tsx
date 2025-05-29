import { View, Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react';
import useTasks from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import CreateModal from '@/components/CreateModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();
  const {tasks, setTasks, addTask, changeCompletion, descVisToggle} = useTasks();
  const [modalVis, setModalVis] = useState(false);

  return (
    <View style={styles.container}>
      
      
      <TaskList tasks={tasks} setTasks={setTasks} onChangeCompletion={changeCompletion} onDescVisToggle={descVisToggle}></TaskList>

      {modalVis && (<CreateModal visible={modalVis} onClose={() => setModalVis(false)} onAddTask={addTask}></CreateModal>)}
      
      
      <View style={[styles.addButtonContainer, { bottom: insets.bottom + 15}]}>
        <Pressable style={styles.addButton} onPress={() => setModalVis(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  addButtonContainer: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },

  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    shadowColor: 'rgba(0, 123, 255, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: .2,
    elevation: 1,
  },

  addButtonText: {
    color: "white",
    fontSize: 18,
  },

  listContainer: {
    flex: 1,
    width: '100%',
  }

});