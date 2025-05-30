import { View, Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react';
import useTasks from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import CreateModal from '@/components/CreateModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutAnimation } from 'react-native';

export default function Index() {
  const insets = useSafeAreaInsets();
  const {tasks, setTasks, addTask, changeCompletion, descVisToggle} = useTasks();
  const [modalVis, setModalVis] = useState(false);
  const [listVis, setListVis] = useState(true);
  
  const openModal = () => {
    setListVis(false);
    setTimeout(()=> setModalVis(true), 50);
    setTimeout(()=> setListVis(true), 100);
  }

  const closeModal = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setModalVis(false);
    setTimeout(()=> setListVis(true), 50);
  };


  return (
    <View style={styles.container}>
      
      {listVis &&
        <TaskList tasks={tasks} setTasks={setTasks} modalVis={modalVis} onChangeCompletion={changeCompletion} onDescVisToggle={descVisToggle}></TaskList>
      }
      
      
      <CreateModal visible={modalVis} onClose={closeModal} onAddTask={addTask}></CreateModal>
      
      
      <View style={[styles.addButtonContainer, { bottom: insets.bottom + 15}]}>
        <Pressable style={styles.addButton} onPress={() => {
          openModal();
          }}>
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