import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginRequestBody } from './models/loginRequestBody';

@ApiTags('users')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginRequestBody })
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
