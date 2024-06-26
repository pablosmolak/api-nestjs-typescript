import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskDto, findAllParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(
        @Body() task: TaskDto
    ) {
       return this.taskService.create(task)
    }

    @Get()
    findAll(
        @Query() params: findAllParameters
    ) {
        return this.taskService.findAll(params)
    }

    @Get('/:id')
    findById(
        @Param('id') id: string
    ): TaskDto {
        return this.taskService.findById(id)
    }

    @Put("/:id")
    update(
        @Param('id') id: string,
        @Body() task: TaskDto
    ) {
        return this.taskService.update(id, task)
    }

    @Delete('/:id')
    remove(
        @Param('id') id: string
    ){
        return this.taskService.remove(id)
    }


}
