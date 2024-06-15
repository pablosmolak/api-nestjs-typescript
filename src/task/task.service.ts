import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = []

    create(task: TaskDto){
        this.tasks.push(task)
        return task
    }

    findAll(){
        return this.tasks
    }

    findById(id:string): TaskDto{
        const task = this.tasks.filter(task => task.id === id)

        if(task.length){
            return task[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    update(id:string, task: TaskDto){
        let taskIndex = this.tasks.findIndex(task => task.id === id)

        if(taskIndex >= 0){
            this.tasks[taskIndex] = task
            return task
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
