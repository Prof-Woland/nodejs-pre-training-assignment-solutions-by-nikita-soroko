import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory';
import { TodoNotFoundError } from './todo-errors';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    let result: Todo[] = await new Promise((resolve, reject)=>{setTimeout(()=>{resolve(this.repo.findAll())}, 450)});
    return result;
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    let todo: Todo = createTodo(newTodo);
    let result: Todo = await new Promise((resolve, reject)=>{setTimeout(()=>{
      this.repo.add(todo); 
      resolve(todo)
    }, 450)});

    return result;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    let result: Todo = await new Promise((resolve, reject)=>{setTimeout(()=>{
      let result = this.repo.update(id, update);
      resolve(result)
    }, 450)});

    return result;
  }

  async remove(id: number): Promise<void> {
    let result: Todo[] = await new Promise((resolve, reject)=>{setTimeout(()=>{
      this.repo.remove(id);
      resolve(this.repo.findAll())
    }, 450)});
  }
}
