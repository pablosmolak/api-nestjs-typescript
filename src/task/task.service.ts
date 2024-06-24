import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto, findAllParameters, taskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid'
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class TaskService {

    constructor(private readonly prisma: PrismaService) { }

   private tasks: TaskDto[] = []

    async create(task: TaskDto){

        task.status = taskStatusEnum.TO_DO
        task.expirationDate = new Date(task.expirationDate)
        
        const newTask: TaskDto = await this.prisma.task.create({
            data:{
                ...task
            }
        })
       
        return {
            message:`Task created successfully!`, 
            code: HttpStatus.OK, 
            data: newTask
        }
        

    }

    async findAll(params: findAllParameters){

        const tasks: TaskDto[] = await this.prisma.task.findMany()

        /*return this.tasks.filter(t=>{
            let match = true

            if(params.title !=undefined && !t.title.includes(params.title)){
                match = false
            }

            if(params.status != undefined && !t.status.includes(params.status)){
                match = false
            }

        })*/
        return tasks
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
