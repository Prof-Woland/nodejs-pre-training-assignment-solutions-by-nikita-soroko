import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory';
import { TodoNotFoundError } from './todo-errors';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  private mockdata: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    let result: Todo[] = await new Promise((resolve, reject)=>{setTimeout(()=>{resolve(this.mockdata)}, 450)});
    return result;
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    let todo: Todo = createTodo(newTodo);
    let result: Todo = await new Promise((resolve, reject)=>{setTimeout(()=>{
      this.mockdata.push(todo); 
      resolve(todo)
    }, 450)});

    return result;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    if(!this.mockdata.find(el => el.id === id)){
      throw new TodoNotFoundError();
    }
    let result: Todo = await new Promise((resolve, reject)=>{setTimeout(()=>{
      let index = this.mockdata.findIndex(el => el.id === id); 
      this.mockdata[index] = {...this.mockdata[index], ...update};
      resolve(this.mockdata[index])
    }, 450)});

    return result;
  }

  async remove(id: number): Promise<void> {
    if(!this.mockdata.find(el => el.id === id)){
      throw new TodoNotFoundError();
    }
    let result: Todo[] = await new Promise((resolve, reject)=>{setTimeout(()=>{
      let index = this.mockdata.findIndex(el => el.id === id); 
      this.mockdata.splice(index, 1);
      resolve(this.mockdata)
    }, 450)});
  }
}
