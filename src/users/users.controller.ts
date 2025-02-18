import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './users.service';
import { UserAuthDto } from './dto/login.dto';

@Controller('/')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  async registerUser(@Body() body: UserAuthDto) {
    const result = await this.userService.registerUser(
      body.email,
      body.password,
    );
    if (!result) {
      return {
        message: 'Registration failed',
      };
    }
    return {
      message: 'User successfully registered',
    };
  }

  @Post('login')
  async login(@Body() body: UserAuthDto) {
    return await this.authService.login(body.email, body.password);
  }
}
