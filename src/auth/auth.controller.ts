import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDTO } from '@utils';
import { Reponse } from '@common';

@Controller('auth')
export class AuthController {
  constructor(
      // private userService: UserService,
  ) { }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    // const data = await this.userService.login(userDTO);
    return 'hello word'
  }
}
