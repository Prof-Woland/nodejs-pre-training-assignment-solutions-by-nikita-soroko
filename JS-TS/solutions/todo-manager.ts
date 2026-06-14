import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { Todo } from './types';

export class ToDoManager {
  private api = new TodoApi();
  private service = new TodoService(this.api);

  private initData = [{title:'firstTodo', description:'firstTodoDescription'},
    {title:'secondTodo', description:'secondTodoDescription'},
    {title:'thirdTodo', description:'thirdTodoDescription'},
    {title:'fourthTodo', description:'fourthTodoDescription'},
  ]
  async init(): Promise<void> {
    for(const el of this.initData){
      await this.service.create(el.title, el.description);
    }
  }

  async add(title: string, description = ''): Promise<void> {
    if(title === ''){
      throw new Error('Title is empty');
    }

    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    const result: Todo[] = await this.api.getAll();
    return result;
  }
}
