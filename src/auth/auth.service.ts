import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto, AuthResponseDto } from './auth.dto';
import * as bcript from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }


    signIn(
        auth: AuthDto
    ): AuthResponseDto {
        const foundUser = this.usersService.findByUserName(auth.username)

        console.log(foundUser)
        console.log(auth.password)

        if (!foundUser || !bcript.compareSync(auth.password, foundUser.password)) {
            throw new UnauthorizedException()
        }

        const payLoad = { sub: foundUser.id, username: foundUser.username }

        const token = this.jwtService.sign(payLoad)

        return { token }
    }
}
