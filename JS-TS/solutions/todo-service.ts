import { TodoApi } from './todo-api';
import { Todo, TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    if(title === null){
      throw new TypeError('Title is null');
    }
    return await this.api.add({title, description});
  }

  async toggleStatus(id: number): Promise<Todo> {
    if(Number.isNaN(id) || id === null){
      throw new TypeError('Id is NaN or null');
    }

    return await this.api.update(id, {status: TodoStatus.COMPLETED})
  }

  async search(keyword: string): Promise<Todo[]> {
    const basicTodos: Todo[] = await this.api.getAll();
    return basicTodos.filter(todo => {
      const titleMatches = todo.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
      let descriptionMatches;
      if(todo.description){
        descriptionMatches = todo.description.toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
      };

      return titleMatches || descriptionMatches;
    })
  }
}
