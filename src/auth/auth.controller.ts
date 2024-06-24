import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    signIn(
        @Body() auth: AuthDto
    ): AuthResponseDto{
        return this.authService.signIn(auth)
    }

}
