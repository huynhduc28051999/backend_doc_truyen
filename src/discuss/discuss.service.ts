import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { DiscussEntity } from '@entity'
import { AppError } from 'common/error/AppError'

@Injectable()
export class DiscussService {
  async getDiscussById(_id: string) {
    try {
      const disscuss = await getMongoRepository(DiscussEntity).find({ _id })
      if (!disscuss) {
        throw new HttpException('Disscuss does not exist', HttpStatus.NOT_FOUND)
      }
      return disscuss;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }

  async getOwnDiscuss(userId: string) {
    try {
      const disscuss = await getMongoRepository(DiscussEntity).find({ createBy: userId })
      return disscuss;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }

  async getAllDiscuss(filter: any) {
    try {
      const query: any = {}
      if (filter.category === 'all' || !filter.category) {
        query.category = { $in: [1,2,3,4,5]}
      } else {
        query.category = Number(filter.category)
      }

      const aggregate: any = [
        { $match: query },
        {
          $lookup: {
            from: 'User',
            localField: 'createBy',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: "$user"
        },
        {
          $project: {
            "_id": 1,
            "title": 1,
            "category": 1,
            "createdAt": 1,
            "user._id": 1,
            "user.username": 1,
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]
      if (filter.perPage) {
        aggregate.concat({ $skip: Number(filter.perPage) })
      }

      const disscuss = await getMongoRepository(DiscussEntity).aggregate(aggregate).toArray()
      return disscuss;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }

  async createDiscuss(userId: string, input: any) {
    try {
      const newDiscuss = new DiscussEntity({...input, createBy: userId });
      const disscuss = await getMongoRepository(DiscussEntity).save(newDiscuss)
      return disscuss;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
}