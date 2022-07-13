import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { ChangePasswordDTO, RegisterDTO } from '@utils'
import { AuthGuard, User, Reponse } from '@common'

@Controller('user')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // async profile(@User() user) {
  //   const data = await this.userService.getUserById(user._id)
  //   return Reponse(data)
  // }

  // @Get()
  // async userById(@Query('id') idUser) {
  //   const data = await this.userService.getUserById(idUser)
  //   return Reponse(data)
  // }

  // @Post('register')
  // async register(@Body() registerData: RegisterDTO) {
  //   const data = await this.userService.register(registerData)
  //   return Reponse(data)
  // }

  // @UseGuards(AuthGuard)
  // @Post('change-password')
  // async changePassword(@User() user, @Body() input: ChangePasswordDTO) {
  //   const data = await this.userService.changePassword(user._id, input)
  //   return Reponse(data)
  // }
}