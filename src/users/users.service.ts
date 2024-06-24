import { Injectable } from '@nestjs/common'
import { UsersDto } from './users.dto'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UsersDto[] = [
        {
            id: uuid(),
            username: "Pablosmolak",
            password: bcrypt.hashSync("12345", 10)
        }  
    ]

    async create(user: UsersDto) {
        user.id = uuid()
        user.password = bcrypt.hashSync(user.password, 10)

        this.users.push(user)

        delete user.password

        return user
    }


    findAll(): UsersDto[] {
        return this.users
    }

    findByUserName(
        username: string
    ): UsersDto | null {
        return this.users.find(user => user.username === username)
    }
}
