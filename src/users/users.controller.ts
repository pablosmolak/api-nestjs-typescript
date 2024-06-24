import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(
        @Body() user: UsersDto
    ){
       return this.usersService.create(user)
    }

    @Get()
    findAll(
        
    ) : UsersDto[] {
        return this.usersService.findAll()
    }
}
