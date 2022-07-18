import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { StoriesEntity } from '@entity'
import { AppError } from "common/error/AppError"

@Injectable()
export class StoriesService {

  async getOwnStories(userId: string) {
    try {
      const stories = await getMongoRepository(StoriesEntity).find({
        createBy: userId
      })
      return stories
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async createStory(userId: string, input: any) {
    try {
      const newStory = new StoriesEntity({...input, createBy: userId });
      const story = await getMongoRepository(StoriesEntity).save(newStory)
      return story
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async getStoryById(_id: string) {
    try {
      const story = await getMongoRepository(StoriesEntity).findOne({ _id })
      if (!story) {
        throw new HttpException('Story does not exist', HttpStatus.NOT_FOUND)
      }
      return story
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async getAllStory() {
    try {
      const stories = await getMongoRepository(StoriesEntity).find({ })
      return stories
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
}