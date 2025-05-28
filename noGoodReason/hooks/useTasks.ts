import { useState } from "react";
import {Task} from '@/types';

export default function useTasks(){
    const [tasks, setTasks] = useState<Task[]>([]);


    const addTask = (newTask: Omit<Task, 'id'>) => {
      const idTask = {
        ...newTask,
        id: Date.now().toString(),
      }    
      
      setTasks(prevTasks => {
        const added = [...prevTasks, idTask];
        
        return added.sort((a, b) => {
        if ( a.priority !== b.priority ) {
          return  a.priority - b.priority;
        }

        if (!a.dueDate && !b.dueDate){
          return parseInt(a.id)-parseInt(b.id)
        }
        if (!a.dueDate) return 1; 
        if (!b.dueDate) return -1;

        return a.dueDate.getTime() - b.dueDate.getTime();
      })
      }
      )

    };      
        
 


        // setTasks(prevTasks => [
        //     ...prevTasks,
        //     {
        //         ...newTask,
        //       id: Date.now().toString(),
        //     }
        //   ]);
        // };


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