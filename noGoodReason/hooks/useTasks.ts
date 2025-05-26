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

      

      return {tasks, setTasks, addTask, changeCompletion, descVisToggle};


}