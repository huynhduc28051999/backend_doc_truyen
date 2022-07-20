import { getMongoRepository } from "typeorm"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AppError } from 'common/error/AppError'
import { ComemntEntity } from "@entity"

@Injectable()
export class CommentService {
  async getChapperById(_id: string) {
    try {
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async createComment(user: any, input: any) {
    try {
      const newComment = new ComemntEntity({ ...input, createBy: user });
      const saveComment = await getMongoRepository(ComemntEntity).save(newComment);
      return saveComment;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
  async getComments(id: string, by: string) {
    try {
      const query = { [by]: id }
      const comments = await getMongoRepository(ComemntEntity).find({ where: query, order: { createBy: 'DESC' } })
      return comments;
    } catch (error) {
      throw new HttpException(...AppError(error))
    }
  }
}