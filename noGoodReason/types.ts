
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    color: string;
    desc: string;
    visDesc: boolean;
    dueDate?: Date;
    startTime: 
  };

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
};

export type CalendarProps = {
  dueDate: Date;
  setDueDate: (date: Date) => void;
};