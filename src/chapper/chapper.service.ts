import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { ChapperEntity } from '@entity'
import { AppError } from 'common/error/AppError'

@Injectable()
export class ChapperService {
  async getChapperById(_id: string) {
    try {
      const chapper = await getMongoRepository(ChapperEntity).findOne({ _id })
      if (!chapper) {
        throw new HttpException('Chapper does not exist', HttpStatus.NOT_FOUND)
      }
      return chapper
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async createChapper(userId: string, input: any) {
    try {
      const newChapper = new ChapperEntity({...input, createBy: userId });
      const chapper = await getMongoRepository(ChapperEntity).save(newChapper)
      return chapper
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
}