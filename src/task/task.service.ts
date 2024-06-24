import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto, findAllParameters } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = []

    create(task: TaskDto){
        this.tasks.push(task)
       
        return {
            message:`Task created successfully!`, 
            code: HttpStatus.OK, 
            data: task
        }
        

    }

    findAll(params: findAllParameters) : TaskDto[]{
        return this.tasks.filter(t=>{
            let match = true

            if(params.title !=undefined && !t.title.includes(params.title)){
                match = false
            }

            if(params.status != undefined && !t.status.includes(params.status)){
                match = false
            }

            return match
        })
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

        throw new HttpException(`Task with id ${id} not found!`, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    remove(id: string){
        let taskIndex = this.tasks.findIndex(task => task.id === id)

        if(taskIndex >= 0){
            this.tasks.splice(taskIndex, 1)

            throw new HttpException(`Task with id ${id} deleted successfully!`,HttpStatus.OK)
        }

        throw new HttpException(`Task with id ${id} not found!`, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
