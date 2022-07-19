import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
import { DiscussService } from './discuss.service'
import { AuthGuard, Reponse, User } from '@common'

@Controller('discuss')
export class DiscussController {
  constructor(private readonly discussService: DiscussService) { }

  @Get()
  async discussById(@Query('id') id) {
    const data = await this.discussService.getDiscussById(id)
    return Reponse(data)
  }

  @Get('all')
  async getAllDiscuss(@Query() query) {
    const data = await this.discussService.getAllDiscuss(query)
    return Reponse(data)
  }

  @UseGuards(AuthGuard)
  @Get('byMe')
  async getOwnDiscuss(@User() user) {
    const data = await this.discussService.getOwnDiscuss(user._id)
    return Reponse(data)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createDiscuss(@User() user, @Body() input: any) {
    const data = await this.discussService.createDiscuss(user._id, input)
    return Reponse(data)
  }
}