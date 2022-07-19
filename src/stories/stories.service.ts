import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { ChapperEntity, StoriesEntity } from '@entity'
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
  async paginationStories(filter: any) {
    try {
      filter.page = Number(filter.page || '1');
      const { search, type, status, genders, sort, page = 1, perPage } = filter;
      const take = Number(perPage) || 20
      const skip = (page - 1) * take;
      let order = {};
      const query: any = {
        type: { $in: type.map(item => Number(item)) },
        status: { $in: status.map(item => Number(item)) },
      }
      if (search) {
        query.title = { $regex: search, $options: 'si' }
      }
      if (genders) {
        query.genders = { $in: [Number(genders)] } 
      }

      if (sort !== 'updatedAt' && sort !== 'createdAt' && sort !== 'viewCount') {
        order = { title: sort }
      } else {
        order = { [sort]: 'DESC' }
      }

      const [stories, count] = await getMongoRepository(StoriesEntity).findAndCount({
        where: query,
        order,
        take,
        skip
      })

      for (const item of stories) {
        (item as any).chapper = await getMongoRepository(ChapperEntity).findOne({ storyId: item._id })
      }

      const total = await getMongoRepository(StoriesEntity).count(query);
      return {
        stories,
        pagination: {
          count,
          totalPage: Math.ceil(total / take),
          currentPage: page,
          perPage: take,
          hasNextPage: total - take * (page - 1) > 0
        }
      }
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async viewStory(_id: string) {
    try {
      const story = await getMongoRepository(StoriesEntity).findOne({ _id })
      if (!story) {
        throw new HttpException('Story does not exist', HttpStatus.NOT_FOUND)
      }

      story.viewCount ++;
      const saveStory = await getMongoRepository(StoriesEntity).save(story)
      return saveStory
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
}