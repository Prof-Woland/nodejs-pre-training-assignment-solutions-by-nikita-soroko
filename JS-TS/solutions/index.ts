#!/usr/bin/env ts-node

import { ToDoManager } from "./todo-manager";

// CLI entry for Task 10 – placeholder only

async function main(){
    const manager = new ToDoManager();
    const [command, arg1, arg2] = process.argv.slice(2);

    if (!command) {
        console.log('Использование: npm run cli [toggle|remove] [id]');
        return;
    }

    try{
        switch(command){
            case 'init':
                await manager.init();
                console.log('InMemoryRepo was successfully initiated');
                break;
            
            case 'add':
                const addTitle = arg1;
                const addDescription = arg2;

                await manager.add(addTitle, addDescription);

                console.log('New ToDo was successfully created');

                break;

            case 'complete':
                const toggleId = parseInt(arg1);

                await manager.complete(toggleId);

                console.log(`ToDo with ID = ${toggleId} was successfully completed`);

                break;

            case 'list':
                const allTodos = await manager.list();
                console.log('ToDo list:');
                for(const todo of allTodos){
                    console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Status: ${todo.status}`)
                }
        }
    }
    catch(error: unknown){
        if(error instanceof Error){
            console.error(error.message);
        }
        else{
            console.error('Unknown error');
        }
    }
}

main();