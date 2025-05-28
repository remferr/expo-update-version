import { useState } from "react";
import {Task} from '@/types';

export default function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (newTask: Omit<Task, 'id'>) => {
          setTasks(prevTasks => [
            ...prevTasks,
            {
                ...newTask,
              id: Date.now().toString(),
            }
          ]);
        };


    const changeCompletion = (taskId: String) => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId 
              ? {...task, completed: !task.completed}
            :
              task
          )
        );
      };

      const descVisToggle = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId 
              ? {...task, visDesc: !task.visDesc}
            : task
          )
        );
      };

      const updateTaskOrder = (newTasks: Task[]) => {
        setTasks(newTasks);
      };
      

      return {tasks, setTasks: updateTaskOrder, addTask, changeCompletion, descVisToggle};


}