import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoService } from "../JS-TS/solutions/todo-service";
import { TodoStatus } from "../JS-TS/solutions/types";

describe('Task 9: TodoService Unit Tests', ()=>{
    jest.setTimeout(10000);
    const todoApi = new TodoApi;
    const todoService = new TodoService(todoApi);

    it('todo will be created', async () => {
        const created = await todoService.create('Mock Todo', 'Description');
        expect(created.title).toBe('Mock Todo');
    });

    it('status will be toggled to successful', async () => {
        const [todo] = await todoService.search('mock');
        const updated = await todoService.toggleStatus(todo.id);

        expect(updated.status).toBe(TodoStatus.COMPLETED);
    });

    it('search will return matching items', async () => {
        const existing = await todoService.search('MOCK TODO');
        expect(existing.length).toBeGreaterThan(0);
    });

    it('search will return matching items in description', async () => {
        const existing = await todoService.search('DESCRIPTION');
        expect(existing.length).toBeGreaterThan(0);
    });

    it('throwing error in case of updating non-existing id', async () => {
        jest.useFakeTimers();

        let caughtError: any = null;

        todoService.toggleStatus(500).catch(err => {
            caughtError = err;
        });

        try {
            jest.runAllTimers(); 
        } catch (err) {
            caughtError = err;
        }

        expect(caughtError).toBeDefined();
        expect(caughtError.message).toBe('Todo Not Found');

        jest.useRealTimers();
    });

    it('throwing error in case of empty Todo title', async () => {
        let caughtError: any = null;

        await todoService.create('', '').catch(err => {
            caughtError = err;
        });

        expect(caughtError).toBeDefined();
    });

    it('throwing error in case of wrong id in toggling status', async () => {
        let caughtError: any = null;

        await todoService.toggleStatus(0).catch(err => {
            caughtError = err;
        });

        expect(caughtError).toBeDefined();
    });

    it('throwing not found in case of removing non-existing ID', async () => {
        jest.useFakeTimers();
        let caughtError: any = null;

        todoApi.remove(520).catch(err => {
            caughtError = err;
        });

        try {
            jest.runAllTimers(); 
        } catch (err) {
            caughtError = err;
        };

        expect(caughtError).toBeDefined();
        expect(caughtError.message).toBe('Todo Not Found');

        jest.useRealTimers();
    })
})