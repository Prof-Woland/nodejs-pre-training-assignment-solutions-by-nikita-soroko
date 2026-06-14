import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  if(state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  const result: Todo[] = [...state];

  if(state.find(element => element.id === todo.id)){
    throw new Error('Conflict: Todo with this ID exists');
  };
  
  result.push(todo);

  return result;
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  if(state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };
  
  const result: Todo[] = [...state];

  if(!state.find(element => element.id === id)){
    throw new Error('Not found: Todo with this ID does not exist');
  };

  const index = state.findIndex(element => element.id === id);

  let resultItem = {...result[index], ...update};

  result[index] = resultItem;

  return result;
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  if(state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  const result: Todo[] = [...state];

  if(!state.find(element => element.id === id)){
    throw new Error('Not found: Todo with this ID does not exist');
  };

  const index = state.findIndex(element => element.id === id);

  result.splice(index, 1);

  return result;
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  if(state === null || typeof state === undefined){
    throw new TypeError('Todo array is null or undefined');
  };

  if(!state.find(element => element.id === id)){
    throw new Error('Not found: Todo with this ID does not exist');
  };

  const index = state.findIndex(element => element.id === id);

  let result: Todo = state[index];

  return result;
}
