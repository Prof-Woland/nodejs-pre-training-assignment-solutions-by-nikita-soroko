import { TodoNotFoundError } from "./todo-errors";

export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];

  add(entity: T): T {
    if(typeof entity === undefined || entity === null){
      throw new TypeError('Entity is undefined or null');
    };

    this.items.push(entity);

    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    let index = this.items.findIndex(el => el.id === id);

    if(!this.items.find(el => el.id === id)){
      throw new TodoNotFoundError();
    };

    let result = this.items[index] = {...this.items[index], ...patch};

    return result;
  }

  remove(id: number): void {
    let index = this.items.findIndex(el => el.id === id);

    if(!this.items.find(el => el.id === id)){
      throw new TodoNotFoundError();
    };

    this.items.splice(index, 1);
  }

  findById(id: number): T | undefined{
    let index = this.items.findIndex(el => el.id === id);

    if(index === -1){
      return undefined;
    };

    let result: T = this.items[index];

    return result;
  }

  findAll(): T[] {
    let result = [...this.items]
    return result;
  }
}
