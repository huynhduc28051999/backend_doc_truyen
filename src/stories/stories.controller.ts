import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { AuthGuard, User, Reponse } from '@common'

@Controller('story')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @Get()
  async getStoryById(@Query('id') id) {
    const data = await this.storiesService.getStoryById(id)
    return Reponse(data)
  }

  @UseGuards(AuthGuard)
  @Get('byMe')
  async getAllOwnStory(@User() user) {
    const data = await this.storiesService.getOwnStories(user._id)
    return Reponse(data)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createStory(@User() user, @Body() input: any) {
    const data = await this.storiesService.createStory(user._id, input)
    return Reponse(data)
  }

  @Get('all')
  async getAllStories() {
    const data = await this.storiesService.getAllStory()
    return Reponse(data)
  }
}