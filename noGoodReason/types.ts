export type Task = {
    id: string;
    title: string;
    completed: boolean;
    color: string;
    desc: string;
    visDesc: boolean;
    dueDate?: Date|null;
    endDueDate?: Date|null;
    allday?: boolean|null;
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

export type PaletteProps =  {
    color: string;
    setColor: (color: string) => void;
    onClose: () => void;
};