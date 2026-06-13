import { Todo, TodoStatus } from './types';

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  if(typeof state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  const status: TodoStatus = completed ? TodoStatus.COMPLETED : TodoStatus.IN_PROGRESS;

  const result: Todo[] = state.map(e => {return {...e, status}});

  return result;
}

export function clearCompleted(state: Todo[]): Todo[] {
  if(typeof state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  const result: Todo[] = state.filter(e => e.status !== TodoStatus.COMPLETED);

  return result;
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  if(typeof state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  const result: number = state.reduce((acc, curr) => {return curr.status === status ? acc + 1 : acc}, 0);

  return result;
}
