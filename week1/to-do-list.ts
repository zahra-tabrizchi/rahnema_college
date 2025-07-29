type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

interface IToDoList {
  addTask: (title: string) => Task;
  showTasks: () => Task[];
  filter: (fn: (task: Task) => boolean) => Task[];
  deleteTask: (id: number) => void;
  changeStatus: (id: number, status: boolean) => void;
  search: (text: string) => Task[];
}

class ToDoList implements IToDoList {
  private tasks: Task[] = [];
  private tasksId: number = 1;

  addTask(title: string): Task {
    const newTask = {
      id: this.tasksId++,
      title,
      isDone: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  showTasks(): Task[] {
    return this.tasks;
  }

  filter(fn: (task: Task) => boolean): Task[] {
    let filteredList: Task[] = [];
    for (let task of this.tasks) {
      if (fn(task)) {
        filteredList.push(task);
      }
    }
    return filteredList;
  }

  deleteTask(id: number): void {
    let newList: Task[] = [];
    for (let task of this.tasks) {
      if (task.id !== id) {
        newList.push(task);
      }
    }
    this.tasks = newList;
  }

  changeStatus(id: number, status: boolean): void {
    for (let task of this.tasks) {
      if (task.id === id) {
        task.isDone = status;
        return;
      }
    }
  }

  search(text: string): Task[] {
    let newList: Task[] = [];
    for (let task of this.tasks) {
      if (task.title.includes(text)) {
        newList.push(task);
      }
    }
    return newList;
  }
}
