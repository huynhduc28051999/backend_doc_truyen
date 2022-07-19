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

  async getAllDiscuss() {
    try {
      const disscuss = await getMongoRepository(DiscussEntity).find({})
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