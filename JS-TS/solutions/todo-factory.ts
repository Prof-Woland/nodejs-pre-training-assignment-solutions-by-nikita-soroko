import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  if(input === null || typeof input === undefined){
    throw new TypeError('Input is null or undefined');
  }

  const result: Todo = {
    id: nextId,
    status: TodoStatus.PENDING,
    ...input,
    createdAt: new Date(Date.now()),
  }

  nextId++;

  return result;
}
